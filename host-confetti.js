/*
 * WorldVision Studio - Host announcement confetti
 * Add this file after script.js in index.html.
 * This add-on does not modify the existing audio or scoring logic.
 */
(() => {
  'use strict';

  const FALLBACK_COLORS = [
    '#ef4444',
    '#f97316',
    '#facc15',
    '#22c55e',
    '#06b6d4',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899'
  ];

  const PARTICLE_COUNT = 105;
  const FLAG_SAMPLE_URL = 'https://flagcdn.com/w320/';

  let canvas = null;
  let context = null;
  let animationFrame = null;
  let activeHostKey = null;
  let activeColors = FALLBACK_COLORS.slice();
  let particles = [];
  let generation = 0;
  let lastFrameTime = 0;
  let resizeHandler = null;
  let previousShellZIndex = '';
  let previousShellStyleCaptured = false;

  function getISOCode(value) {
    const text = String(value ?? '').trim();
    if (/^[a-z]{2}$/i.test(text)) return text.toUpperCase();

    const chars = Array.from(text);
    if (chars.length === 2 && chars.every(char => {
      const codePoint = char.codePointAt(0);
      return codePoint >= 0x1F1E6 && codePoint <= 0x1F1FF;
    })) {
      return chars
        .map(char => String.fromCharCode(char.codePointAt(0) - 0x1F1E6 + 65))
        .join('');
    }

    return '';
  }

  function ensureCanvas() {
    const presentation = document.getElementById('presentation');
    const shell = presentation?.querySelector('.pres-shell');
    if (!presentation || !shell) return null;

    if (!canvas || !canvas.isConnected) {
      canvas = document.createElement('canvas');
      canvas.id = 'hostConfettiCanvas';
      canvas.setAttribute('aria-hidden', 'true');
      canvas.className = 'host-confetti-canvas';
      shell.appendChild(canvas);
      context = canvas.getContext('2d');
    }

    return { presentation, shell };
  }

  function resizeCanvas() {
    if (!canvas || !context) return { width: 0, height: 0 };

    const rect = canvas.parentElement.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    const pixelRatio = Math.min(2, Math.max(1, window.devicePixelRatio || 1));

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    return { width, height };
  }

  function randomColor() {
    return activeColors[Math.floor(Math.random() * activeColors.length)] || FALLBACK_COLORS[0];
  }

  function createParticle(width, height, staggerAboveCanvas = false) {
    return {
      x: Math.random() * width,
      // On the first presentation frame, every particle starts above the
      // visible canvas. Their staggered negative Y positions create a
      // gradual top-down arrival instead of an already-filled screen.
      y: staggerAboveCanvas
        ? -10 - Math.random() * height
        : -10 - Math.random() * 70,
      width: 3 + Math.random() * 4,
      height: 6 + Math.random() * 7,
      // Each paper piece starts with its own downward momentum and accelerates
      // gently under gravity until it reaches a natural terminal speed.
      velocityY: 0.8 + Math.random() * 0.8,
      gravity: 0.012 + Math.random() * 0.013,
      maxFallSpeed: 3.0 + Math.random() * 1.5,
      // Horizontal motion combines a shared, slowly changing breeze with
      // individual flutter so the pieces do not all follow the same path.
      velocityX: (Math.random() - 0.5) * 0.45,
      windInfluence: 0.55 + Math.random() * 0.75,
      drift: 0.14 + Math.random() * 0.34,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.012 + Math.random() * 0.018,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.045,
      // A second rotation axis is represented by horizontal foreshortening.
      // This makes each flat paper piece visibly tumble instead of merely spin.
      flip: Math.random() * Math.PI * 2,
      flipSpeed: (Math.random() < 0.5 ? -1 : 1) * (0.035 + Math.random() * 0.045),
      alpha: 0.68 + Math.random() * 0.24,
      color: randomColor()
    };
  }

  function extractFlagPalette(image) {
    const sampleCanvas = document.createElement('canvas');
    const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true });
    if (!sampleContext) throw new Error('Canvas 2D context is unavailable.');

    sampleCanvas.width = 96;
    sampleCanvas.height = 60;
    sampleContext.drawImage(image, 0, 0, sampleCanvas.width, sampleCanvas.height);

    const pixels = sampleContext.getImageData(
      0, 0, sampleCanvas.width, sampleCanvas.height
    ).data;
    const counts = new Map();

    for (let index = 0; index < pixels.length; index += 4) {
      const alpha = pixels[index + 3];
      if (alpha < 180) continue;

      const quantize = channel => Math.max(0, Math.min(255, Math.round(channel / 32) * 32));
      const red = quantize(pixels[index]);
      const green = quantize(pixels[index + 1]);
      const blue = quantize(pixels[index + 2]);
      const color = `#${[red, green, blue]
        .map(channel => channel.toString(16).padStart(2, '0'))
        .join('')}`;

      counts.set(color, (counts.get(color) || 0) + 1);
    }

    const palette = [...counts.entries()]
      .sort((first, second) => second[1] - first[1])
      .slice(0, 8) // Von 6 auf 8 erhöht zum Testen
      .map(([color]) => color);

    if (palette.length < 2) {
      throw new Error('The flag image did not contain at least two detectable colors.');
    }

    return palette;
  }

  function detectHostFlagColors(flagValue) {
    return new Promise(resolve => {
      const code = getISOCode(flagValue);
      if (!code) {
        resolve({ code: '', colors: null, reason: 'The host has no valid two-letter country flag code.' });
        return;
      }

      const image = new Image();
      let settled = false;
      const timeout = window.setTimeout(() => {
        finish(null, 'Loading the host flag timed out.');
      }, 10000);

      const finish = (colors, reason = '') => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        resolve({ code, colors, reason });
      };

      image.crossOrigin = 'anonymous';
      image.onload = () => {
        try {
          finish(extractFlagPalette(image));
        } catch (error) {
          finish(null, error?.message || 'The flag colors could not be read from the image.');
        }
      };
      image.onerror = () => finish(null, 'The host flag image could not be loaded.');
      image.onabort = () => finish(null, 'Loading the host flag image was aborted.');
      image.src = `${FLAG_SAMPLE_URL}${code.toLowerCase()}.png`;
    });
  }

  function applyDetectedColors(result, host, expectedGeneration) {
    if (expectedGeneration !== generation || animationFrame === null) return;

    if (Array.isArray(result.colors) && result.colors.length >= 2) {
      activeColors = result.colors;
      particles.forEach(particle => {
        particle.color = randomColor();
      });
      console.info('[CONFETTI] Host flag colors detected: true', {
        host: host?.name || 'Unknown host',
        countryCode: result.code,
        colors: result.colors
      });
      return;
    }

    activeColors = FALLBACK_COLORS.slice();
    particles.forEach(particle => {
      particle.color = randomColor();
    });
    console.warn('[CONFETTI] Host flag colors detected: false', {
      host: host?.name || 'Unknown host',
      countryCode: result.code || null,
      reason: result.reason || 'No usable flag palette was found.'
    });
    console.info('[CONFETTI] Using rainbow fallback.');
  }

  function animate(timestamp) {
    if (!canvas || !context || animationFrame === null) return;

    const rect = canvas.parentElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const delta = lastFrameTime
      ? Math.min(2, Math.max(0, (timestamp - lastFrameTime) / 16.67))
      : 1;
    lastFrameTime = timestamp;

    context.clearRect(0, 0, width, height);

    // Slow, overlapping sine waves create gentle gusts without simulating
    // expensive fluid dynamics. The value is shared, but each particle reacts
    // differently according to its own windInfluence.
    const wind = Math.sin(timestamp * 0.00038) * 0.24
      + Math.sin(timestamp * 0.00013 + 1.7) * 0.12;

    particles.forEach(particle => {
      // Gravity increases the fall speed gradually; the cap keeps the motion
      // readable and prevents particles from accelerating without limit.
      particle.velocityY = Math.min(
        particle.maxFallSpeed,
        particle.velocityY + particle.gravity * delta
      );
      particle.y += particle.velocityY * delta;

      // Ease horizontal velocity toward the current breeze, then add a small
      // individual flutter so the movement remains irregular and natural.
      particle.velocityX += (
        wind * particle.windInfluence - particle.velocityX
      ) * 0.018 * delta;
      particle.sway += particle.swaySpeed * delta;
      particle.x += (
        particle.velocityX + Math.sin(particle.sway) * particle.drift
      ) * delta;

      particle.rotation += particle.rotationSpeed * delta;
      particle.flip += particle.flipSpeed * delta;

      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      // Simulate the paper turning edge-on and opening toward the viewer.
      const flipScale = 0.16 + 0.84 * Math.abs(Math.cos(particle.flip));
      context.scale(flipScale, 1);
      context.globalAlpha = particle.alpha;
      context.fillStyle = particle.color;
      context.fillRect(
        -particle.width / 2,
        -particle.height / 2,
        particle.width,
        particle.height
      );
      context.restore();

      if (particle.y > height + 18) {
        Object.assign(particle, createParticle(width, height));
      }
      if (particle.x < -15) particle.x = width + 10;
      if (particle.x > width + 15) particle.x = -10;
    });

    animationFrame = window.requestAnimationFrame(animate);
  }

  function stopHostConfetti() {
    generation++;

    if (animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }

    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler);
      resizeHandler = null;
    }

    const presentation = document.getElementById('presentation');
    const shell = presentation?.querySelector('.pres-shell');

    if (canvas && context) {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (presentation) presentation.classList.remove('host-confetti-active');
    if (shell && previousShellStyleCaptured) {
      shell.style.zIndex = previousShellZIndex;
    }

    previousShellZIndex = '';
    previousShellStyleCaptured = false;
    activeHostKey = null;
    activeColors = FALLBACK_COLORS.slice();
    particles = [];
    lastFrameTime = 0;
  }

  function startHostConfetti(host, fallbackHostId) {
    const elements = ensureCanvas();
    if (!elements || !context) {
      console.warn('[CONFETTI] Could not create the host confetti canvas.');
      return;
    }

    const hostKey = String(host?.id ?? fallbackHostId ?? host?.flag ?? 'unknown-host');
    if (activeHostKey === hostKey && animationFrame !== null) return;

    stopHostConfetti();

    const currentGeneration = ++generation;
    const { presentation, shell } = elements;
    activeHostKey = hostKey;
    activeColors = FALLBACK_COLORS.slice();

    if (!previousShellStyleCaptured) {
      previousShellZIndex = shell.style.zIndex;
      previousShellStyleCaptured = true;
    }

    // The canvas sits above the presentation background but behind the slide content.
    shell.style.zIndex = '1';
    presentation.classList.add('host-confetti-active');

    const size = resizeCanvas();
    particles = Array.from(
      { length: PARTICLE_COUNT },
      () => createParticle(size.width, size.height, true)
    );

    resizeHandler = () => {
      const resized = resizeCanvas();
      if (!resized.width || !resized.height) return;
      particles.forEach(particle => {
        particle.x = Math.min(particle.x, resized.width);
        particle.y = Math.min(particle.y, resized.height);
      });
    };
    window.addEventListener('resize', resizeHandler);

    lastFrameTime = 0;
    animationFrame = window.requestAnimationFrame(animate);

    detectHostFlagColors(host?.flag).then(result => {
      applyDetectedColors(result, host, currentGeneration);
    });
  }

  function syncHostConfettiToPresentation() {
    const currentPresentation = typeof pres !== 'undefined' ? pres : null;
    const currentIndex = typeof presIndex !== 'undefined' ? presIndex : -1;
    const event = currentPresentation?.events?.[currentIndex];
    const shouldShow = event?.type === 'host-announcement'
      && currentPresentation?.hostRevealReady === true
      && currentPresentation?.debugFastForward !== true;

    if (!shouldShow) {
      stopHostConfetti();
      return;
    }

    let host = null;
    try {
      if (typeof activeShow === 'function' && typeof contestant === 'function') {
        host = contestant(event.hostId, activeShow());
      }
    } catch (error) {
      console.warn('[CONFETTI] Could not resolve the announced host.', error);
    }

    startHostConfetti(host, event.hostId);
  }

  const originalRenderPres = window.renderPres;
  const originalClosePres = window.closePres;

  if (typeof originalRenderPres !== 'function' || typeof originalClosePres !== 'function') {
    console.warn('[CONFETTI] Could not connect to the presentation lifecycle. Check that host-confetti.js is loaded after script.js.');
    return;
  }

  window.renderPres = function (...args) {
    const result = originalRenderPres.apply(this, args);
    syncHostConfettiToPresentation();
    return result;
  };

  window.closePres = function (...args) {
    stopHostConfetti();
    return originalClosePres.apply(this, args);
  };

  console.info('[CONFETTI] Host announcement confetti module loaded.');
})();
