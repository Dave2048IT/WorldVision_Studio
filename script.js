'use strict';
const STORAGE_KEY = 'worldvision_studio_v1';
const DB_NAME = 'worldvision_studio_assets';
const DB_STORE = 'music';
const POINTS = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];
const FZERO_GX_POINTS = [
  100, 93, 87, 81, 76, 71, 66, 62, 58, 54, 50, 47, 44, 41, 38, 35, 33, 31, 29, 27,
  25, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
];
const FINAL_TRACKS = ['aeropolis', 'green plant', 'fire field', 'phantom road'];
const HOTLOOP_TRACKS = {
  'mute city': { normal: { start: 6.962, end: 149.683 }, finalLap: { start: 6.812, end: 47.482 } },
  'vegas palace': { normal: { start: 0.000, end: 161.657 }, finalLap: { start: 0.000, end: 80.855 } },
  'sand ocean': { normal: { start: 10.753, end: 159.972 }, finalLap: { start: 15.842, end: 101.106 } },
  'lightning': { normal: { start: 16.082, end: 203.749 }, finalLap: { start: 5.296, end: 33.993 } },
  'aeropolis': { normal: { start: 5.330, end: 312.594 }, finalLap: { start: 7.907, end: 59.088 } },
  'big blue': { normal: { start: 8.529, end: 246.708 }, finalLap: { start: 2.184, end: 72.208 } },
  'port town': { normal: { start: 8.479, end: 289.570 }, finalLap: { start: 8.471, end: 63.355 } },
  'green plant': { normal: { start: 1.545, end: 155.883 }, finalLap: { start: 8.333, end: 61.969 } },
  'cosmo terminal': { normal: { start: 2.342, end: 197.674 }, finalLap: { start: 1.581, end: 70.078 } },
  'fire field': { normal: { start: 12.445, end: 164.506 }, finalLap: { start: 1.776, end: 85.697 } },
  'outer space': { normal: { start: 21.957, end: 238.267 }, finalLap: { start: 4.942, end: 58.992 } },
  'phantom road': { normal: { start: 21.433, end: 206.775 }, finalLap: { start: 1.559, end: 54.505 } }
};
const MUSIC_TRACKS = {
  'mute city': { normal: 'https://soundcloud.com/45555555555/cwecwwc?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', finalLap: 'https://soundcloud.com/45555555555/mute-city-final-lap?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
  'vegas palace': { normal: 'https://soundcloud.com/45555555555/eccc?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', finalLap: 'https://soundcloud.com/45555555555/vegas-palace-final-lap?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
  'sand ocean': { normal: 'https://soundcloud.com/45555555555/sand-ocean?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', finalLap: 'https://soundcloud.com/45555555555/sand-ocean-final-lap?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
  'lightning': { normal: 'https://soundcloud.com/45555555555/osc-sync-carnival?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', finalLap: 'https://soundcloud.com/45555555555/osc-sync-carnival-final-lap?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
  'aeropolis': { normal: 'https://soundcloud.com/45555555555/aeropolis?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', finalLap: 'https://soundcloud.com/45555555555/jmm?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
  'green plant': { normal: 'https://soundcloud.com/45555555555/green-plant?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', finalLap: 'https://soundcloud.com/45555555555/vrvrvrrv?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
  'fire field': { normal: 'https://soundcloud.com/45555555555/fireniggaballs?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', finalLap: 'https://soundcloud.com/45555555555/fire-field-final-lap?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
  'phantom road': { normal: 'https://soundcloud.com/45555555555/phantom-road?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', finalLap: 'https://soundcloud.com/45555555555/vrjjjjjilikebigblackcocksjrvinvjrvn?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
  'cosmo terminal': { normal: 'https://soundcloud.com/45555555555/vvbbbb?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', finalLap: 'https://soundcloud.com/45555555555/one-ahead-system-final-lap?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
  'outer space': { normal: 'https://soundcloud.com/45555555555/outer-space?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', finalLap: 'https://soundcloud.com/45555555555/hghub?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
  'big blue': { normal: 'https://soundcloud.com/45555555555/big-blue?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', finalLap: 'https://soundcloud.com/45555555555/jkh?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
  'port town': { normal: 'https://soundcloud.com/45555555555/port-town?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', finalLap: 'https://soundcloud.com/45555555555/vvvvbt?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
  'finish to go': { normal: 'https://soundcloud.com/45555555555/gbgbgbgbgb?in=45555555555/sets/f-zero-gx-ost&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' }
};

// Subtle presentation gradients inspired by each F-Zero GX course environment.
// The background changes only when the corresponding SoundCloud track actually starts.
const PRESENTATION_TRACK_THEMES = {
  'mute city': { primary: '#334b91', secondary: '#642d75' },
  'vegas palace': { primary: '#8a315f', secondary: '#a56c37' },
  'sand ocean': { primary: '#967044', secondary: '#57432f' },
  lightning: { primary: '#57351f', secondary: '#b3541e' },
  aeropolis: { primary: '#ffffff', secondary: '#426887' },
  'green plant': { primary: '#286b46', secondary: '#176e65' },
  'fire field': { primary: '#a04425', secondary: '#842631' },
  'phantom road': { primary: '#78358e', secondary: '#34266f' },
  'cosmo terminal': { primary: '#627b91', secondary: '#8b7048' },
  'outer space': { primary: '#30366f', secondary: '#61345f' },
  'big blue': { primary: '#155c99', secondary: '#16818e' },
  'port town': { primary: '#865039', secondary: '#24596a' }
};
const AUDIO_VOLUME = {
  background: 0.9,
  effect: 1,
  winner: 1
};
const SOUNDCLOUD_PLAYER_VOLUME = 80;
const JURY_WAIT_MS = 7000;
const PRES_FLAG_DELAY_MS = 1000;
const PRES_FLAG_ANIMATE_MS = 4000;
const PRES_POST_ANIMATION_HOLD_MS = 1000;
const PRES_SCROLL_SETTLE_MS = 650;
const JURY_END_SILENCE_MS = 2000;
const TRACK_FADE_OUT_MS = 3000;
const FINAL_LAP_SWITCH_DELAY_MS = 5000;
const WINNER_RUN_DELAY_MS = 5000;
const THREE_TWO_ONE_GO_MS = 4300;
const LONG_PREVIEW_FADE_IN_MS = 3000;
const DEBUG_FAST_FORWARD_DELAY_MS = 16;

// Enable only when diagnosing the music sequence in the browser console.
const MUSIC_DEBUG = true;
const audio = document.getElementById('bgMusic');
const jingleAudio = document.getElementById('jingleMusic');
const winnerAudio = document.getElementById('auxMusic');
const entryAudio = document.getElementById('entryMusic');
const ENTRY_LOOP_START_SECONDS = 8.300;
const ENTRY_LOOP_END_SECONDS = 52.000;
entryAudio.addEventListener('timeupdate', () => {
  if (entryAudio.currentTime >= ENTRY_LOOP_END_SECONDS) {
    entryAudio.currentTime = ENTRY_LOOP_START_SECONDS;
    console.log('U-Rays wiederholt. :-)');
  }
});
let entryMusicPending = false;
let entryMusicStoppedForPresentation = false;
let entryMusicAttemptToken = 0;
const soundcloudPlayerA = document.getElementById('soundcloudPlayerA');
const soundcloudPlayerB = document.getElementById('soundcloudPlayerB');
const JINGLE_TRACKS = {
  entry: 'https://dn721802.ca.archive.org/0/items/f-zero-gx-and-ax-original-soundtracks/CD%202%2F03.%20U-Rays%20%28Tutorial%29.mp3',
  longCoursePreView: 'https://dn801706.us.archive.org/0/items/f-zero-gx-and-ax-original-soundtracks/CD%202%2F20.%20Long%20Pre-View%20%28Course%20View%202%29.mp3',
  threeTwoOneGo: 'F-Zero GX - SFX/Three two one go - louder.mp3',
  yeahFinalLap: 'F-Zero GX - SFX/Yeah, the final lap.mp3',
  finish: 'F-Zero GX - SFX/finiiish.mp3',
  winningRun: 'https://dn721802.ca.archive.org/0/items/f-zero-gx-and-ax-original-soundtracks/CD%202%2F28.%20Hurrah%20for%20the%20Champion%20%28Winning%20Run%29.mp3'
};
const SEASONAL_FINAL_TRACKS = [
  'green plant',  // 0 = Frühling
  'fire field',   // 1 = Sommer
  'aeropolis',    // 2 = Herbst
  'phantom road'  // 3 = Winter
];

const soundcloudSlots = {
  A: {
    iframe: soundcloudPlayerA,
    widget: null,
    ready: false,
    readyPromise: null,
    readyResolve: null,
    loadToken: 0,
    loaded: false,
    role: null,
    pendingRole: null,
    loop: null,
    loopSeekPending: false,
    fadeTimer: null,
    fadeResolve: null
  },
  B: {
    iframe: soundcloudPlayerB,
    widget: null,
    ready: false,
    readyPromise: null,
    readyResolve: null,
    loadToken: 0,
    loaded: false,
    role: null,
    pendingRole: null,
    loop: null,
    loopSeekPending: false,
    fadeTimer: null,
    fadeResolve: null
  }
};
let globalAudioMuted = false;
let musicSequence = createEmptyMusicSequence();

function createEmptyMusicSequence() {
  return {
    autoplay: false,
    preViewActive: false,
    preViewEnded: false,
    finaleStarted: false,
    finalLapStarted: false,
    finalLapScheduled: false,
    finalLapStarting: false,
    finalLapReadyPromise: null,
    finalLapSwapTimer: null,
    finalTrack: null,
    normalPlan: [],
    normalTrackOrder: [],
    normalTrackCursor: 0,
    lastPlayedTrack: null,
    processedJuryRounds: new Set(),
    processedJuryEndRounds: new Set(),
    processedFinalEvents: new Set(),
    transitionToken: 0,
    normalTransitionTimer: null,
    countdownPlayed: false,
    countdownTimer: null,
    winnerStarted: false,
    winnerRunScheduled: false,
    winnerRunStarted: false,
    winnerRunPlaybackStarted: false,
    winnerRunTimer: null
  };
}

function normalizeTrackName(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function applyPresentationTrackTheme(trackName) {
  const presentation = document.getElementById('presentation');
  const normalizedTrack = normalizeTrackName(trackName);
  const theme = PRESENTATION_TRACK_THEMES[normalizeTrackName(trackName)];
  const wasFireField = presentation.classList.contains('fire-field');
  const isFireField = normalizedTrack === 'fire field';
  
  if (!presentation || !theme) return;

  presentation.classList.remove('phantom-rainbow');
  presentation.style.setProperty('--pres-theme-primary', theme.primary);
  presentation.style.setProperty('--pres-theme-secondary', theme.secondary);
  
  presentation.classList.toggle(
    'phantom-rainbow',
    normalizeTrackName(trackName) === 'phantom road'
  );
  
  presentation.classList.toggle('fire-field', isFireField);
  
  if (isFireField && !wasFireField) {
    // Fire Field wurde gerade neu aktiviert
    startFireField(presentation);
  } else if (!isFireField && wasFireField) {
    // Fire Field wird verlassen
    stopFireField();
  }
  
  musicDebug('Presentation background changed to F-Zero GX course theme', {
    track: normalizeTrackName(trackName),
    ...theme
  });
}

function resetPresentationTrackTheme() {
  const presentation = document.getElementById('presentation');
  if (!presentation) return;

  stopFireField();
  presentation.classList.remove('fire-field');
  presentation.classList.remove('phantom-rainbow');
  
  presentation.style.setProperty('--pres-theme-primary', '#342755');
  presentation.style.setProperty('--pres-theme-secondary', '#173f53');
}

function getTrackSource(trackName, variant = 'normal') {
  const entry = MUSIC_TRACKS[normalizeTrackName(trackName)];
  return entry?.[variant] || null;
}

let getCurrentSeasonalFinalTrack = () =>
  SEASONAL_FINAL_TRACKS[Math.floor((new Date().getMonth() + 10) % 12 / 3)];

function musicDebug(event, details = {}) {
  if (!MUSIC_DEBUG) return;
  console.log(`[WorldVision Music ${new Date().toLocaleTimeString()}] ${event}`, details);
}
const NORMAL_TRACK_NAMES = Object.keys(MUSIC_TRACKS).filter(name =>
  name !== 'finish to go' && !FINAL_TRACKS.includes(normalizeTrackName(name))
);

function shuffleTrackList(list) {
  const shuffled = list.slice();
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function pickNormalTrack() {
  if (!musicSequence.normalTrackOrder.length) {
    musicSequence.normalTrackOrder = shuffleTrackList(NORMAL_TRACK_NAMES);
    musicSequence.normalTrackCursor = 0;
    musicDebug('Normal playlist shuffled', { order: musicSequence.normalTrackOrder.slice() });
  }
  if (musicSequence.normalTrackCursor >= musicSequence.normalTrackOrder.length) {
    musicSequence.normalTrackCursor = 0;
    musicDebug('Normal playlist completed; cycling back to the first shuffled track', {
      order: musicSequence.normalTrackOrder.slice()
    });
  }
  const track = musicSequence.normalTrackOrder[musicSequence.normalTrackCursor];
  musicSequence.normalTrackCursor += 1;
  musicDebug('Next normal playlist track selected', {
    track,
    playlistPosition: musicSequence.normalTrackCursor,
    playlistLength: musicSequence.normalTrackOrder.length
  });
  return track || 'mute city';
}

// The final three jury rounds belong to the seasonal finale. The preceding
// rounds are grouped into two-round songs, with one three-round song at the end
// whenever that is needed to use the remaining rounds without a one-round track.

function buildNormalTrackPlan(juryCount) {
  const regularRoundCount = Math.max(0, Number(juryCount) - 3);
  if (regularRoundCount < 2) return [];
  const durations = [];
  let remaining = regularRoundCount;
  if (remaining % 2 === 1) {
    remaining -= 3;
    while (remaining > 0) {
      durations.push(2);
      remaining -= 2;
    }
    durations.push(3);
  } else {
    while (remaining > 0) {
      durations.push(2);
      remaining -= 2;
    }
  }
  let startIndex = 0;
  return durations.map(duration => {
    const slot = { startIndex, duration, track: null };
    startIndex += duration;
    return slot;
  });
}

function setHtmlAudioVolume(element, baseVolume) {
  if (!element) return;
  const fade = element._wvFadeIn;
  if (fade) {
    const progress = Math.min(1, Math.max(0, (performance.now() - fade.startedAt) / fade.durationMs));
    element.volume = globalAudioMuted ? 0 : fade.baseVolume * progress;
    if (progress >= 1) {
      if (element._wvFadeInTimer !== null) clearInterval(element._wvFadeInTimer);
      element._wvFadeInTimer = null;
      element._wvFadeIn = null;
    }
    return;
  }
  element.volume = globalAudioMuted ? 0 : baseVolume;
}

function updateMuteButton() {
  const button = document.querySelector('[data-action="music-toggle"]');
  if (!button) return;
  button.textContent = globalAudioMuted ? '♫ Unmute' : '♫ Mute';
  button.title = globalAudioMuted ? 'Unmute all music and sound effects' : 'Mute all music and sound effects';
  button.setAttribute('aria-pressed', String(globalAudioMuted));
}

function setGlobalAudioMuted(muted) {
  globalAudioMuted = Boolean(muted);
  setHtmlAudioVolume(audio, AUDIO_VOLUME.background);
  setHtmlAudioVolume(jingleAudio, AUDIO_VOLUME.effect);
  setHtmlAudioVolume(winnerAudio, AUDIO_VOLUME.winner);
  setHtmlAudioVolume(entryAudio, AUDIO_VOLUME.background);
  Object.values(soundcloudSlots).forEach(slot => {
    if (slot.widget) {
      try {
        slot.widget.setVolume(globalAudioMuted ? 0 : SOUNDCLOUD_PLAYER_VOLUME);
      } catch (error) {
        console.warn('Could not update SoundCloud volume.', error);
      }
    }
  });
  updateMuteButton();
  musicDebug('Audio mute state applied', { muted: globalAudioMuted });
}

function toggleMusic() {
  setGlobalAudioMuted(!globalAudioMuted);
  musicDebug(globalAudioMuted ? 'Global mute enabled' : 'Global mute disabled');
}

function cancelSoundCloudFade(slot) {
  if (!slot) return;
  if (slot.fadeTimer !== null) clearInterval(slot.fadeTimer);
  slot.fadeTimer = null;
  const resolve = slot.fadeResolve;
  slot.fadeResolve = null;
  if (typeof resolve === 'function') resolve(false);
}

function fadeSoundCloudSlot(slotName, durationMs = TRACK_FADE_OUT_MS, sequence = musicSequence) {
  const slot = soundcloudSlots[slotName];
  if (!slot?.widget || !slot.loaded) return Promise.resolve(false);
  cancelSoundCloudFade(slot);
  musicDebug('SoundCloud fade-out started', { player: slotName, role: slot.role, durationMs });
  return new Promise(resolve => {
    let settled = false;
    const finish = result => {
      if (settled) return;
      settled = true;
      if (slot.fadeTimer !== null) clearInterval(slot.fadeTimer);
      slot.fadeTimer = null;
      if (slot.fadeResolve === finish) slot.fadeResolve = null;
      resolve(result);
    };
    slot.fadeResolve = finish;
    const begin = rawVolume => {
      if (sequence !== musicSequence || !sequence.autoplay) {
        finish(false);
        return;
      }
      const initialVolume = Number.isFinite(Number(rawVolume))
        ? Math.max(0, Math.min(100, Number(rawVolume)))
        : SOUNDCLOUD_PLAYER_VOLUME;
      const startedAt = performance.now();
      const tick = () => {
        if (sequence !== musicSequence || !sequence.autoplay || slot.fadeResolve !== finish) {
          finish(false);
          return;
        }
        const progress = Math.min(1, (performance.now() - startedAt) / Math.max(1, durationMs));
        const nextVolume = globalAudioMuted ? 0 : Math.round(initialVolume * (1 - progress));
        try {
          slot.widget.setVolume(nextVolume);
        } catch (error) {
          console.warn(`Could not fade SoundCloud player ${slotName}.`, error);
          finish(false);
          return;
        }
        if (progress >= 1) {
          try {
            slot.widget.pause();
          } catch (error) {
            console.warn(`Could not pause SoundCloud player ${slotName} after fading.`, error);
          }
          try {
            slot.widget.setVolume(0);
          } catch (_) {
          }
          const previousRole = slot.role;
          slot.loaded = false;
          slot.role = null;
          slot.loop = null;
          slot.loopSeekPending = false;
          musicDebug('SoundCloud fade-out completed', { player: slotName, role: previousRole });
          finish(true);
        }
      };
      tick();
      if (!settled) slot.fadeTimer = setInterval(tick, 50);
    };
    try {
      if (typeof slot.widget.getVolume === 'function') slot.widget.getVolume(begin);
      else begin(SOUNDCLOUD_PLAYER_VOLUME);
    } catch (error) {
      console.warn(`Could not read SoundCloud player ${slotName} volume for fading.`, error);
      begin(SOUNDCLOUD_PLAYER_VOLUME);
    }
  });
}

function transitionSoundCloudTrackA(url, options = {}) {
  const sequence = options.sequence || musicSequence;
  if (!url || sequence !== musicSequence || !sequence.autoplay) return;
  const token = ++sequence.transitionToken;
  if (sequence.normalTransitionTimer !== null) {
    clearTimeout(sequence.normalTransitionTimer);
    sequence.normalTransitionTimer = null;
  }
  const slot = soundcloudSlots.A;
  const needsFade = Boolean(slot.loaded && slot.widget &&
    (slot.role === 'normal' || slot.role === 'final-normal'));
  const startNextTrack = () => {
    if (sequence !== musicSequence || !sequence.autoplay || sequence.transitionToken !== token) return;
    musicDebug('Loading next SoundCloud track on player A', {
      track: options.trackName || 'seasonal finale',
      role: options.role || 'normal',
      loop: options.loop || null
    });
    loadSoundCloudTrack(url, 'A', {
      autoPlay: true,
      role: options.role || 'normal',
      trackName: options.trackName || null,
      loop: options.loop || null,
      sequence
    }).catch(error => {
      console.error('The next SoundCloud track could not be started.', error);
      toast('The next music track could not be loaded.');
    });
  };
  if (!needsFade) {
    startNextTrack();
    return;
  }
  fadeSoundCloudSlot('A', TRACK_FADE_OUT_MS, sequence).then(() => {
    if (sequence !== musicSequence || !sequence.autoplay || sequence.transitionToken !== token) return;
    musicDebug('Silence after SoundCloud fade-out started', { durationMs: JURY_END_SILENCE_MS });
    sequence.normalTransitionTimer = setTimeout(() => {
      sequence.normalTransitionTimer = null;
      startNextTrack();
    }, JURY_END_SILENCE_MS);
  });
}

function playHtmlAudio(element, source, options = {}) {
  if (!element || !source || !activeShow()?.settings?.musicEnabled) return Promise.resolve(false);
  const {
    baseVolume = AUDIO_VOLUME.effect,
    loop = null,
    fadeInMs = 0,
    onEnded = null,
    onFailure = null
  } = options;
  if (element._wvFadeInTimer !== null && element._wvFadeInTimer !== undefined) {
    clearInterval(element._wvFadeInTimer);
  }
  element._wvFadeInTimer = null;
  element._wvFadeIn = null;
  element.pause();
  element.onended = null;
  element.onerror = null;
  element.loop = false;
  element.removeAttribute('src');
  element.load();
  element.src = source;
  element.currentTime = 0;
  musicDebug('HTML audio track requested', { player: element.id || 'audio element', source });
  element.dataset.loopStart = String(Number(loop?.start) || 0);
  element.dataset.loopEnd = String(Number(loop?.end) || 0);
  if (fadeInMs > 0) {
    element._wvFadeIn = { baseVolume, startedAt: performance.now(), durationMs: fadeInMs };
    element.volume = 0;
  } else {
    setHtmlAudioVolume(element, baseVolume);
  }
  element.onended = typeof onEnded === 'function' ? onEnded : null;
  element.onerror = () => {
    if (typeof onFailure === 'function') onFailure(new Error(`Audio could not be loaded: ${source}`));
  };
  const playRequest = element.play();
  if (fadeInMs > 0) {
    const tickFadeIn = () => setHtmlAudioVolume(element, baseVolume);
    tickFadeIn();
    if (element._wvFadeIn) element._wvFadeInTimer = setInterval(tickFadeIn, 25);
  }
  if (playRequest && typeof playRequest.catch === 'function') {
    playRequest.catch(error => {
      if (element._wvFadeInTimer !== null) clearInterval(element._wvFadeInTimer);
      element._wvFadeInTimer = null;
      element._wvFadeIn = null;
      element.volume = globalAudioMuted ? 0 : baseVolume;
      if (typeof onFailure === 'function') onFailure(error);
      else console.warn('HTML audio playback was blocked.', error);
    });
  }
  return playRequest || Promise.resolve(true);
}

function cancelLongPreviewPreload() {
  if (audio && typeof audio._wvCancelPreload === 'function') audio._wvCancelPreload();
  if (audio) {
    audio._wvPreloadSource = null;
    audio._wvPreloadPromise = null;
    audio._wvCancelPreload = null;
  }
}

function preloadLongPreview() {
  if (!audio) return Promise.resolve(false);
  const source = JINGLE_TRACKS.longCoursePreView;
  if (audio._wvPreloadSource !== source || audio.error) {
    if (typeof audio._wvCancelPreload === 'function') audio._wvCancelPreload();
    audio.pause();
    audio.preload = 'auto';
    audio.removeAttribute('src');
    audio.src = source;
    audio.currentTime = 0;
    audio.volume = 0;
    audio._wvPreloadSource = source;
    audio._wvPreloadPromise = null;
    audio.load();
  }
  // HAVE_CURRENT_DATA is enough to start playback without waiting for the
  // browser to estimate that the entire remote file will fit in its buffer.
  if (audio.readyState >= 2) return Promise.resolve(true);
  if (audio._wvPreloadPromise) return audio._wvPreloadPromise;
  const preloadPromise = new Promise(resolve => {
    let settled = false;
    let timeoutId = null;
    const finish = ready => {
      if (settled) return;
      settled = true;
      if (timeoutId !== null) clearTimeout(timeoutId);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('error', onError);
      audio._wvCancelPreload = null;
      audio._wvPreloadPromise = null;
      if (!ready) audio._wvPreloadSource = null;
      resolve(ready);
    };
    const onCanPlay = () => finish(audio.readyState >= 2);
    const onError = () => finish(false);
    audio._wvCancelPreload = () => finish(false);
    audio.addEventListener('canplay', onCanPlay, { once: true });
    audio.addEventListener('error', onError, { once: true });
    timeoutId = setTimeout(() => finish(false), 15000);
  });
  audio._wvPreloadPromise = preloadPromise;
  return preloadPromise;
}

async function playPreloadedLongPreview(element, source, options = {}) {
  if (!activeShow()?.settings?.musicEnabled) return false;
  const {
    baseVolume = AUDIO_VOLUME.background,
    fadeInMs = LONG_PREVIEW_FADE_IN_MS,
    onEnded = null,
    onFailure = null
  } = options;
  let failureHandled = false;
  const fail = error => {
    if (failureHandled) return;
    failureHandled = true;
    if (element._wvFadeInTimer !== null && element._wvFadeInTimer !== undefined) {
      clearInterval(element._wvFadeInTimer);
    }
    element._wvFadeInTimer = null;
    element._wvFadeIn = null;
    if (typeof onFailure === 'function') onFailure(error);
    else console.warn('The preloaded Long Preview could not be played.', error);
  };
  try {
    if (element !== audio || source !== JINGLE_TRACKS.longCoursePreView) {
      throw new Error('The Long Preview preload target is not configured correctly.');
    }
    const ready = await preloadLongPreview();
    if (!ready || element.readyState < 2) {
      throw new Error('The Long Preview did not become ready to play.');
    }
    if (element._wvFadeInTimer !== null && element._wvFadeInTimer !== undefined) {
      clearInterval(element._wvFadeInTimer);
    }
    element._wvFadeInTimer = null;
    element._wvFadeIn = null;
    element.pause();
    element.currentTime = 0;
    element.volume = 0;
    element.onended = typeof onEnded === 'function' ? onEnded : null;
    element.onerror = () => fail(new Error(`Audio could not be played: ${source}`));
    // Start the fade only after play() confirms that playback has actually begun.
    await element.play();
    if (fadeInMs > 0) {
      element._wvFadeIn = { baseVolume, startedAt: performance.now(), durationMs: fadeInMs };
      const tickFadeIn = () => setHtmlAudioVolume(element, baseVolume);
      tickFadeIn();
      if (element._wvFadeIn) element._wvFadeInTimer = setInterval(tickFadeIn, 25);
    } else {
      setHtmlAudioVolume(element, baseVolume);
    }
    musicDebug('Preloaded Long Preview playback started', { fadeInMs, readyState: element.readyState });
    return true;
  } catch (error) {
    fail(error);
    return false;
  }
}

function applyLoopWatch(element) {
  if (!element) return;
  const start = Number(element.dataset.loopStart || 0);
  const end = Number(element.dataset.loopEnd || 0);
  if (end > start && element.currentTime >= end) {
    element.currentTime = start;
    element.play().catch(() => {
    });
  }
}

function ensureSoundCloudWidget(slotName) {
  const slot = soundcloudSlots[slotName];
  if (!slot) return Promise.reject(new Error(`Unknown SoundCloud player: ${slotName}`));
  if (slot.ready) return Promise.resolve(slot.widget);
  if (slot.readyPromise) return slot.readyPromise;
  if (!window.SC || !window.SC.Widget) {
    return Promise.reject(new Error('The SoundCloud Widget API is unavailable. Check your internet connection.'));
  }
  // Assign the iframe source immediately before creating the widget, so the
  // READY event cannot be missed while the hidden iframe loads in the background.
  slot.iframe.src = 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com&auto_play=false&single_active=false&visual=false';
  slot.widget = window.SC.Widget(slot.iframe);
  slot.readyPromise = new Promise((resolve, reject) => {
    slot.readyResolve = resolve;
    const readyTimeout = setTimeout(() => {
      if (!slot.ready) reject(new Error(`SoundCloud player ${slotName} did not become ready.`));
    }, 20000);
    slot.widget.bind(window.SC.Widget.Events.READY, () => {
      slot.ready = true;
      clearTimeout(readyTimeout);
      musicDebug('SoundCloud player ready', { player: slotName });
      try {
        slot.widget.setVolume(globalAudioMuted ? 0 : SOUNDCLOUD_PLAYER_VOLUME);
      } catch (error) {
        console.warn('Could not set initial SoundCloud volume.', error);
      }
      if (slot.readyResolve) slot.readyResolve(slot.widget);
      slot.readyResolve = null;
    });
    slot.widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, progress => {
      handleSoundCloudLoop(slotName, progress);
    });
    slot.widget.bind(window.SC.Widget.Events.FINISH, () => {
      handleSoundCloudFinish(slotName);
    });
    slot.widget.bind(window.SC.Widget.Events.ERROR, event => {
      console.error(`SoundCloud player ${slotName} error:`, event);
      if (slot.role === 'finish-to-go') {
        toast('SoundCloud could not play “Finish to go”.');
      }
    });
  });
  return slot.readyPromise;
}

function handleSoundCloudLoop(slotName, progress) {
  const slot = soundcloudSlots[slotName];
  if (!slot?.widget || !slot.loop || slot.role === 'finish-to-go') return;
  const startMs = Math.max(0, Number(slot.loop.start) || 0) * 1000;
  const endMs = Math.max(0, Number(slot.loop.end) || 0) * 1000;
  const currentMs = Number(progress?.currentPosition);
  if (!(endMs > startMs) || !Number.isFinite(currentMs)) return;
  if (currentMs < endMs - 1500) slot.loopSeekPending = false;
  if (currentMs >= endMs && !slot.loopSeekPending) {
    slot.loopSeekPending = true;
    musicDebug('SoundCloud A/B loop rewinding', { player: slotName, role: slot.role, fromMs: currentMs, toMs: startMs });
    slot.widget.seekTo(startMs);
    slot.widget.play();
  }
}

function revealNextHostAfterWinningRun(sequence) {
  if (musicSequence !== sequence || !sequence.winnerRunPlaybackStarted || !pres) return;
  pres.hostRevealReady = true;
  const currentEvent = pres.events[presIndex];
  if (currentEvent?.type === 'host-announcement') {
    renderPres();
    if (!presPaused) scheduleAutoStep();
  }
}

function handleSoundCloudFinish(slotName) {
  const slot = soundcloudSlots[slotName];
  if (!slot || slot.role !== 'finish-to-go' || musicSequence.winnerRunScheduled || musicSequence.winnerRunStarted) return;
  const sequence = musicSequence;
  sequence.winnerRunScheduled = true;
  musicDebug('Finish to go ended; waiting before Winning Run', { player: slotName, delayMs: WINNER_RUN_DELAY_MS });
  sequence.winnerRunTimer = setTimeout(() => {
    sequence.winnerRunTimer = null;
    if (musicSequence !== sequence || !sequence.autoplay || sequence.winnerRunStarted) return;
    sequence.winnerRunStarted = true;
    musicDebug('Starting Winning Run after post-finish delay', { delayMs: WINNER_RUN_DELAY_MS });
    const playback = playHtmlAudio(winnerAudio, JINGLE_TRACKS.winningRun, {
      baseVolume: AUDIO_VOLUME.winner,
      onFailure: error => {
        console.error('Winning Run could not be played.', error);
        toast('The Winning Run audio could not be loaded.');
      }
    });
    Promise.resolve(playback).then(() => {
      if (musicSequence !== sequence || !sequence.autoplay) return;
      sequence.winnerRunPlaybackStarted = true;
      revealNextHostAfterWinningRun(sequence);
      musicDebug('Winning Run playback confirmed; host announcement unlocked');
    }).catch(error => {
      console.error('Winning Run playback did not start.', error);
    });
  }, WINNER_RUN_DELAY_MS);
}

async function loadSoundCloudTrack(url, slotName, options = {}) {
  if (!activeShow()?.settings?.musicEnabled) return false;
  if (!url) throw new Error('No SoundCloud track URL was provided.');
  const slot = soundcloudSlots[slotName];
  const sequenceGuard = options.sequence || null;
  const widget = await ensureSoundCloudWidget(slotName);
  if (sequenceGuard && (musicSequence !== sequenceGuard || !sequenceGuard.autoplay)) return false;
  const token = ++slot.loadToken;
  const autoPlay = Boolean(options.autoPlay);
  cancelSoundCloudFade(slot);
  slot.loaded = false;
  slot.role = null;
  slot.pendingRole = options.role || 'background';
  slot.loop = options.loop || null;
  slot.loopSeekPending = false;
  widget.setVolume(globalAudioMuted ? 0 : SOUNDCLOUD_PLAYER_VOLUME);
  musicDebug('SoundCloud load requested', { player: slotName, url, role: options.role || 'background', autoPlay });
  return new Promise((resolve, reject) => {
    let settled = false;
    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      if (token === slot.loadToken) {
        slot.loaded = false;
        slot.role = null;
        slot.pendingRole = null;
      }
      reject(new Error(`SoundCloud track did not finish loading in player ${slotName}.`));
    }, 30000);
    const finishLoad = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      if (token !== slot.loadToken || (sequenceGuard && (musicSequence !== sequenceGuard || !sequenceGuard.autoplay))) {
        if (token === slot.loadToken) {
          slot.loaded = false;
          slot.role = null;
          slot.pendingRole = null;
        }
        resolve(false);
        return;
      }
      slot.loaded = true;
      slot.role = slot.pendingRole;
      slot.pendingRole = null;
      widget.setVolume(globalAudioMuted ? 0 : SOUNDCLOUD_PLAYER_VOLUME);
      widget.seekTo(0);
      if (autoPlay) {
        applyPresentationTrackTheme(options.trackName);
        widget.play();
      }
      musicDebug('SoundCloud track loaded', {
        player: slotName,
        role: slot.role,
        track: options.trackName || null,
        autoPlay
      });
      resolve(true);
    };
    try {
      widget.load(url, {
        auto_play: false,
        single_active: false,
        visual: false,
        hide_related: true,
        show_comments: false,
        show_user: false,
        show_reposts: false,
        download: false,
        sharing: false,
        callback: finishLoad
      });
    } catch (error) {
      clearTimeout(timeout);
      settled = true;
      if (token === slot.loadToken) {
        slot.loaded = false;
        slot.role = null;
        slot.pendingRole = null;
      }
      reject(error);
    }
  });
}

function stopSoundCloudSlot(slotName) {
  const slot = soundcloudSlots[slotName];
  if (!slot) return;
  cancelSoundCloudFade(slot);
  musicDebug('Stopping SoundCloud player', { player: slotName, role: slot.role });
  slot.loadToken += 1;
  slot.loaded = false;
  slot.pendingRole = null;
  if (!slot.widget) {
    slot.role = null;
    slot.loop = null;
    slot.loopSeekPending = false;
    return;
  }
  try {
    slot.widget.pause();
  } catch (error) {
    console.warn(`Could not pause SoundCloud player ${slotName}.`, error);
  }
  slot.role = null;
  slot.pendingRole = null;
  slot.loop = null;
  slot.loopSeekPending = false;
}

function playSeasonalFinale() {
  if (musicSequence.finaleStarted) return;
  musicSequence.finaleStarted = true;
  musicSequence.finalTrack = getCurrentSeasonalFinalTrack();
  const sequence = musicSequence;
  const track = sequence.finalTrack;
  const finalLapUrl = getTrackSource(track, 'finalLap');
  const normalUrl = getTrackSource(track, 'normal');
  const loop = HOTLOOP_TRACKS[track] || {};
  musicDebug('Seasonal finale preparation started', {
    track,
    normalUrl,
    finalLapUrl,
    playerA: 'normal version',
    playerB: 'preloaded final-lap version'
  });
  // Player B is prepared first and remains paused. Player A transitions to
  // the normal version using the 3-second fade and 2-second silence rule.
  sequence.finalLapReadyPromise = loadSoundCloudTrack(finalLapUrl, 'B', {
    autoPlay: false,
    role: 'final-lap',
    trackName: track,
    loop: loop.finalLap || null,
    sequence
  }).catch(error => {
    console.warn('The final-lap version could not be preloaded; it will be retried at the swap.', error);
    musicDebug('Final-lap preload failed', { player: 'B', error: error?.message || String(error) });
    return false;
  });
  transitionSoundCloudTrackA(normalUrl, {
    role: 'final-normal',
    trackName: track,
    loop: loop.normal || null,
    sequence
  });
}

async function beginFinalLap(reason) {
  if (!musicSequence.autoplay || !musicSequence.finaleStarted || musicSequence.finalLapStarted || musicSequence.finalLapScheduled || musicSequence.finalLapStarting) return;
  const sequence = musicSequence;
  sequence.finalLapStarting = true;
  try {
    const track = sequence.finalTrack;
    const loop = HOTLOOP_TRACKS[track] || {};
    let preloaded = false;
    if (sequence.finalLapReadyPromise) {
      try {
        preloaded = await sequence.finalLapReadyPromise;
      } catch (error) {
        console.warn('The first final-lap preload attempt failed.', error);
      }
    }
    if (musicSequence !== sequence || !sequence.autoplay) return;
    if (!preloaded || !soundcloudSlots.B.loaded) {
      await loadSoundCloudTrack(getTrackSource(track, 'finalLap'), 'B', {
        autoPlay: false,
        role: 'final-lap',
        trackName: track,
        loop: loop.finalLap || null,
        sequence
      });
    }
    if (musicSequence !== sequence || !sequence.autoplay || !soundcloudSlots.B.loaded) return;
    sequence.finalLapScheduled = true;
    sequence.finalLapReason = reason;
    musicDebug('Final-lap cue started; current SoundCloud track will continue for five seconds', {
      reason,
      currentPlayer: 'A',
      preparedPlayer: 'B',
      delayMs: FINAL_LAP_SWITCH_DELAY_MS
    });
    playHtmlAudio(jingleAudio, JINGLE_TRACKS.yeahFinalLap, {
      baseVolume: AUDIO_VOLUME.effect,
      onFailure: error => console.error('The final-lap sound effect could not be played.', error)
    });
    sequence.finalLapSwapTimer = setTimeout(async () => {
      sequence.finalLapSwapTimer = null;
      if (musicSequence !== sequence || !sequence.autoplay || sequence.finalLapStarted) return;
      try {
        const playerB = await ensureSoundCloudWidget('B');
        if (musicSequence !== sequence || !sequence.autoplay) return;
        musicDebug('Final-lap delay completed; swapping SoundCloud players', {
          from: 'A',
          to: 'B',
          track,
          delayMs: FINAL_LAP_SWITCH_DELAY_MS
        });
        stopSoundCloudSlot('A');
        soundcloudSlots.B.role = 'final-lap';
        soundcloudSlots.B.loop = loop.finalLap || null;
        soundcloudSlots.B.loopSeekPending = false;
        playerB.setVolume(globalAudioMuted ? 0 : SOUNDCLOUD_PLAYER_VOLUME);
        playerB.seekTo(0);
        applyPresentationTrackTheme(track);
        playerB.play();
        sequence.finalLapStarted = true;
        
        // Fire Field: Feuerstrahlen im Final Lap schneller erzeugen
        if (normalizeTrackName(track) === 'fire field') {
          const presentation = document.getElementById('presentation');
        
          if (presentation) {
            setFireFieldFinalLap(presentation, true);
          }
        }
      } catch (error) {
        console.error('The final-lap player swap failed.', error);
        toast('The final-lap track could not be started.');
      }
    }, FINAL_LAP_SWITCH_DELAY_MS);
  } catch (error) {
    console.error('The final-lap player could not be prepared.', error);
    toast('The final-lap track could not be prepared.');
  } finally {
    if (musicSequence === sequence) sequence.finalLapStarting = false;
  }
}

function startNormalTrackForRound(roundIndex, options = {}) {
  const plannedSlot = musicSequence.normalPlan.find(slot => slot.startIndex === roundIndex);
  if (!plannedSlot || plannedSlot.track) return;
  plannedSlot.track = pickNormalTrack();
  musicSequence.lastPlayedTrack = plannedSlot.track;
  const loop = HOTLOOP_TRACKS[plannedSlot.track]?.normal || null;
  const track = plannedSlot.track;
  musicDebug('Normal jury song assigned to round block', {
    track,
    startRound: roundIndex + 1,
    durationRounds: plannedSlot.duration,
    transition: options.withFade ? 'fade + silence' : 'direct start'
  });
  if (options.withFade) {
    transitionSoundCloudTrackA(getTrackSource(track, 'normal'), {
      role: 'normal',
      trackName: track,
      loop,
      sequence: musicSequence
    });
  } else {
    loadSoundCloudTrack(getTrackSource(track, 'normal'), 'A', {
      autoPlay: true,
      role: 'normal',
      trackName: track,
      loop,
      sequence: musicSequence
    }).catch(error => {
      console.error(`The normal track ${track} could not be started.`, error);
      toast(`The normal track “${track}” could not be loaded.`);
    });
  }
  if (!musicSequence.countdownPlayed) {
    musicSequence.countdownPlayed = true;
    const currentSequence = musicSequence;
    currentSequence.countdownTimer = setTimeout(() => {
      if (musicSequence !== currentSequence || !musicSequence.autoplay) return;
      musicDebug('Playing 3-2-1-Go sound effect');
      playHtmlAudio(jingleAudio, JINGLE_TRACKS.threeTwoOneGo, {
        baseVolume: AUDIO_VOLUME.effect,
        onFailure: error => console.error('The countdown sound effect could not be played.', error)
      });
    }, THREE_TWO_ONE_GO_MS);
  }
}

function stopEntryMusic() {
  entryMusicAttemptToken++;
  entryMusicPending = false;
  entryAudio.pause();
  entryAudio.currentTime = 0;
  entryAudio.removeAttribute('src');
  entryAudio.load();
}

function tryStartEntryMusic() {
  const show = activeShow();
  if (!show?.settings?.musicEnabled || entryMusicStoppedForPresentation || pres) return;
  if (!entryAudio.src) entryAudio.src = JINGLE_TRACKS.entry;
  entryAudio.loop = false;
  
  if (entryAudio._wvFadeInTimer !== null && entryAudio._wvFadeInTimer !== undefined) {
    clearInterval(entryAudio._wvFadeInTimer);
  }
  entryAudio._wvFadeInTimer = null;
  entryAudio._wvFadeIn = null;
  entryAudio.volume = 0;

  const token = ++entryMusicAttemptToken;
  const playback = entryAudio.play();
  if (!playback || typeof playback.then !== 'function') {
    entryMusicPending = false;
    return;
  }
  playback.then(() => {
    if (token !== entryMusicAttemptToken || entryMusicStoppedForPresentation || pres || !activeShow()?.settings?.musicEnabled) {
      entryAudio.pause();
      return;
    }
    entryMusicPending = false;

    entryAudio._wvFadeIn = {
      baseVolume: AUDIO_VOLUME.background,
      startedAt: performance.now(),
      durationMs: 3000
    };

    const tickFadeIn = () => setHtmlAudioVolume(entryAudio, AUDIO_VOLUME.background);
    tickFadeIn();

    if (entryAudio._wvFadeIn) {
      entryAudio._wvFadeInTimer = setInterval(tickFadeIn, 25);
    }
  }).catch(error => {
    if (token !== entryMusicAttemptToken) return;
    entryMusicPending = true;
    console.info('Intro music is waiting for a user interaction because browser autoplay was blocked.', error);
  });
}

function syncEntryMusicSetting() {
  if (!activeShow()?.settings?.musicEnabled) {
    stopMusic();
    return;
  }
  if (!pres && !entryMusicStoppedForPresentation) tryStartEntryMusic();
}

function startMusicAutoplay() {
  musicSequence = createEmptyMusicSequence();
  musicSequence.autoplay = true;
  const show = activeShow();
  musicSequence.normalPlan = buildNormalTrackPlan(show?.juries?.length || 0);
  musicSequence.normalTrackOrder = shuffleTrackList(NORMAL_TRACK_NAMES);
  musicSequence.normalTrackCursor = 0;
  musicDebug('Autoplay started', {
    juryCount: show?.juries?.length || 0,
    normalPlan: musicSequence.normalPlan.map(slot => ({ startRound: slot.startIndex + 1, duration: slot.duration })),
    shuffledNormalPlaylist: musicSequence.normalTrackOrder.slice()
  });
}

function beginPreViewSequence() {
  if (!musicSequence.autoplay || musicSequence.preViewActive || musicSequence.preViewEnded) return;
  musicDebug('Starting Long Course Pre-View');
  musicSequence.preViewActive = true;
  const completePreview = () => {
    if (!musicSequence.autoplay || musicSequence.preViewEnded) return;
    musicSequence.preViewActive = false;
    musicSequence.preViewEnded = true;
    musicDebug('Long Course Pre-View finished');
    if (pres && presIndex === 0 && !presPaused) presNext(true);
  };
  playPreloadedLongPreview(audio, JINGLE_TRACKS.longCoursePreView, {
    baseVolume: AUDIO_VOLUME.background,
    fadeInMs: LONG_PREVIEW_FADE_IN_MS,
    onEnded: completePreview,
    onFailure: error => {
      if (!musicSequence.autoplay) return;
      console.warn('The course preview could not be played.', error);
      toast('The course preview could not be loaded; the voting will continue.');
      completePreview();
    }
  });
}

function startLiveJuryMusicIfAllowed() {
  if (!activeShow()?.settings?.musicEnabled) return false;
  if (pres?.debugFastForward) return false;
  if (musicSequence.autoplay) return false;
  startMusicAutoplay();
  if (presIndex === 0) {
    beginPreViewSequence();
  } else {
    // If the user manually advanced before pressing Play, do not insert the
    // course preview late into the show. Music begins at the current event.
    musicSequence.preViewEnded = true;
  }
  return true;
}

function triggerAutoplayMusicForCurrentEvent() {
  if (!musicSequence.autoplay || !pres) return;
  const event = pres.events[presIndex];
  const show = activeShow();
  if (!event || !show) return;
  const juryCount = show.juries.length;
  const finalStartIndex = Math.max(0, juryCount - 3);
  if (event.type === 'jury-intro') {
    const roundIndex = Number(event.juryIndex);
    if (!Number.isInteger(roundIndex) || musicSequence.processedJuryRounds.has(roundIndex)) return;
    musicSequence.processedJuryRounds.add(roundIndex);
    if (roundIndex < finalStartIndex) {
      const currentPlannedSlot = musicSequence.normalPlan.find(slot => slot.startIndex === roundIndex);
      if (currentPlannedSlot && !currentPlannedSlot.track) {
        startNormalTrackForRound(roundIndex, { withFade: Boolean(soundcloudSlots.A.loaded) });
      }
    } else if (roundIndex >= finalStartIndex && !musicSequence.finaleStarted) {
      // Fallback for manual navigation that enters the finale without the
      // preceding jury-end transition having run.
      playSeasonalFinale();
    }
    const isLastJury = roundIndex === juryCount - 1;
    if (isLastJury && !show.settings.televoteEnabled && juryCount > 1) {
      beginFinalLap('last-jury');
    }
    return;
  }
  if (event.type === 'jury-end') {
    const roundIndex = Number(event.juryIndex);
    if (!Number.isInteger(roundIndex) || musicSequence.processedJuryEndRounds.has(roundIndex)) return;
    musicSequence.processedJuryEndRounds.add(roundIndex);
    const nextRoundIndex = roundIndex + 1;
    if (nextRoundIndex === finalStartIndex && !musicSequence.finaleStarted) {
      // Preload the seasonal final-lap on B while fading A, then start the
      // normal seasonal version on A after the two-second silent gap.
      playSeasonalFinale();
    } else if (nextRoundIndex < finalStartIndex) {
      startNormalTrackForRound(nextRoundIndex, { withFade: true });
    }
    return;
  }
  if (event.type === 'tv-point' || event.type === 'tv-finish') {
    if (!show.settings.televoteEnabled || musicSequence.processedFinalEvents.has('televote')) return;
    musicSequence.processedFinalEvents.add('televote');
    if (!musicSequence.finaleStarted) playSeasonalFinale();
    beginFinalLap('televote');
    return;
  }
  if (event.type === 'winner' || event.type === 'host-choice' || event.type === 'host-announcement') {
    beginWinnerSequence();
  }
}

function beginWinnerSequence() {
  if (!musicSequence.autoplay || musicSequence.winnerStarted) return;
  resetPresentationTrackTheme();
  musicSequence.winnerStarted = true;
  musicDebug('Winner is confirmed; starting finish sequence', { htmlAudio: 'finiiish.mp3', soundCloud: 'Finish to go' });
  stopSoundCloudSlot('A');
  stopSoundCloudSlot('B');
  playHtmlAudio(jingleAudio, JINGLE_TRACKS.finish, {
    baseVolume: AUDIO_VOLUME.effect,
    onFailure: error => {
      console.error('The finish sound effect could not be played.', error);
      toast('The finish sound effect could not be loaded.');
    }
  });
  const finishToGoUrl = MUSIC_TRACKS['finish to go']?.normal;
  loadSoundCloudTrack(finishToGoUrl, 'A', {
    autoPlay: true,
    role: 'finish-to-go',
    loop: null,
    sequence: musicSequence
  }).catch(error => {
    console.error('SoundCloud “Finish to go” could not be started.', error);
    toast('SoundCloud “Finish to go” could not be loaded.');
  });
}

function handleMusicForPresentationStep() {
  if (!activeShow()?.settings?.musicEnabled || !musicSequence.autoplay || !pres || pres.debugFastForward) return;
  if (presIndex === 0 && !musicSequence.preViewEnded) return;
  triggerAutoplayMusicForCurrentEvent();
}

function resetMusicSequence() {
  const oldSequence = musicSequence;
  [oldSequence.countdownTimer, oldSequence.normalTransitionTimer,
  oldSequence.finalLapSwapTimer, oldSequence.winnerRunTimer].forEach(timer => {
    if (timer !== null && timer !== undefined) clearTimeout(timer);
  });
  Object.values(soundcloudSlots).forEach(cancelSoundCloudFade);
  musicSequence = createEmptyMusicSequence();
  musicDebug('Music sequence reset');
}

function stopMusic() {
  cancelLongPreviewPreload();
  stopEntryMusic();
  stopSoundCloudSlot('A');
  stopSoundCloudSlot('B');
  [audio, jingleAudio, winnerAudio].forEach(element => {
    if (!element) return;
    if (element._wvFadeInTimer !== null && element._wvFadeInTimer !== undefined) {
      clearInterval(element._wvFadeInTimer);
    }
    element._wvFadeInTimer = null;
    element._wvFadeIn = null;
    element.pause();
    element.onended = null;
    element.onerror = null;
    element.removeAttribute('src');
    element.load();
    element.loop = false;
    element.dataset.loopStart = '0';
    element.dataset.loopEnd = '0';
  });
  resetMusicSequence();
  resetPresentationTrackTheme();
}

function pickFinalTrack() {
  return getCurrentSeasonalFinalTrack();
}

function initializeSoundCloudPlayers() {
  if (!window.SC || !window.SC.Widget) return;
  ensureSoundCloudWidget('A').catch(error => console.warn(error));
  ensureSoundCloudWidget('B').catch(error => console.warn(error));
}
const DEFAULT_COUNTRIES = [['DE', 'Germany'], ['FR', 'France'], ['IT', 'Italy'], ['ES', 'Spain'], ['GB', 'United Kingdom'], ['SE', 'Sweden'], ['NO', 'Norway'], ['FI', 'Finland'], ['DK', 'Denmark'], ['NL', 'Netherlands'], ['BE', 'Belgium'], ['AT', 'Austria'], ['CH', 'Switzerland'], ['PT', 'Portugal'], ['GR', 'Greece'], ['IE', 'Ireland'], ['PL', 'Poland'], ['UA', 'Ukraine'], ['IS', 'Iceland'], ['CZ', 'Czechia'], ['HR', 'Croatia'], ['SI', 'Slovenia'], ['RS', 'Serbia'], ['AU', 'Australia'], ['CA', 'Canada'], ['JP', 'Japan'], ['BR', 'Brazil'], ['US', 'United States']];
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
const clone = o => JSON.parse(JSON.stringify(o));

const COUNTRY_DATA_URL =
  'https://raw.githubusercontent.com/mledoze/countries/master/countries.json';

let countryLookupPromise = null;

function normalizeCountryName(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function buildCountryLookup(countries) {
  const byCode = new Map();
  const byName = new Map();

  countries.forEach(country => {
    const code = String(country.cca2 || '').toUpperCase();
    if (!/^[A-Z]{2}$/.test(code)) return;

    const commonName = country.name?.common;
    if (!commonName) return;

    byCode.set(code, {
      code,
      name: commonName
    });

    const names = [
      commonName,
      country.name?.official,
      country.translations?.deu?.common,
      ...(country.altSpellings || [])
    ];

    names.filter(Boolean).forEach(name => {
      byName.set(normalizeCountryName(name), code);
    });
  });

  return { byCode, byName };
}

function getCountryLookup() {
  if (!countryLookupPromise) {
    countryLookupPromise = fetch(COUNTRY_DATA_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Country data could not be loaded.');
        }
        return response.json();
      })
      .then(countries => buildCountryLookup(countries))
      .catch(error => {
        console.warn('Using fallback country data.', error);

        return buildCountryLookup(
          DEFAULT_COUNTRIES.map(([cca2, name]) => ({
            cca2,
            name: {
              common: name,
              official: name
            }
          }))
        );
      });
  }

  return countryLookupPromise;
}

function toISOCode(value) {
  const v = String(value ?? '').trim();
  if (/^[a-z]{2}$/i.test(v)) return v.toUpperCase();
  const chars = Array.from(v);
  if (chars.length === 2 && chars.every(ch => {
    const cp = ch.codePointAt(0);
    return cp >= 0x1F1E6 && cp <= 0x1F1FF;
  })) return chars.map(ch => String.fromCharCode(ch.codePointAt(0) - 0x1F1E6 + 65)).join('');
  return '';
}

function migrateFlagCodes(data) {
  let changed = false;
  (data.shows || []).forEach(show => (show.participants || []).forEach(participant => {
    const code = toISOCode(participant.flag);
    if (participant.flag !== code) {
      participant.flag = code;
      changed = true;
    }
  }));
  if (changed) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
    }
  }
  return data;
}

function flagImageHTML(value, height = 26) {
  const code = toISOCode(value);
  if (!code) return '<span class="flag-placeholder">—</span>';
  const lower = code.toLowerCase();
  return `<img class="country-flag" src="https://flagcdn.com/w80/${lower}.png" alt="${code} flag" loading="lazy" decoding="async" style="height:${height}px;width:auto;max-width:54px;object-fit:contain" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'flag-placeholder',textContent:'${code}'}))">`;
}

function juryFlagHTML(value) {
  return /^[a-z]{2}$/i.test(String(value || '')) ? flagImageHTML(value, 25) : safe(value || '🎤');
}

function blankShow(name = 'WorldVision 2026') {
  return { id: uid(), name, year: new Date().getFullYear(), host: '', participants: [], juries: [], settings: { televoteEnabled: false, televoteOrder: 'jury', excludeSelf: true, points: POINTS.slice(), pointPreset: 'esc', musicEnabled: false }, televote: {}, musicName: '', musicAssetId: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
}

function initialDB() {
  const s = blankShow('My first WorldVision show');
  return { version: 1, musicSettingMigratedV313: true, activeShowId: s.id, shows: [s] };
}
let juryImportPreview = null, juryImportText = '';
let db = loadDB(), view = 'home', pres = null, presIndex = 0, presTimer = null, presRevealTimer = null, presRevealPending = false, presRevealRemaining = 0, presRevealStartedAt = 0, presPostAnimationTimer = null, presPostAnimationPending = false, presPostAnimationRemaining = 0, presPostAnimationStartedAt = 0, presSpeed = 3000, presPaused = true, toastTimer = null, spoilersRevealed = false, jurySpoilersRevealed = false;
const root = document.getElementById('viewRoot');

function loadDB() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialDB();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.shows)) return initialDB();
    let changed = false;
    if (!parsed.musicSettingMigratedV313) {
      (parsed.shows || []).forEach(show => {
        show.settings = show.settings || {};
        show.settings.musicEnabled = false;
        show.musicName = '';
        show.musicAssetId = null;
      });
      parsed.musicSettingMigratedV313 = true;
      changed = true;
    }
    const migrated = migrateFlagCodes(parsed);
    if (changed) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      } catch (e) {
      }
    }
    return migrated;
  } catch (e) {
    return initialDB();
  }
}

function saveDB() {
  try {
    const s = activeShow();
    if (s) s.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    document.getElementById('storageStatus').textContent = 'Autosave enabled';
    document.getElementById('sideShowName').textContent = s?.name || 'No show selected';
    return true;
  } catch (e) {
    document.getElementById('storageStatus').textContent = 'Storage full – please export a backup';
    toast('Saving failed. Please create a JSON backup.');
    return false;
  }
}

function activeShow() {
  return db.shows.find(s => s.id === db.activeShowId) || db.shows[0] || null;
}

function safe(v) {
  return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function ordinalHTML(value) {
  const n = Math.max(0, Math.floor(Number(value) || 0)), lastTwo = n % 100, suffix = lastTwo >= 11 && lastTwo <= 13 ? 'th' : n % 10 === 1 ? 'st' : n % 10 === 2 ? 'nd' : n % 10 === 3 ? 'rd' : 'th';
  return `${n}<sup>${suffix}</sup>`;
}

function presRankClass(rank) {
  return rank === 1 ? 'is-first-place' : rank === 2 ? 'is-second-place' : rank === 3 ? 'is-third-place' : '';
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('on'), 2600);
}

function escAttr(s) {
  return safe(s).replace(/\n/g, ' ');
}

function pointsList(s) {
  return (s.settings?.points || POINTS).map(Number).filter(n => Number.isFinite(n) && n > 0).sort((a, b) => b - a);
}

function juryPointValues(j, s) {
  const points = pointsList(s);
  if (s.settings?.pointPreset !== 'fzero44') return points;

  const selfCount = s.settings.excludeSelf && s.participants.some(participant => participant.name === j.name) ? 1 : 0;
  const eligibleCount = Math.max(0, s.participants.length - selfCount);
  return points.slice(0, Math.min(points.length, eligibleCount));
}

function contestant(id, s = activeShow()) {
  return s?.participants.find(p => p.id === id);
}

function totalJuryVotes(s = activeShow()) {
  const totals = {};
  (s?.participants || []).forEach(p => totals[p.id] = 0);
  (s?.juries || []).forEach(j => Object.entries(j.votes || {}).forEach(([id, v]) => {
    if (id in totals) totals[id] += Number(v) || 0;
  }));
  return totals;
}

function totalTelevote(s = activeShow()) {
  const totals = {};
  (s?.participants || []).forEach(p => totals[p.id] = Number(s.televote?.[p.id]) || 0);
  return totals;
}

function combinedTotals(s = activeShow()) {
  const j = totalJuryVotes(s), t = totalTelevote(s), o = {};
  (s?.participants || []).forEach(p => o[p.id] = (j[p.id] || 0) + (s.settings.televoteEnabled ? (t[p.id] || 0) : 0));
  return o;
}

function rankedByScore(items) {
  const sorted = items.slice().sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0) || String(a.name || '').localeCompare(String(b.name || '')));
  let rank = 0, previousScore = null;
  return sorted.map((item, index) => {
    const score = Number(item.score) || 0;
    if (index === 0 || score !== previousScore) rank = index + 1;
    previousScore = score;
    return { ...item, rank, score };
  });
}

function standings(s = activeShow(), mode = 'combined') {
  const totals = mode === 'jury' ? totalJuryVotes(s) : mode === 'televote' ? totalTelevote(s) : combinedTotals(s);
  return rankedByScore((s?.participants || []).map(p => ({ ...p, score: totals[p.id] || 0 })));
}

function renderPresSprint(totals, finished = false) {
  const track = document.getElementById('presSprintTrack');
  const flagsLayer = document.getElementById('presSprintFlags');
  if (!track || !flagsLayer) return;

  const s = activeShow();
  if (!s) {
    flagsLayer.replaceChildren();
    track.classList.remove('is-finished');
    return;
  }

  const maxPoints = Math.max(0, Number(pres?.sprintMaxPoints) || 0);
  const ranked = rankedByScore((s.participants || []).map(participant => ({
    ...participant,
    score: Math.max(0, Number(totals?.[participant.id]) || 0)
  }))).reverse();

  const groups = [];
  ranked.forEach(participant => {
    let group = groups[groups.length - 1];
    if (!group || group.score !== participant.score) {
      group = { score: participant.score, participants: [] };
      groups.push(group);
    }
    group.participants.push(participant);
  });

  const trackWidth = track.clientWidth || 140;
  const flagWidth = Number.parseFloat(
    getComputedStyle(track).getPropertyValue('--sprint-flag-width')
  ) || 34;

  const existing = new Map(
    Array.from(flagsLayer.children).map(element => [
      element.dataset.sprintId,
      element
    ])
  );

  let renderOrder = 0;

  groups.forEach(group => {
    const count = group.participants.length;
    let gap = 6;

    if (count > 1) {
      gap = Math.min(6, (trackWidth - count * flagWidth) / (count - 1));
      gap = Math.max(-32, gap);
    }

    const groupWidth = count * flagWidth + (count - 1) * gap;
    const firstCenter = (trackWidth - groupWidth) / 2 + flagWidth / 2;

    const topPercent = maxPoints > 0
      ? Math.max(10, Math.min(100, 100 - (group.score / maxPoints) * 90))
      : 100;

    group.participants.forEach((participant, index) => {
      const participantId = String(participant.id);
      let flag = existing.get(participantId);
      const isNewFlag = !flag;

      if (isNewFlag) {
        flag = document.createElement('div');
        flag.className = 'pres-sprint-flag';
        flag.dataset.sprintId = participantId;
        flag.innerHTML = flagImageHTML(participant.flag, 22);
      }

      flag.title = `${participant.name}: ${group.score} points`;
      flag.setAttribute(
        'aria-label',
        `${participant.name}, ${group.score} points`
      );

      flag.style.left = `${firstCenter + index * (flagWidth + gap)}px`;
      flag.style.top = `${topPercent}%`;
      flag.style.zIndex = String(++renderOrder);

      // Nur neue Flags werden in die Ebene eingefügt.
      // Bestehende Flags bleiben im DOM, damit ihre CSS-Transition greift.
      if (isNewFlag) {
        flagsLayer.appendChild(flag);
      }

      existing.delete(participantId);
    });
  });

  existing.forEach(element => element.remove());
  track.classList.toggle('is-finished', Boolean(finished));
  const finishIcon = document.getElementById('presSprintFinish');
  if (finishIcon) finishIcon.setAttribute('aria-hidden', String(!finished));
}

function juryComplete(j, s = activeShow()) {
  if (!s || s.participants.length < 2) return false;
  const vals = Object.values(j.votes || {}).filter(v => Number(v) > 0);
  const wanted = juryPointValues(j, s).length;
  return vals.length === wanted && new Set(vals).size === vals.length;
}

function allJuriesComplete(s = activeShow()) {
  return !!s?.juries.length && s.juries.every(j => juryComplete(j, s));
}

function getViewInfo() {
  return { home: ['SHOW DASHBOARD', 'My Shows'], participants: ['YOUR LINE-UP', 'Participants'], juries: ['THE JURY', 'Juries & Points'], televote: ['THE AUDIENCE', 'Televote'], settings: ['YOUR RULES', 'Settings'] };
}

function render() {
  const s = activeShow(), info = getViewInfo()[view];
  document.getElementById('pageEyebrow').textContent = info[0];
  document.getElementById('pageTitle').textContent = info[1];
  document.querySelectorAll('#mainNav button').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  document.getElementById('sideShowName').textContent = s?.name || 'No show selected';
  if (!s) {
    root.innerHTML = '<div class="panel empty"><div class="big">✦</div><h2>No show available</h2><button class="btn primary" data-action="new-show">Create new show</button></div>';
    return;
  }
  if (view === 'home') renderHome(s);
  if (view === 'participants') renderParticipants(s);
  if (view === 'juries') renderJuries(s);
  if (view === 'televote') renderTelevote(s);
  if (view === 'settings') renderSettings(s);
}

function renderHome(s) {
  const cards = db.shows.map(x => `<article class="show-card"><div class="row between"><span class="pill ${x.id === s.id ? 'ok' : ''}">${x.id === s.id ? 'ACTIVE SHOW' : 'SAVED'}</span><span class="smallmuted">${safe(x.year || '')}</span></div><h3>${safe(x.name)}</h3><div class="show-stats"><span>◎ ${x.participants.length} participants</span><span>✦ ${x.juries.length} juries</span><span>◉ ${Object.keys(x.televote || {}).length} televote entries</span></div><div class="show-card-actions"><button class="btn small primary" data-action="activate" data-id="${x.id}">${x.id === s.id ? 'Open' : 'Switch to show'}</button><button class="btn small" data-action="duplicate" data-id="${x.id}">Duplicate</button><button class="btn small danger" data-action="delete-show" data-id="${x.id}">Delete</button></div></article>`).join('');
  const stats = standings(s);
  root.innerHTML = `<div class="grid3"><div class="metric"><div class="number">${s.participants.length}</div><div class="label">Participants</div></div><div class="metric"><div class="number">${s.juries.length}</div><div class="label">Jury Members</div></div><div class="metric"><div class="number">${allJuriesComplete(s) ? '✓' : s.juries.filter(j => juryComplete(j, s)).length + '/' + s.juries.length}</div><div class="label">Juries Completed</div></div></div><div class="panel"><div class="panel-head"><div><h2>Your WorldVision Shows</h2><div class="sub">Each show is stored separately on this device.</div></div><button class="btn primary" data-action="new-show">＋ New Show</button></div><div class="grid2">${cards}</div></div><div class="grid2"><div class="panel"><div class="panel-head"><div><h2>Show Checklist</h2><div class="sub">What still needs to be prepared for show night.</div></div><span class="pill ${s.participants.length >= 2 ? 'ok' : 'warn'}">${s.participants.length >= 2 ? 'Ready to go' : 'Setup needed'}</span></div><div class="stack"><div><div class="progressline"><span>Participants</span><b>${s.participants.length}</b></div><div class="statusbar"><span style="width:${Math.min(100, s.participants.length / 12 * 100)}%"></span></div></div><div><div class="progressline"><span>Jury votes</span><b>${s.juries.filter(j => juryComplete(j, s)).length}/${s.juries.length}</b></div><div class="statusbar"><span style="width:${s.juries.length ? 100 * s.juries.filter(j => juryComplete(j, s)).length / s.juries.length : 0}%"></span></div></div><div class="help">Suggested order: add participants → add juries → enter points → enter televote results → start the live show.</div></div></div><div class="panel"><div class="panel-head"><div><h2>Current Standings</h2><div class="sub">Only points entered so far are included.</div></div><div class="row wrap">${spoilersRevealed ? '' : `<button class="btn small" data-action="reveal-spoilers">Reveal Spoilers</button>`}<button class="btn small" data-view="juries">Open voting →</button></div></div>${spoilersRevealed ? (stats.length ? scoreboardHTML(s, 'combined', 5) : '<div class="empty">No participants added yet.</div>') : '<div class="empty">Current standings are hidden. Reveal spoilers to view the results.</div>'}</div></div>`;
}

function renderParticipants(s) {
  const rows = s.participants.map((p, i) => `<tr><td><span class="rank">${i + 1}</span></td><td><div class="row flag-edit">${flagImageHTML(p.flag, 25)}<input class="input iso-input" data-edit="participant" data-id="${p.id}" data-key="flag" value="${escAttr(p.flag)}" style="width:70px;text-align:center" maxlength="2" pattern="[A-Za-z]{2}" aria-label="ISO country code" placeholder="DE" /></div></td><td><input class="input" data-edit="participant" data-id="${p.id}" data-key="name" value="${escAttr(p.name)}" placeholder="Country / Team" /></td><td><input class="input" data-edit="participant" data-id="${p.id}" data-key="artist" value="${escAttr(p.artist)}" placeholder="Artist" /></td><td><input class="input" data-edit="participant" data-id="${p.id}" data-key="song" value="${escAttr(p.song)}" placeholder="Song title" /></td><td><input class="input numberinput" type="number" min="1" max="99" data-edit="participant" data-id="${p.id}" data-key="order" value="${Number(p.order) || i + 1}" /></td><td><button class="btn small danger" data-action="remove-participant" data-id="${p.id}" aria-label="Remove participant">✕</button></td></tr>`).join('');
  root.innerHTML = `<div class="panel"><div class="panel-head"><div><h2>Participants & Entries</h2><div class="sub">Each country or team enters with its own song. Add the ISO country code, artist and song title.</div></div><div class="row wrap"><button class="btn small" data-action="add-template">＋ Country template</button><button class="btn primary" data-action="add-participant">＋ Add participant</button></div></div>${s.participants.length ? `<div class="table-wrap"><table><thead><tr><th>#</th><th>Flag code</th><th>Country / Team</th><th>Artist</th><th>Song</th><th>Running order</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>` : '<div class="empty"><div class="big">◎</div><h3>Your line-up is empty</h3><p>Add your family members, countries or custom teams as participants.</p><button class="btn primary" data-action="add-template">Add country template</button></div>'}<div class="row between" style="margin-top:15px"><span class="smallmuted">${s.participants.length} participants · Sort by running order</span><button class="btn small" data-action="sort-participants">Sort by running order</button></div></div><div class="panel"><div class="panel-head"><div><h2>Quick Start</h2><div class="sub">You can also use custom names such as “Team Mom”.</div></div></div><div class="help">Enter a two-letter ISO 3166-1 alpha-2 country code (for example DE, SE or FI). Flags are loaded from FlagCDN and keep their original aspect ratio. Custom teams can leave the code blank.</div></div>`;
}

function normalizeJuryCountryName(value) {
  const raw = String(value || '').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const key = raw.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
  const aliases = {
    'usa': 'united states',
    'us': 'united states',
    'united states of america': 'united states',
    'uk': 'united kingdom',
    'great britain': 'united kingdom',
    'the netherlands': 'netherlands',
    'czech republic': 'czechia',
    'turkiye': 'turkey',
    'republic of korea': 'south korea',
    'korea republic of': 'south korea',
    'korea south': 'south korea'
  };
  return aliases[key] || key;
}

function stripWhatsAppPrefix(line) {
  return String(line || '').replace(/^\s*(?:\[[^\]]+\]\s*)?\d{1,2}[./-]\d{1,2}[./-]\d{2,4},?\s+\d{1,2}:\d{2}(?::\d{2})?\s*(?:[-–]\s*)?(?:[^:]+:\s*)?/, '').trim();
}

function parseJuryImportText(rawText, s = activeShow()) {
  const text = String(rawText || '').replace(/\r/g, '');
  const marker = /^.*?My Country is\s*:\s*(.*?)\s*$/gim;
  const starts = [];
  let match;
  while ((match = marker.exec(text)) !== null) {
    const lineStart = text.lastIndexOf('\n', match.index) + 1;
    starts.push({ index: lineStart, name: match[1].trim() });
  }
  if (!starts.length) return { sourceText: text, submissions: [], errors: ['No "My Country is:" marker was found.'], warnings: [] };

  const participantByName = new Map();
  (s?.participants || []).forEach(participant => {
    const key = normalizeJuryCountryName(participant.name);
    if (key && !participantByName.has(key)) participantByName.set(key, participant);
  });

  const seenJuries = new Set();
  const submissions = [];
  starts.forEach((start, index) => {
    const end = starts[index + 1]?.index ?? text.length;
    const section = text.slice(start.index, end);
    const lines = section.split('\n').map(stripWhatsAppPrefix).filter(Boolean);
    const juryName = start.name;
    const errors = [];
    const warnings = [];
    const juryKey = normalizeJuryCountryName(juryName);
    const juryParticipant = participantByName.get(juryKey);
    if (!juryName) errors.push('Jury country is empty.');
    if (!juryParticipant) errors.push(`Jury country "${juryName || '(empty)'}" is not in the participant list.`);
    if (juryKey && seenJuries.has(juryKey)) errors.push('This jury appears more than once in the pasted text.');
    if (juryKey) seenJuries.add(juryKey);

    const existingJury = (s?.juries || []).find(j => normalizeJuryCountryName(j.name) === juryKey);
    if (existingJury && Object.values(existingJury.votes || {}).some(value => Number(value) > 0)) {
      errors.push('A jury with this name already has votes. Nothing will be overwritten.');
    }

    const ranking = [];
    const seenRanks = new Set();
    const seenCountries = new Set();
    lines.forEach(line => {
      const cleaned = line.replace(/^\s*My Country is\s*:\s*.*$/i, '').trim();
      if (!cleaned) return;
      const rankMatch = cleaned.match(/^(\d+)(?:st|nd|rd|th)?\s*[:.)-]\s*(.+?)\s*(?:→|➜|⇒|->|=>)\s*(\d+)\s*P(?:oints?)?\.?\s*$/i);
      if (!rankMatch) {
        if (/^\d+(?:st|nd|rd|th)?\s*[:.)-]/i.test(cleaned)) errors.push(`Malformed ranking line: ${cleaned}`);
        return;
      }
      const rank = Number(rankMatch[1]);
      const countryName = rankMatch[2].trim();
      const sourcePoints = Number(rankMatch[3]);
      if (!Number.isInteger(rank) || rank < 1) errors.push(`Invalid ranking position: ${rankMatch[1]}.`);
      if (seenRanks.has(rank)) errors.push(`Ranking position ${rank} appears more than once.`);
      seenRanks.add(rank);
      const countryKey = normalizeJuryCountryName(countryName);
      if (seenCountries.has(countryKey)) errors.push(`"${countryName}" appears more than once in this ranking.`);
      seenCountries.add(countryKey);
      const participant = participantByName.get(countryKey);
      if (!participant) errors.push(`Rank ${rank}: "${countryName}" is not in the participant list.`);
      if (s?.settings?.excludeSelf && participant && juryParticipant && participant.id === juryParticipant.id) {
        errors.push(`Rank ${rank}: a jury cannot award points to its own entry.`);
      }
      ranking.push({ rank, countryName, sourcePoints, participantId: participant?.id || null, participantName: participant?.name || countryName });
    });

    if (!ranking.length) errors.push('No ranking lines were recognized.');
    ranking.sort((a, b) => a.rank - b.rank);
    ranking.forEach((entry, i) => {
      if (entry.rank !== i + 1) errors.push(`Ranking is incomplete: expected position ${i + 1}, found ${entry.rank}.`);
    });

    const juryForPoints = { ...(existingJury || {}), name: juryParticipant?.name || juryName };
    const pointValues = juryParticipant ? juryPointValues(juryForPoints, s) : pointsList(s);
    if (ranking.length > pointValues.length) {
      warnings.push(`The message contains ${ranking.length} ranked countries, but the active scheme has ${pointValues.length} point values. Positions after ${pointValues.length} will be ignored.`);
    }
    ranking.forEach((entry, i) => {
      entry.assignedPoints = pointValues[i] ?? null;
      if (entry.assignedPoints !== null && entry.sourcePoints !== entry.assignedPoints) {
        warnings.push(`Rank ${entry.rank}: source says ${entry.sourcePoints} P., active scoring assigns ${entry.assignedPoints} P.`);
      }
    });
    if (ranking.length && ranking.length < pointValues.length) {
      warnings.push(`Only ${ranking.length} of ${pointValues.length} available point values are present. The jury will remain incomplete.`);
    }

    submissions.push({ juryName, juryParticipantId: juryParticipant?.id || null, existingJuryId: existingJury?.id || null, ranking, errors, warnings });
  });
  return {
    sourceText: text,
    submissions,
    errors: submissions.flatMap(item => item.errors.map(error => `${item.juryName || 'Unknown jury'}: ${error}`)),
    warnings: submissions.flatMap(item => item.warnings.map(warning => `${item.juryName}: ${warning}`))
  };
}

function renderJuryImportPreview() {
  if (!juryImportPreview) return '';
  const result = juryImportPreview;
  const rows = result.submissions.map(item => {
    const state = item.errors.length ? '<span class="pill warn">Needs correction</span>' : '<span class="pill ok">Ready</span>';
    const ranking = item.ranking.map(entry => `<div class="jury-import-rank"><span>${entry.rank}.</span><span>${safe(entry.participantName)}</span><b>${entry.assignedPoints ?? '—'} P.</b></div>`).join('');
    const messages = [
      ...item.errors.map(message => `<div class="jury-import-message error">${safe(message)}</div>`),
      ...item.warnings.map(message => `<div class="jury-import-message warning">${safe(message)}</div>`)
    ].join('');
    return `<div class="jury-import-preview-card"><div class="row between"><b>${safe(item.juryName)}</b>${state}</div>${messages}${ranking || '<div class="smallmuted">No ranking recognized.</div>'}</div>`;
  }).join('');
  const readyCount = result.submissions.filter(item => !item.errors.length).length;
  return `<div class="jury-import-preview"><div class="row between"><b>Import preview</b><span class="smallmuted">${readyCount}/${result.submissions.length} ready</span></div>${rows}<div class="row wrap" style="margin-top:12px"><button class="btn primary" data-action="jury-import-apply" ${readyCount && !result.errors.length ? '' : 'disabled'}>Import ${readyCount} ${readyCount === 1 ? 'jury' : 'juries'}</button><button class="btn small" data-action="jury-import-clear">Clear preview</button></div></div>`;
}

function applyJuryImport() {
  const s = activeShow();
  if (s && juryImportPreview?.sourceText !== undefined) juryImportPreview = parseJuryImportText(juryImportPreview.sourceText, s);
  if (!s || !juryImportPreview) {
    toast('There is no jury import preview to apply.');
    return;
  }
  if (juryImportPreview.errors.length) {
    render();
    toast('Correct all import errors before importing.');
    return;
  }
  let imported = 0;
  juryImportPreview.submissions.forEach(item => {
    let jury = item.existingJuryId ? s.juries.find(entry => entry.id === item.existingJuryId) : null;
    if (!jury) {
      const participant = s.participants.find(entry => entry.id === item.juryParticipantId);
      jury = { id: uid(), flag: participant?.flag || '🎤', name: participant?.name || item.juryName, votes: {} };
      s.juries.push(jury);
    }
    const juryParticipant = s.participants.find(entry => entry.id === item.juryParticipantId);
    if (juryParticipant) jury.name = juryParticipant.name;
    const votes = {};
    item.ranking.forEach(entry => {
      if (entry.participantId && entry.assignedPoints !== null) votes[entry.participantId] = entry.assignedPoints;
    });
    jury.votes = votes;
    imported++;
  });
  juryImportPreview = null;
  juryImportText = '';
  saveDB();
  render();
  toast(`${imported} ${imported === 1 ? 'jury' : 'juries'} imported.`);
}

function renderJuries(s) {
  const juryCards = s.juries.map((j, idx) => {
    const completed = juryComplete(j, s), points = juryPointValues(j, s);
    const selects = points.map(pt => {
      const selected = Object.keys(j.votes || {}).find(id => Number(j.votes[id]) === pt) || '';
      const opts = s.participants.map(p => `<option value="${p.id}" ${selected === p.id ? 'selected' : ''} ${s.settings.excludeSelf && p.name === j.name ? 'disabled' : ''}>${safe(toISOCode(p.flag))} ${safe(p.name)}${p.artist ? ' – ' + safe(p.artist) : ''}</option>`).join('');
      return `<div class="point-row"><span class="point-value">${pt}</span><select data-juryvote="${j.id}" data-points="${pt}"><option value="">– No entry –</option>${opts}</select></div>`;
    }).join('');
    return `<div class="jury-box"><div class="jury-title"><span class="flag">${juryFlagHTML(j.flag)}</span><div class="spacer"><input class="input" data-edit="jury" data-id="${j.id}" data-key="name" value="${escAttr(j.name)}" placeholder="Jury name" /></div><span class="pill ${completed ? 'ok' : 'warn'}">${completed ? 'Complete' : 'Incomplete'}</span><button class="btn small icon" data-action="jury-up" data-id="${j.id}" ${idx === 0 ? 'disabled' : ''} title="Move jury up">↑</button><button class="btn small icon" data-action="jury-down" data-id="${j.id}" ${idx === s.juries.length - 1 ? 'disabled' : ''} title="Move jury down">↓</button><button class="btn small danger" data-action="remove-jury" data-id="${j.id}" aria-label="Remove jury">✕</button></div><div class="row" style="margin-bottom:10px"><div class="field" style="width:100px"><label>Jury icon / code</label><input class="input" data-edit="jury" data-id="${j.id}" data-key="flag" value="${escAttr(j.flag || '🎤')}" maxlength="8" /></div><div class="smallmuted">Assign exactly one entry to each point value. Unassigned values can stay empty.</div></div><div class="points-grid">${selects}</div></div>`;
  }).join('');
  const scoringHelp = s.settings?.pointPreset === 'fzero44'
    ? 'The F-Zero GX + Extra scale awards 44 descending point values from 100 to 1. Only the highest values needed for the eligible participants are shown for each jury.'
    : 'The standard scoring system follows the ESC format: 12, 10, 8, 7, 6, 5, 4, 3, 2 and 1 point.';
  const importer = `<div class="panel jury-import-panel"><div class="panel-head"><div><h2>Jury Importer</h2><div class="sub">Paste one or more Country Ranking List messages, or load a WhatsApp chat export (.txt).</div></div><span class="pill">v3.17</span></div><div class="field"><label for="juryImportText">Jury messages</label><textarea id="juryImportText" rows="10" placeholder="My Country is: Germany\n\n1st : Japan → 12 P.\n2nd : Austria → 10 P.\n3rd : Denmark → 8 P.\n...">${safe(juryImportText)}</textarea></div><div class="row wrap" style="margin-top:12px"><button class="btn primary" data-action="jury-import-preview">Preview import</button><button class="btn" data-action="jury-import-file">Load WhatsApp .txt</button><span class="smallmuted">Recognizes each new submission by “My Country is:”.</span></div>${renderJuryImportPreview()}</div>`;
  root.innerHTML = `${importer}<div class="grid2"><div class="panel"><div class="panel-head"><div><h2>Jury Management</h2><div class="sub">Who awards the points? Each jury can award every point value once.</div></div><button class="btn primary" data-action="add-jury">＋ Add jury</button></div><div class="row wrap"><button class="btn small" data-action="copy-juries">Copy participants as juries</button><button class="btn small" data-action="shuffle-juries">Shuffle order</button><button class="btn small" data-action="randomize-jury">Fill random votes</button><button class="btn small danger" data-action="clear-juries">Clear all jury points</button></div><hr class="rule"><div class="stack">${juryCards || '<div class="empty"><div class="big">✦</div><h3>No juries yet</h3><p>Add juries manually or copy your participants as juries.</p></div>'}</div></div><div class="panel"><div class="panel-head"><div><h2>Overall Jury Score</h2><div class="sub">All jury points entered so far, even if some juries are not complete yet.</div></div><div class="row wrap"><span class="pill ${allJuriesComplete(s) ? 'ok' : 'warn'}">${s.juries.filter(j => juryComplete(j, s)).length}/${s.juries.length} complete</span>${jurySpoilersRevealed ? '' : `<button class="btn small" data-action="reveal-jury-spoilers">Reveal Spoilers</button>`}</div></div>${jurySpoilersRevealed ? scoreboardHTML(s, 'jury') : '<div class="empty"><div class="big">◉</div><h3>Overall Jury Score is hidden</h3><p>Confirm to reveal the jury results.</p></div>'}<hr class="rule"><div class="help">${scoringHelp} Each score can be awarded only once per jury.</div><button class="btn primary" style="width:100%;margin-top:13px" data-action="start-pres">▶ Present jury voting</button></div></div>`;
}

function renderTelevote(s) {
  const tv = totalTelevote(s), rows = s.participants.map(p => `<tr><td>${flagImageHTML(p.flag, 26)}</td><td><div class="contestant-name">${safe(p.name)}</div><div class="songline">${safe(p.artist || '')} ${p.artist && p.song ? '·' : ''} ${safe(p.song || '')}</div></td><td><input type="number" min="0" max="20000" class="input numberinput" data-tv="${p.id}" value="${tv[p.id] || 0}" /></td></tr>`).join('');
  const sum = Object.values(tv).reduce((a, b) => a + b, 0);
  root.innerHTML = `<div class="grid2"><div class="panel"><div class="panel-head"><div><h2>Televote Results</h2><div class="sub">Enter the total audience points for each entry. The number of points is flexible.</div></div><span class="pill">${sum.toLocaleString('en-US')} total points</span></div>${s.participants.length ? `<div class="table-wrap"><table><thead><tr><th>Flag</th><th>Entry</th><th>Audience points</th></tr></thead><tbody>${rows}</tbody></table></div>` : '<div class="empty">Add participants first.</div>'}<div class="row wrap" style="margin-top:14px"><button class="btn" data-action="random-tv">Distribute randomly</button><button class="btn danger" data-action="clear-tv">Clear televote</button></div></div><div class="panel"><div class="panel-head"><div><h2>Presentation Order</h2><div class="sub">How should the audience votes be announced in the final?</div></div></div><div class="switchline"><span><b>Jury ranking</b><br><span class="sub">Entries with the lowest jury scores are announced first.</span></span><label class="switch"><input type="radio" name="tv-order" value="jury" ${s.settings.televoteOrder === 'jury' ? 'checked' : ''} data-setting="televoteOrder"><span></span></label></div><div class="switchline"><span><b>Televote ranking</b><br><span class="sub">Audience points are announced from the lowest to the highest score.</span></span><label class="switch"><input type="radio" name="tv-order" value="televote" ${s.settings.televoteOrder === 'televote' ? 'checked' : ''} data-setting="televoteOrder"><span></span></label></div><div class="switchline"><span><b>Enable televote</b><br><span class="sub">Include audience points in the overall ranking.</span></span><label class="switch"><input type="checkbox" ${s.settings.televoteEnabled ? 'checked' : ''} data-setting="televoteEnabled"><span></span></label></div><hr class="rule"><div class="stack"><div><div class="progressline"><span>Highest televote</span><b>${Math.max(0, ...Object.values(tv))}</b></div><div class="progressline"><span>Entries with points</span><b>${Object.values(tv).filter(v => v > 0).length}/${s.participants.length}</b></div></div><div class="help">The televote is added after the jury presentation in live mode. Enter the combined audience points awarded to each entry.</div></div><button class="btn primary" style="width:100%;margin-top:14px" data-action="start-pres">▶ Present overall results</button></div></div>`;
}

function renderSettings(s) {
  const currentPoints = pointsList(s).join(',');
  const scoringPreset = s.settings.pointPreset || (
    currentPoints === POINTS.join(',') ? 'esc' :
    currentPoints === FZERO_GX_POINTS.join(',') ? 'fzero44' :
    currentPoints === '5,4,3,2,1' ? 'top5' : 'custom'
  );
  root.innerHTML = `<div class="grid2"><div class="panel"><div class="panel-head"><div><h2>Show Information</h2><div class="sub">Name, year and host of your edition.</div></div></div><div class="stack"><div class="field"><label>Show title</label><input class="input" data-showfield="name" value="${escAttr(s.name)}" placeholder="WorldVision 2026" /></div><div class="grid2"><div class="field"><label>Year</label><input class="input" type="number" data-showfield="year" value="${Number(s.year) || new Date().getFullYear()}" /></div><div class="field"><label>Host / Location</label><input class="input" data-showfield="host" value="${escAttr(s.host || '')}" placeholder="e.g. Family home" /></div></div><div class="field"><label>Scoring system</label>
  <select data-setting="pointPreset">
    <option value="esc" ${scoringPreset === 'esc' ? 'selected' : ''}>Classic: 12, 10, 8–1</option>
    <option value="top5" ${scoringPreset === 'top5' ? 'selected' : ''}>Top 5: 5, 4, 3, 2, 1</option>
    <option value="fzero44" ${scoringPreset === 'fzero44' ? 'selected' : ''}>F-Zero GX + Extra: 44 values</option>
    <option value="custom" ${scoringPreset === 'custom' ? 'selected' : ''}>Custom scoring</option>
  </select>
  <span class="smallmuted">Each point value can be awarded once per jury.</span></div><div class="field"><label for="customPointsInput">Custom point values</label><input class="input" id="customPointsInput" type="text" value="${escAttr(pointsList(s).join(', '))}" placeholder="12, 10, 8, 7, 6, 5, 4, 3, 2, 1" /><span class="smallmuted">Enter unique positive whole numbers, separated by commas or spaces. Applying a different scale asks before clearing existing jury assignments.</span><button class="btn" type="button" data-action="apply-custom-scoring">Apply custom scoring</button></div></div></div><div class="panel"><div class="panel-head"><div><h2>Music & Atmosphere</h2><div class="sub">Optional integrated music for the show.</div></div><span class="pill">Optional</span></div><div class="stack"><div class="row between"><div><b style="font-size:12px">Passende Musik je nach Jury-Runde abspielen</b><div class="sub">Wenn aktiviert, wird die Musik passend zum Ablauf der Show abgespielt. Wenn deaktiviert, wird während der gesamten Show keine Audiodatei wiedergegeben.</div></div><label class="switch"><input type="checkbox" data-setting="musicEnabled" ${s.settings.musicEnabled ? 'checked' : ''}><span></span></label></div><div class="help">Die Einstellung umfasst auch die Einstiegs-Musik, alle lokalen Soundeffekte und den Winning Run. Die globale Stummschaltung in der Präsentation bleibt eine zusätzliche Steuerung.</div></div></div><div class="panel"><div class="panel-head"><div><h2>Voting Rules</h2><div class="sub">Adjust the voting process to your preference.</div></div></div><div class="switchline"><span><b>Exclude own entry</b><br><span class="sub">A jury cannot award points to its own country.</span></span><label class="switch"><input type="checkbox" data-setting="excludeSelf" ${s.settings.excludeSelf ? 'checked' : ''}><span></span></label></div><div class="switchline"><span><b>Use televoting</b><br><span class="sub">Audience points are included in the final ranking.</span></span><label class="switch"><input type="checkbox" data-setting="televoteEnabled" ${s.settings.televoteEnabled ? 'checked' : ''}><span></span></label></div><div class="help" style="margin-top:14px">Export saves all show data, participants, juries and scores as JSON. Import can add existing shows or restore an edition.</div></div><div class="panel"><div class="panel-head"><div><h2>Backup & Data</h2><div class="sub">Your data belongs to you and stays in your browser.</div></div></div><div class="stack"><div class="row between"><div><b style="font-size:12px">Export show backup</b><div class="sub">Download a JSON file containing all show data.</div></div><button class="btn" data-action="export">⇩ Export</button></div><div class="row between"><div><b style="font-size:12px">Import show backup</b><div class="sub">Restore shows from a JSON file.</div></div><button class="btn" data-action="import-trigger">⇧ Import</button></div><div class="row between"><div><b style="font-size:12px">Reset current show</b><div class="sub">Remove participants, juries and scores.</div></div><button class="btn danger" data-action="reset-show">Reset</button></div></div></div></div>`;
}

function scoreboardHTML(s, mode = 'combined', limit = Infinity) {
  const rows = standings(s, mode).slice(0, limit);
  if (!rows.length) return '<div class="empty">No results yet.</div>';
  const max = Math.max(1, ...rows.map(r => r.score));
  return `<div class="scoreboard">${rows.map(r => `<div class="score-row ${r.rank === 1 ? 'leader' : ''}"><div class="rank">${ordinalHTML(r.rank)}</div><div><div class="row" style="gap:6px">${flagImageHTML(r.flag, 25)}<b class="contestant-name">${safe(r.name)}</b></div><div class="songline">${safe(r.artist || '')} ${r.artist && r.song ? '·' : ''} ${safe(r.song || '')}</div><div class="bar-bg"><span style="width:${100 * r.score / max}%"></span></div></div><div class="pts">${r.score}</div><div class="delta">${mode === 'combined' ? 'Points' : 'Pts.'}</div></div>`).join('')}</div>`;
}

function addParticipant(data = {}) {
  const s = activeShow();
  if (!s) return;
  const p = { id: uid(), flag: toISOCode(data.flag) || '', name: data.name || 'New participant', artist: data.artist || '', song: data.song || '', order: s.participants.length + 1 };
  s.participants.push(p);
  saveDB();
  render();
  toast('Participant added.');
}

function addJury(data = {}) {
  const s = activeShow();
  if (!s) return;
  const j = { id: uid(), flag: data.flag || '🎤', name: data.name || `Jury ${s.juries.length + 1}`, votes: {} };
  s.juries.push(j);
  saveDB();
  render();
  toast('Jury added.');
}

function getDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const d = req.result;
      if (!d.objectStoreNames.contains(DB_STORE)) d.createObjectStore(DB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function deleteMusicAsset(showId) {
  try {
    const d = await getDB();
    await new Promise(res => {
      const tx = d.transaction(DB_STORE, 'readwrite');
      tx.objectStore(DB_STORE).delete(showId);
      tx.oncomplete = res;
      tx.onerror = res;
    });
    d.close();
  } catch (e) {
  }
}

function exportShow() {
  db.shows.forEach(show => (show.participants || []).forEach(p => p.flag = toISOCode(p.flag)));
  const payload = { app: 'WorldVision Studio', version: 2, exportedAt: new Date().toISOString(), activeShowId: db.activeShowId, shows: db.shows };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `WorldVision_Backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('Backup created.');
}

function importData(file) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const x = JSON.parse(r.result);
      const imported = Array.isArray(x.shows) ? x.shows : (x.participants ? [x] : null);
      if (!imported || !imported.length) throw new Error('Invalid WorldVision file.');
      const normalized = imported.map(old => {
        const n = clone(old);
        n.id = uid();
        n.participants = Array.isArray(n.participants) ? n.participants : [];
        n.participants.forEach(p => p.flag = toISOCode(p.flag));
        n.juries = Array.isArray(n.juries) ? n.juries : [];
        n.settings = { ...blankShow().settings, ...(n.settings || {}) };
        n.televote = n.televote || {};
        n.musicAssetId = null;
        n.musicName = '';
        n.settings.musicEnabled = false;
        n.juries.forEach(j => {
          j.votes = j.votes || {};
        });
        return n;
      });
      db.shows.push(...normalized);
      db.activeShowId = normalized[0].id;
      resetSpoilerReveals();
      saveDB();
      view = 'home';
      render();
      toast(`${normalized.length} show(s) imported.`);
    } catch (e) {
      toast('Import failed: ' + e.message);
    }
  };
  r.readAsText(file);
}

function revealPresentationStart() {
  const presentation = document.getElementById('presentation');

  if (presentation?.classList.contains('pres-start-covered')) {
    setTimeout(() => { presentation.classList.remove('pres-start-covered'); }, 1000);
  }
}

function startPresentation() {
  entryMusicStoppedForPresentation = true;
  clearPresPostAnimationWait();
  const s = activeShow();
  if (!s || s.participants.length < 2) {
    toast('Add at least two participants first.');
    return;
  }
  stopMusic();
  if (s.settings?.musicEnabled) {
    preloadLongPreview().then(ready => {
      if (ready) musicDebug('Long Preview preloaded on entering Jury Voting');
      else console.warn('Long Preview preload did not complete before playback.');
    }).catch(error => {
      console.warn('Long Preview preload failed.', error);
    });
  }
  stopPresTimer();
  clearPresReveal();
  const events = buildEvents(s);
  const finalCombinedTotals = combinedTotals(s);
  const sprintMaxPoints = Math.max(
    0,
    ...Object.values(finalCombinedTotals).map(value => Number(value) || 0)
  );
  delete s.nextHostId;
  const decidedHost = events.find(event => event.type === 'host-announcement');
  if (decidedHost?.hostId) s.nextHostId = decidedHost.hostId;
  saveDB();
  pres = {
    events,
    stage: 'jury',
    showId: s.id,
    selectedHostId: null,
    hostRevealReady: false,
    debugFastForward: false,
    sprintMaxPoints
  };
  presIndex = 0;
  presPaused = true;
  const presentation = document.getElementById('presentation');
  presentation.classList.remove('debug-fast-forward');
  presentation.classList.add('pres-start-covered');
  presentation.classList.add('on');
  document.getElementById('presentation').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  renderPres();
  handleMusicForPresentationStep();
}

function calculateHostingDecision(s) {
  const combined = combinedTotals(s);
  const highestScore = Math.max(0, ...Object.values(combined).map(value => Number(value) || 0));
  const sharedWinners = (s.participants || []).filter(participant => (Number(combined[participant.id]) || 0) === highestScore);
  if (sharedWinners.length < 2) {
    return {
      isTie: false,
      winnerIds: sharedWinners.map(participant => participant.id),
      winnerScore: highestScore,
      hostId: null,
      candidateIds: []
    };
  }
  let candidates = sharedWinners.slice();
  let resolvedBy = null;
  let resolvedPoint = null;
  // The app stores televote points (not raw ballot counts), so this criterion
  // compares the recorded televote points when televoting is enabled.
  if (s.settings?.televoteEnabled) {
    const televote = totalTelevote(s);
    const bestTelevote = Math.max(...candidates.map(participant => Number(televote[participant.id]) || 0));
    candidates = candidates.filter(participant => (Number(televote[participant.id]) || 0) === bestTelevote);
    if (candidates.length === 1) resolvedBy = 'televote';
  }
  // Follow the active scoring scale from highest to lowest. This also keeps
  // the hosting rule compatible with the optional custom jury point system.
  if (candidates.length > 1) {
    const juryAwards = pointsList(s).slice().sort((a, b) => b - a);
    for (const award of juryAwards) {
      const awardCounts = new Map(candidates.map(participant => [
        participant.id,
        (s.juries || []).reduce((count, jury) => count + (Number(jury.votes?.[participant.id]) === award ? 1 : 0), 0)
      ]));
      const bestCount = Math.max(0, ...awardCounts.values());
      candidates = candidates.filter(participant => awardCounts.get(participant.id) === bestCount);
      if (candidates.length === 1) {
        resolvedBy = 'jury';
        resolvedPoint = award;
        break;
      }
    }
  }
  return {
    isTie: true,
    winnerIds: sharedWinners.map(participant => participant.id),
    winnerScore: highestScore,
    hostId: candidates.length === 1 ? candidates[0].id : null,
    candidateIds: candidates.map(participant => participant.id),
    resolvedBy,
    resolvedPoint
  };
}

function buildEvents(s) {
  const events = [{ type: 'intro' }];
  s.juries.slice().forEach((jury, juryIndex) => {
    const entries = Object.entries(jury.votes || {})
      .filter(([id, points]) => contestant(id, s) && Number(points) > 0)
      .sort((a, b) => Number(a[1]) - Number(b[1]));
    events.push({ type: 'jury-intro', juryId: jury.id, juryIndex });
    entries.forEach(([participantId, points]) => {
      events.push({
        type: 'jury-point',
        juryId: jury.id,
        juryIndex,
        participantId,
        points: Number(points)
      });
    });
    events.push({ type: 'jury-end', juryId: jury.id, juryIndex });
  });
  if (s.settings.televoteEnabled) {
    events.push({ type: 'jury-finish' });
    const televoteTotals = totalTelevote(s);
    let participantIds = s.participants
      .map(participant => participant.id)
      .filter(id => (televoteTotals[id] || 0) > 0);
    if (s.settings.televoteOrder === 'televote') {
      participantIds.sort((a, b) => televoteTotals[a] - televoteTotals[b]);
    } else {
      const juryTotals = totalJuryVotes(s);
      participantIds.sort((a, b) => juryTotals[a] - juryTotals[b]);
    }
    participantIds.forEach(participantId => {
      events.push({
        type: 'tv-point',
        participantId,
        points: televoteTotals[participantId]
      });
    });
    events.push({ type: 'tv-finish' });
  }
  const hosting = calculateHostingDecision(s);
  events.push({ type: 'winner', winnerIds: hosting.winnerIds, winnerScore: hosting.winnerScore });
  if (!hosting.isTie && hosting.winnerIds.length === 1) {
    events.push({
      type: 'host-announcement',
      hostId: hosting.winnerIds[0],
      resolution: 'winner',
      sharedWinnerIds: hosting.winnerIds
    });
  } else if (hosting.isTie) {
    if (hosting.hostId) {
      events.push({
        type: 'host-announcement',
        hostId: hosting.hostId,
        resolution: hosting.resolvedBy,
        resolvedPoint: hosting.resolvedPoint,
        sharedWinnerIds: hosting.winnerIds
      });
    } else {
      events.push({
        type: 'host-choice',
        candidateIds: hosting.candidateIds,
        sharedWinnerIds: hosting.winnerIds
      });
    }
  }
  return events;
}

function getPresTotals() {
  const s = activeShow();
  const result = {};
  s.participants.forEach(p => result[p.id] = 0);
  for (let i = 0; i <= presIndex && i < pres.events.length; i++) {
    const event = pres.events[i];
    if (event.type === 'jury-point' || event.type === 'tv-point') {
      result[event.participantId] = (result[event.participantId] || 0) + event.points;
    }
  }
  return result;
}

function getPresTotalsBeforeCurrent() {
  const s = activeShow();
  const result = {};
  s.participants.forEach(p => result[p.id] = 0);
  for (let i = 0; i < presIndex && i < pres.events.length; i++) {
    const event = pres.events[i];
    if (event.type === 'jury-point' || event.type === 'tv-point') {
      result[event.participantId] = (result[event.participantId] || 0) + event.points;
    }
  }
  return result;
}

function animatePresScore(participantId, from, to) {
  const row = document.querySelector(`[data-score-id="${participantId}"]`);
  if (!row) return 0;
  const number = row.querySelector('.pres-rank-total');
  if (!number) return 0;
  if (pres?.debugFastForward) {
    number.textContent = to;
    return 0;
  }
  const duration = Math.min(1800, Math.max(450, Math.abs(to - from) * 35));
  const start = performance.now();
  const ease = t => 1 - Math.pow(1 - t, 3);
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    number.textContent = Math.round(from + (to - from) * ease(t));
    if (t < 1) requestAnimationFrame(frame);
    else number.textContent = to;
  }
  requestAnimationFrame(frame);
  return duration;
}

function animateNewLeaderFlag(participantId, beforeTotals, afterTotals) {
  if (pres?.debugFastForward) return 0;
  const toRanking = totals => rankedByScore(Object.entries(totals).map(([id, score]) => ({ id, name: contestant(id)?.name || '', score: Number(score) || 0 })));
  const previousLeader = toRanking(beforeTotals)[0];
  const newLeader = toRanking(afterTotals)[0];
  if (!previousLeader || !newLeader || newLeader.id !== participantId || previousLeader.id === participantId || newLeader.score <= previousLeader.score) return 0;
  const flag = document.querySelector(`[data-score-id="${participantId}"] .pres-rank-country .country-flag`);
  if (!flag) return 0;
  flag.classList.remove('pres-flag-celebrate');
  void flag.offsetWidth;
  flag.classList.add('pres-flag-celebrate');
  return PRES_FLAG_DELAY_MS + PRES_FLAG_ANIMATE_MS;
}

function animatePresRanking(totals) {
  const ranks = document.getElementById('presRanks');
  if (!ranks) return 0;
  const rows = Array.from(ranks.querySelectorAll('.pres-rank'));
  if (rows.length < 2) return 0;
  const ordered = rankedByScore(Object.entries(totals).map(([id, score]) => ({ id, name: contestant(id)?.name || '', score: Number(score) || 0 })).filter(item => rows.some(row => row.dataset.scoreId === item.id)));
  const byId = new Map(rows.map(row => [row.dataset.scoreId, row]));
  if (pres?.debugFastForward) {
    ordered.forEach(item => {
      const row = byId.get(item.id);
      ranks.appendChild(row);
      const position = row.querySelector('.pres-rank-position');
      if (position) {
        position.innerHTML = ordinalHTML(item.rank);
        position.className = 'pres-rank-position ' + presRankClass(item.rank);
      }
    });
    return 0;
  }
  const first = new Map(rows.map(row => [row.dataset.scoreId, row.getBoundingClientRect()]));
  ordered.forEach(item => {
    const row = byId.get(item.id);
    ranks.appendChild(row);
    const position = row.querySelector('.pres-rank-position');
    if (position) {
      position.innerHTML = ordinalHTML(item.rank);
      position.className = 'pres-rank-position ' + presRankClass(item.rank);
    }
  });
  const moved = [];
  rows.forEach(row => {
    const oldRect = first.get(row.dataset.scoreId), newRect = row.getBoundingClientRect();
    if (!oldRect || !newRect) return;
    const dx = oldRect.left - newRect.left, dy = oldRect.top - newRect.top;
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
    row.style.transition = 'none';
    row.style.transform = `translate(${dx}px,${dy}px)`;
    row.style.zIndex = '2';
    moved.push(row);
  });
  if (!moved.length) return 0;
  void ranks.offsetHeight;
  const duration = Math.max(120, Math.min(650, presSpeed || 650));
  requestAnimationFrame(() => moved.forEach(row => {
    const cleanup = () => {
      row.style.transition = '';
      row.style.transform = '';
      row.style.zIndex = '';
      row.removeEventListener('transitionend', onEnd);
    };
    const onEnd = event => {
      if (event.propertyName === 'transform') cleanup();
    };
    row.addEventListener('transitionend', onEnd);
    row.style.transition = `transform ${duration}ms cubic-bezier(.2,.75,.2,1)`;
    row.style.transform = 'translate(0,0)';
  }));
  return duration + 50;
}

function renderPres(phase = 'reveal') {
  if (!pres) return;
  const beforeAddition = phase === 'before-addition';
  const s = activeShow();
  const ev = pres.events[Math.min(presIndex, pres.events.length - 1)];
  const totals = getPresTotals();
  let kicker = '';
  let title = '';
  let highlight = '';
  let sub = '';
  let scoreTitle = 'Current Standings';
  const jury = ev.juryId ? s.juries.find(item => item.id === ev.juryId) : null;
  const participant = ev.participantId ? contestant(ev.participantId, s) : null;
  const hostChoice = document.getElementById('presHostChoice');
  if (hostChoice) {
    hostChoice.hidden = true;
    hostChoice.innerHTML = '';
  }
  switch (ev.type) {
    case 'intro':
      kicker = 'THE SHOW BEGINS';
      title = s.name;
      highlight = 'Welcome to WorldVision';
      sub = s.host ? `Live from ${s.host}.` : 'Get ready for the voting.';
      scoreTitle = 'Participants';
      break;
    case 'jury-intro':
      kicker = 'THE JURY HAS THE FLOOR';
      title = `${jury?.name || 'Jury'}`;
      highlight = 'And now, your points…';
      sub = 'The jury results are being announced.';
      break;
    case 'jury-point':
      kicker = 'JURY VOTING';
      title = `${jury?.name || 'Jury'}`;
      highlight = `${ev.points} ${Number(ev.points) === 1 ? 'POINT GOES TO' : 'POINTS GO TO'}`;
      sub = `${participant?.name || ''}${participant?.artist ? ' · ' + participant.artist : ''}${participant?.song ? ' – ' + participant.song : ''}`;
      break;
    case 'jury-end':
      kicker = 'JURY VOTING';
      title = 'Thank you, ' + (jury?.name || 'Jury') + '!';
      highlight = 'The points have been awarded.';
      sub = 'Next up: the following jury.';
      break;
    case 'jury-finish':
      kicker = 'THE JURY RESULTS';
      title = 'The jury has spoken.';
      highlight = `${standings(s, 'jury')[0]?.name || 'No leader yet'} is in the lead`;
      sub = 'Now it is time for the audience votes.';
      scoreTitle = 'Jury Standings';
      break;
    case 'tv-point':
      kicker = 'THE AUDIENCE VOTE';
      title = `${participant?.name || ''}`;
      highlight = `${ev.points} TELEVOTE ${Number(ev.points) === 1 ? 'POINT' : 'POINTS'}`;
      sub = 'The audience has decided.';
      break;
    case 'tv-finish':
      kicker = 'THE AUDIENCE HAS DECIDED';
      title = 'The televote is in.';
      highlight = 'The overall ranking is complete.';
      sub = 'One final look at the scoreboard.';
      scoreTitle = 'Overall Results';
      break;
    case 'winner':
      {
        const winnerIds = Array.isArray(ev.winnerIds) ? ev.winnerIds : standings(s, 'combined').filter(item => item.rank === 1).map(item => item.id);
        const winnerNames = winnerIds.map(id => contestant(id, s)?.name).filter(Boolean);
        title = winnerNames.length > 1
          ? winnerNames.length === 2 ? winnerNames.join(' & ') : `${winnerNames.slice(0, -1).join(', ')} & ${winnerNames[winnerNames.length - 1]}`
          : winnerNames[0] || standings(s, 'combined')[0]?.name || 'WorldVision';
        kicker = 'AND THE WINNER IS…';
        const winnerScore = Number.isFinite(ev.winnerScore) ? ev.winnerScore : standings(s, 'combined')[0]?.score || 0;
        highlight = `${winnerScore} ${winnerScore === 1 ? 'POINT' : 'POINTS'}`;
        sub = winnerNames.length > 1 ? 'A shared first place. Congratulations!' : 'Congratulations!';
        scoreTitle = 'Final Results';
        break;
      }
    case 'host-announcement':
      {
        const host = contestant(ev.hostId, s);
        if (!pres.hostRevealReady) {
          // Keep the complete winner announcement on screen until the Winning Run
          // actually starts. Do not replace it with an empty Hosting Rights slide.
          const winnerEvent = pres.events.slice(0, presIndex).reverse().find(item => item.type === 'winner');
          const winnerIds = Array.isArray(winnerEvent?.winnerIds)
            ? winnerEvent.winnerIds
            : standings(s, 'combined').filter(item => item.rank === 1).map(item => item.id);
          const winnerNames = winnerIds.map(id => contestant(id, s)?.name).filter(Boolean);
          title = winnerNames.length > 1
            ? winnerNames.length === 2 ? winnerNames.join(' & ') : `${winnerNames.slice(0, -1).join(', ')} & ${winnerNames[winnerNames.length - 1]}`
            : winnerNames[0] || standings(s, 'combined')[0]?.name || 'WorldVision';
          kicker = 'AND THE WINNER IS…';
          const winnerScore = Number.isFinite(winnerEvent?.winnerScore)
            ? winnerEvent.winnerScore
            : standings(s, 'combined')[0]?.score || 0;
          highlight = `${winnerScore} ${winnerScore === 1 ? 'POINT' : 'POINTS'}`;
          sub = winnerNames.length > 1 ? 'A shared first place. Congratulations!' : 'Congratulations!';
        } else {
          kicker = 'HOSTING RIGHTS';
          title = host?.name || 'Next event host';
          highlight = 'WILL HOST THE NEXT EVENT';
          if (ev.resolution === 'winner') {
            sub = 'The overall winner will host the next event.';
          } else if (ev.resolution === 'manual') {
            sub = 'Chosen from today’s shared winners. The first-place tie remains unchanged.';
          } else if (ev.resolution === 'televote') {
            sub = 'Hosting rights decided by televote points. The shared first place remains unchanged.';
          } else {
            sub = `Hosting rights decided by jury ${ev.resolvedPoint ? `${ev.resolvedPoint}-point` : ''} awards. The shared first place remains unchanged.`;
          }
        }
        scoreTitle = 'Final Results';
        break;
      }
    case 'host-choice':
      kicker = 'HOSTING RIGHTS';
      title = "Choose one of today's winners";
      highlight = 'to host the next event.';
      sub = 'The shared first place remains unchanged.';
      scoreTitle = 'Eligible Hosts';
      if (hostChoice) {
        const candidates = (ev.candidateIds || []).map(id => contestant(id, s)).filter(Boolean);
        hostChoice.hidden = false;
        hostChoice.innerHTML = `<div class="pres-host-options">${candidates.map(candidate => `<button class="pres-host-option" data-action="choose-host" data-id="${safe(candidate.id)}" type="button">${flagImageHTML(candidate.flag, 34)}<span>${safe(candidate.name)}</span></button>`).join('')}</div>`;
      }
      break;
  }
  const juryCounter = document.getElementById('presJuryCounter');
  const isJuryRaceEvent = ['jury-intro', 'jury-point', 'jury-end'].includes(ev.type);
  if (juryCounter) {
    const juryNumber = Number.isInteger(ev.juryIndex)
      ? ev.juryIndex + 1
      : Math.max(1, s.juries.findIndex(item => item.id === ev.juryId) + 1);
    juryCounter.innerHTML = `Jury # <strong>${juryNumber}</strong><span>/ ${s.juries.length}</span>`;
    juryCounter.hidden = !isJuryRaceEvent;
  }
  const titleEl = document.getElementById('presTitle');
  titleEl.textContent = title;
  titleEl.classList.toggle('shared-first-place', ev.type === 'winner' && (ev.winnerIds || []).length > 1);
  document.getElementById('presKicker').textContent = kicker;
  document.getElementById('presHighlight').textContent = highlight;
  document.getElementById('presSub').textContent = sub;
  document.getElementById('presScoreTitle').textContent = scoreTitle;
  const scoringEvent = (ev.type === 'jury-point' || ev.type === 'tv-point') ? ev : null;
  const baseTotals = scoringEvent ? getPresTotalsBeforeCurrent() : totals;
  const orderingTotals = beforeAddition ? baseTotals : totals;
  const scoreOrder = rankedByScore(Object.entries(orderingTotals).map(([id, score]) => {
    const item = contestant(id, s);
    return item ? { p: item, name: item.name, score: Number(score) || 0 } : null;
  }).filter(Boolean));
  
  const ranks = document.getElementById('presRanks');

  // Alle aktuell sichtbaren grünen Pluspunkte rekonstruieren.
  const visibleDeltas = new Map();

  for (let i = 0; i <= presIndex; i++) {
    const event = pres.events[i];

    switch (event.type) {
      case 'jury-intro':
      case 'jury-finish':
      case 'winner':
      case 'host-announcement':
      case 'host-choice':
        // Vorherige Punktephase beenden.
        visibleDeltas.clear();
        break;

      case 'jury-point':
      case 'tv-point':
        // Bei der Vorschau den aktuellen Punkt noch nicht anzeigen.
        if (beforeAddition && i === presIndex) break;

        visibleDeltas.set(
          event.participantId,
          Number(event.points) || 0
        );
        break;
    }
  }

  ranks.innerHTML = scoreOrder.map(item => {
    const isTarget = scoringEvent && item.p.id === scoringEvent.participantId;
    const delta = visibleDeltas.get(item.p.id);

    const displayedTotal =
      beforeAddition && isTarget
        ? item.score
        : (totals[item.p.id] || 0);

    return `<div class="pres-rank ${isTarget ? 'is-scoring' : ''}" data-score-id="${safe(item.p.id)}">
      <span class="pres-rank-position ${presRankClass(item.rank)}">${ordinalHTML(item.rank)}</span>
      <span class="pres-rank-country">${flagImageHTML(item.p.flag, 30)}<span>${safe(item.p.name)}</span></span>
      <b>
        ${delta !== undefined ? `<span class="pres-rank-delta">+${delta}</span>` : ''}
        <span class="pres-rank-total">${displayedTotal}</span>
      </b>
    </div>`;
  }).join('') || '<div class="smallmuted">No points yet.</div>';

  const sprintFinished = ['winner', 'host-announcement', 'host-choice'].includes(ev.type);
  renderPresSprint(orderingTotals, sprintFinished);
  if (scoringEvent) {
    requestAnimationFrame(() => {
      const target = ranks.querySelector(
        `[data-score-id="${scoringEvent.participantId}"]`
      );

      if (target) {
        const targetTop = target.offsetTop - ranks.offsetTop;
        const centeredTop = targetTop - (ranks.clientHeight - target.offsetHeight) / 2;

        ranks.scrollTo({
          top: Math.max(0, centeredTop),
          behavior: pres?.debugFastForward ? 'auto' : 'smooth'
        });
      }

      if (!beforeAddition) {
        animatePresScore(
          scoringEvent.participantId,
          baseTotals[scoringEvent.participantId] || 0,
          totals[scoringEvent.participantId] || 0
        );
      }
    });
  }
  // Keep the user's existing finish behavior: show the first-place row at the top.
  if (ev.type === 'winner') {
    requestAnimationFrame(() => ranks.scrollTo({ top: 0, behavior: pres?.debugFastForward ? 'auto' : 'smooth' }));
  }
  document.getElementById('presCount').textContent = `${presIndex + 1} / ${pres.events.length}`;
  document.getElementById('presProgress').style.width = `${100 * (presIndex + 1) / pres.events.length}%`;
  document.querySelector('[data-action="pres-pause"]').textContent = presPaused ? '▶' : 'Ⅱ';
}

function presNext(fromAuto = false) {
  if (!pres || presRevealPending || presPostAnimationPending) return;
  const currentEvent = pres.events[presIndex];
  if (currentEvent?.type === 'host-choice') return;
  if (currentEvent?.type === 'host-announcement' && !pres.hostRevealReady) return;
  if (presIndex === 0 && musicSequence.autoplay && !musicSequence.preViewEnded) return;
  if (!fromAuto) stopPresTimer();
  if (presIndex < pres.events.length - 1) {
    revealPresentationStart();
    presIndex++;
    showCurrentPresStep();
    handleMusicForPresentationStep();
    if (!presRevealPending && !presPaused) scheduleAutoStep();
  } else {
    presPaused = true;
    stopPresTimer();
    renderPres();
    updatePresPauseButton();
    if (pres?.debugFastForward) console.info('WorldVision Studio: Fast Forward reached the end of the presentation.');
  }
}

function presPrev() {
  if (!pres) return;
  stopPresTimer();
  clearPresReveal();
  clearPresPostAnimationWait();
  presIndex = Math.max(0, presIndex - 1);
  showCurrentPresStep();
  handleMusicForPresentationStep();
  if (!presRevealPending && !presPaused) scheduleAutoStep();
}

function presReset() {
  if (!pres) return;
  stopMusic();
  pres.debugFastForward = false;
  document.getElementById('presentation').classList.remove('debug-fast-forward');
  pres.hostRevealReady = false;
  presIndex = 0;
  presPaused = true;
  stopPresTimer();
  clearPresReveal();
  clearPresPostAnimationWait();
  renderPres();
  updatePresPauseButton();
}

function presPause() {
  if (presPaused) {
    startLiveJuryMusicIfAllowed();
    startAuto();
  } else {
    presPaused = true;
    stopPresTimer();
    pausePresRevealDelay();
    pausePresPostAnimationWait();
    if (!presPostAnimationPending) renderPres(presRevealPending ? 'before-addition' : 'reveal');
  }
}

function closePres() {
  stopPresTimer();
  clearPresReveal();
  clearPresPostAnimationWait();
  document.getElementById('presentation').classList.remove('debug-fast-forward');
  if (document.fullscreenElement) document.exitFullscreen?.();
  document.getElementById('presentation').classList.remove('on');
  document.getElementById('presentation').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  pres = null;
  stopMusic();
}

function stopPresTimer() {
  if (presTimer !== null) clearTimeout(presTimer);
  presTimer = null;
}

function stopPresRevealTimer() {
  if (presRevealTimer !== null) clearTimeout(presRevealTimer);
  presRevealTimer = null;
}

function clearPresReveal() {
  stopPresRevealTimer();
  presRevealPending = false;
  presRevealRemaining = 0;
  presRevealStartedAt = 0;
}

function pausePresRevealDelay() {
  if (presRevealTimer !== null) {
    clearTimeout(presRevealTimer);
    presRevealTimer = null;
    presRevealRemaining = Math.max(0, presRevealRemaining - (performance.now() - presRevealStartedAt));
    presRevealStartedAt = 0;
  }
}

function schedulePresRevealDelay() {
  if (!pres || !presRevealPending || presRevealTimer !== null || presPaused) return;
  presRevealStartedAt = performance.now();
  const delay = pres.debugFastForward ? DEBUG_FAST_FORWARD_DELAY_MS : Math.max(0, presRevealRemaining);
  presRevealTimer = setTimeout(revealPresPoints, delay);
}

function clearPresPostAnimationWait() {
  if (presPostAnimationTimer !== null) clearTimeout(presPostAnimationTimer);
  presPostAnimationTimer = null;
  presPostAnimationPending = false;
  presPostAnimationRemaining = 0;
  presPostAnimationStartedAt = 0;
}

function pausePresPostAnimationWait() {
  if (presPostAnimationTimer !== null) {
    clearTimeout(presPostAnimationTimer);
    presPostAnimationTimer = null;
    presPostAnimationRemaining = Math.max(0, presPostAnimationRemaining - (performance.now() - presPostAnimationStartedAt));
    presPostAnimationStartedAt = 0;
  }
}

function schedulePresPostAnimationWait() {
  if (!pres || !presPostAnimationPending || presPostAnimationTimer !== null || presPaused) return;
  presPostAnimationStartedAt = performance.now();
  const delay = pres.debugFastForward ? DEBUG_FAST_FORWARD_DELAY_MS : Math.max(0, presPostAnimationRemaining);
  presPostAnimationTimer = setTimeout(() => {
    presPostAnimationTimer = null;
    presPostAnimationStartedAt = 0;
    presPostAnimationPending = false;
    presPostAnimationRemaining = 0;
    if (pres && !presPaused) presNext(true);
  }, delay);
}

function beginPresPostAnimationWait(duration, holdMs = PRES_POST_ANIMATION_HOLD_MS) {
  clearPresPostAnimationWait();
  presPostAnimationPending = true;
  presPostAnimationRemaining = pres?.debugFastForward ? DEBUG_FAST_FORWARD_DELAY_MS : Math.max(0, duration) + Math.max(0, holdMs);
  schedulePresPostAnimationWait();
}

function showCurrentPresStep() {
  const ev = pres?.events[presIndex];
  if (pres?.debugFastForward && ev?.type === 'host-announcement') pres.hostRevealReady = true;
  if (ev && (ev.type === 'jury-point' || ev.type === 'tv-point')) {
    presRevealPending = true;
    presRevealRemaining = pres?.debugFastForward ? DEBUG_FAST_FORWARD_DELAY_MS : presSpeed;
    renderPres('before-addition');
    schedulePresRevealDelay();
  } else renderPres();
}

function debugFastForward() {
  if (!pres) {
    console.warn('Open a Jury Voting presentation before calling debugFastForward().');
    return false;
  }
  if (pres.debugFastForward) {
    console.info('WorldVision Studio: Fast Forward is already active.');
    return true;
  }
  stopPresTimer();
  if (presRevealTimer !== null) clearTimeout(presRevealTimer);
  presRevealTimer = null;
  presRevealStartedAt = 0;
  if (presRevealPending) presRevealRemaining = DEBUG_FAST_FORWARD_DELAY_MS;
  clearPresPostAnimationWait();
  pres.debugPreviousHostRevealReady = pres.hostRevealReady;
  pres.debugFastForward = true;
  document.getElementById('presentation').classList.add('debug-fast-forward');
  // Debug playback does not wait for background audio or the real Winning Run.
  // All voting events and scoring calculations still run in their original order.
  stopMusic();
  if (pres.events[presIndex]?.type === 'host-announcement') pres.hostRevealReady = true;
  presPaused = false;
  updatePresPauseButton();
  console.info(`WorldVision Studio: Fast Forward active (${DEBUG_FAST_FORWARD_DELAY_MS} ms per presentation delay). Animations and presentation music are skipped; all jury and televote points are still processed.`);
  if (pres.events[presIndex]?.type === 'host-choice') {
    presPaused = true;
    renderPres();
    updatePresPauseButton();
    console.info('Fast Forward is waiting for the manual host selection. Choose a host on the slide to continue.');
  } else if (presRevealPending) {
    renderPres('before-addition');
    schedulePresRevealDelay();
  } else {
    renderPres();
    scheduleAutoStep();
  }
  return true;
}

function debugFastForwardStop() {
  if (!pres?.debugFastForward) {
    console.warn('Fast Forward is not active.');
    return false;
  }
  stopPresTimer();
  if (presRevealTimer !== null) clearTimeout(presRevealTimer);
  presRevealTimer = null;
  presRevealStartedAt = 0;
  clearPresPostAnimationWait();
  pres.debugFastForward = false;
  if (presRevealPending) presRevealRemaining = presSpeed;
  if (!musicSequence.winnerRunPlaybackStarted) {
    pres.hostRevealReady = Boolean(pres.debugPreviousHostRevealReady);
  }
  delete pres.debugPreviousHostRevealReady;
  document.getElementById('presentation').classList.remove('debug-fast-forward');
  presPaused = true;
  renderPres(presRevealPending ? 'before-addition' : 'reveal');
  updatePresPauseButton();
  console.info('WorldVision Studio: Fast Forward stopped. The presentation is paused.');
  return true;
}
window.debugFastForward = debugFastForward;
window.debugFastForwardStop = debugFastForwardStop;
audio.addEventListener('timeupdate', () => {
  applyLoopWatch(audio);
});
winnerAudio.addEventListener('timeupdate', () => {
  applyLoopWatch(winnerAudio);
});
jingleAudio.addEventListener('timeupdate', () => {
  applyLoopWatch(jingleAudio);
});

function revealPresPoints() {
  presRevealTimer = null;
  presRevealStartedAt = 0;
  if (!pres || !presRevealPending) return;
  const ev = pres.events[presIndex];
  if (!ev || (ev.type !== 'jury-point' && ev.type !== 'tv-point')) {
    clearPresReveal();
    return;
  }
  const row = document.querySelector(`[data-score-id="${ev.participantId}"]`);
  const scoreBox = row?.querySelector('b:last-child');
  const before = getPresTotalsBeforeCurrent();
  const after = getPresTotals();
  const from = before[ev.participantId] || 0;
  const to = after[ev.participantId] || 0;
  const participantRank = totals => rankedByScore(Object.entries(totals).map(([id, score]) => ({ id, name: contestant(id)?.name || '', score: Number(score) || 0 }))).findIndex(item => item.id === ev.participantId) + 1;
  const previousRank = participantRank(before);
  const nextRank = participantRank(after);
  const nonLeaderOvertake = previousRank > 0 && nextRank > 0 && nextRank < previousRank && nextRank > 1;
  if (scoreBox) {
    scoreBox.innerHTML = `<span class="pres-rank-delta">+${ev.points}</span><span class="pres-rank-total">${from}</span>`;
  }
  presRevealPending = false;
  presRevealRemaining = 0;
  // 1. Punkteaddition starten und Animationsdauer erfassen.
  const scoreAnimationMs = animatePresScore(ev.participantId, from, to);
  // Celebrate only when this participant moves past the previous leader.
  const flagAnimationMs = ev.type === 'jury-point' && ev.juryIndex === 0
    ? 0
    : animateNewLeaderFlag(ev.participantId, before, after);
  // 2. Neue Rangfolge und Überholanimation starten.
  const rankingAnimationMs = animatePresRanking(after);
  renderPresSprint(after, false);
  // 3. Gleichzeitig zur NEUEN Position scrollen.
  const ranks = document.getElementById('presRanks');
  const newPosition = ranks?.querySelector(`[data-score-id="${ev.participantId}"]`);
  let scrollAnimationMs = 0;
  if (ranks && newPosition) {
    const targetTop = newPosition.offsetTop - ranks.offsetTop;
    const centeredTop = targetTop - (ranks.clientHeight - newPosition.offsetHeight) / 2;
    ranks.scrollTo({
      top: Math.max(0, centeredTop),
      behavior: pres?.debugFastForward ? 'auto' : 'smooth'
    });
    scrollAnimationMs = pres?.debugFastForward ? 0 : PRES_SCROLL_SETTLE_MS;
  }
  // Wait for every visual animation, then hold the completed result for one
  // additional second before moving to the next presentation slide.
  const longestAnimationMs = Math.max(scoreAnimationMs, flagAnimationMs, rankingAnimationMs, scrollAnimationMs);
  // Non-leading overtakes use the presentation speed as their post-step hold.
  // Taking the lead keeps the existing flag celebration and its original hold.
  const postAnimationHoldMs = nonLeaderOvertake ? presSpeed : PRES_POST_ANIMATION_HOLD_MS;
  beginPresPostAnimationWait(longestAnimationMs, postAnimationHoldMs);
}

function scheduleAutoStep() {
  stopPresTimer();
  if (!pres || presPaused) return;
  const currentEvent = pres.events[presIndex];
  if (currentEvent?.type === 'host-choice') return;
  if (currentEvent?.type === 'host-announcement' && !pres.hostRevealReady) return;
  if (pres.debugFastForward) {
    presTimer = setTimeout(() => {
      presTimer = null;
      if (!pres || presPaused) return;
      presNext(true);
    }, DEBUG_FAST_FORWARD_DELAY_MS);
    return;
  }
  let extraJuryHold = 0;
  if (currentEvent?.type === 'jury-intro') {
    extraJuryHold = JURY_WAIT_MS;
  } else if (currentEvent?.type === 'jury-end') {
    const roundIndex = Number(currentEvent.juryIndex);
    const nextRoundIndex = roundIndex + 1;
    const show = activeShow();
    const finalStartIndex = Math.max(0, (show?.juries?.length || 0) - 3);
    const finaleTransition = nextRoundIndex === finalStartIndex && musicSequence.finaleStarted;
    const normalTransition = musicSequence.normalPlan.some(slot => slot.startIndex === nextRoundIndex && slot.track);
    if (finaleTransition || normalTransition) {
      // The current jury-end slide remains visible until the 3-second fade and
      // the following 2-second silence have both completed.
      extraJuryHold = Math.max(0, TRACK_FADE_OUT_MS + JURY_END_SILENCE_MS - presSpeed);
      musicDebug('Jury-end presentation hold covers song transition', {
        round: roundIndex + 1,
        fadeOutMs: TRACK_FADE_OUT_MS,
        silenceMs: JURY_END_SILENCE_MS,
        totalHoldMs: presSpeed + extraJuryHold
      });
    }
  }
  presTimer = setTimeout(() => {
    presTimer = null;
    if (!pres || presPaused) return;
    presNext(true);
  }, presSpeed + extraJuryHold);
}

function updatePresPauseButton() {
  const button = document.querySelector('[data-action=\"pres-pause\"]');
  if (button) button.textContent = presPaused ? '▶' : 'Ⅱ';
}

function startAuto() {
  stopPresTimer();
  revealPresentationStart(); // NEU!
  presPaused = false;
  const newlyStarted = pres?.debugFastForward ? false : startLiveJuryMusicIfAllowed();
  if (newlyStarted && presIndex > 0) handleMusicForPresentationStep();
  if (pres?.debugFastForward && pres.events[presIndex]?.type === 'host-announcement') pres.hostRevealReady = true;
  if (presPostAnimationPending) {
    schedulePresPostAnimationWait();
    return;
  }
  if (presRevealPending) {
    renderPres('before-addition');
    schedulePresRevealDelay();
  } else {
    renderPres();
    scheduleAutoStep();
  }
}

function adjustSpeed(factor) {
  presSpeed = Math.max(250, Math.min(8000, presSpeed * factor));
  if (!presPaused) {
    stopPresTimer();
    if (presPostAnimationPending) {
      /* Keep the active animation gate unchanged. */
    } else if (presRevealPending) {
      pausePresRevealDelay();
      presRevealRemaining = presSpeed;
      renderPres('before-addition');
      schedulePresRevealDelay();
    } else {
      renderPres();
      scheduleAutoStep();
    }
  }
  toast(`Speed: ${(presSpeed / 1000).toFixed(1)} sec per step`);
}

function randomizeJury() {
  const s = activeShow();
  s.juries.forEach(j => {
    j.votes = {};
    const pool = s.participants.filter(p => !s.settings.excludeSelf || p.name !== j.name);
    const shuffled = pool.slice().sort(() => Math.random() - .5);
    juryPointValues(j, s).forEach((pt, i) => {
      if (shuffled[i]) j.votes[shuffled[i].id] = pt;
    });
  });
  saveDB();
  render();
  toast('Random jury scores generated.');
}

function randomizeTV() {
  const s = activeShow();
  s.participants.forEach(p => s.televote[p.id] = Math.floor(Math.random() * 601));
  saveDB();
  render();
  toast('Random televote points distributed.');
}

function clearJuries() {
  const s = activeShow();
  s.juries.forEach(j => j.votes = {});
  saveDB();
  render();
  toast('All jury points cleared.');
}

function resetSpoilerReveals() {
  spoilersRevealed = false;
  jurySpoilersRevealed = false;
}

function applyScoringPoints(s, nextPoints, presetName = 'custom') {
  const next = nextPoints.map(Number).sort((a, b) => b - a);
  const current = pointsList(s);
  const changed = current.join(',') !== next.join(',');
  const hasVotes = (s.juries || []).some(j => Object.values(j.votes || {}).some(value => Number(value) > 0));
  if (changed && hasVotes) {
    const accepted = confirm('Changing the scoring scale will clear all existing jury assignments so that no points from the old scale remain. Continue?');
    if (!accepted) return false;
    s.juries.forEach(j => {
      j.votes = {};
    });
  }
  s.settings.points = next;
  s.settings.pointPreset = presetName;
  saveDB();
  render();
  toast(changed && hasVotes ? 'Scoring updated. Existing jury assignments were cleared.' : 'Scoring updated.');
  return true;
}

function applyCustomScoring() {
  const s = activeShow();
  const input = document.getElementById('customPointsInput');
  if (!s || !input) return;
  const raw = input.value.trim();
  if (!raw) {
    toast('Enter at least one point value.');
    return;
  }
  const tokens = raw.split(/[;,\s]+/).filter(Boolean);
  if (!tokens.every(token => /^\d+$/.test(token))) {
    toast('Use whole numbers separated by commas or spaces.');
    return;
  }
  const values = tokens.map(Number);
  if (values.some(value => !Number.isSafeInteger(value) || value < 1 || value > 1000000)) {
    toast('Point values must be whole numbers between 1 and 1,000,000.');
    return;
  }
  if (new Set(values).size !== values.length) {
    toast('Every point value must be unique.');
    return;
  }
  applyScoringPoints(s, values, 'custom');
}

function chooseHostForNextEvent(id) {
  const event = pres?.events?.[presIndex];
  if (!event || event.type !== 'host-choice' || !(event.candidateIds || []).includes(id)) return;
  const s = activeShow(), host = contestant(id, s);
  if (!host) return;
  stopPresTimer();
  s.nextHostId = id;
  saveDB();
  pres.events[presIndex] = { ...event, type: 'host-announcement', hostId: id, resolution: 'manual' };
  pres.selectedHostId = id;
  if (pres.debugFastForward) {
    pres.hostRevealReady = true;
    presPaused = false;
  }
  renderPres();
  if (!presPaused) scheduleAutoStep();
}

function handleAction(a, id) {
  const s = activeShow();
  switch (a) {
    case 'jury-import-preview': {
      const input = document.getElementById('juryImportText');
      juryImportText = input?.value || '';
      juryImportPreview = parseJuryImportText(juryImportText, s);
      render();
      if (!juryImportPreview.submissions.length) toast('No jury submissions found.');
      else if (juryImportPreview.errors.length) toast('Import preview found errors.');
      else toast(`${juryImportPreview.submissions.length} jury submissions recognized.`);
      break;
    }
    case 'jury-import-file':
      document.getElementById('juryImportFile')?.click();
      break;
    case 'jury-import-apply':
      applyJuryImport();
      break;
    case 'jury-import-clear':
      juryImportPreview = null;
      render();
      break;
    case 'choose-host':
      chooseHostForNextEvent(id);
      break;
    case 'apply-custom-scoring':
      applyCustomScoring();
      break;
    case 'reveal-spoilers':
      if (confirm('Reveal the current standings? The results will become visible on this screen.')) {
        spoilersRevealed = true;
        render();
      }
      break;
    case 'reveal-jury-spoilers':
      if (confirm('Reveal the overall jury score? The jury results will become visible on this screen.')) {
        jurySpoilersRevealed = true;
        render();
      }
      break;
    case 'new-show':
      {
        juryImportPreview = null;
        juryImportText = '';
        const name = prompt('What should your new WorldVision edition be called?', 'WorldVision ' + new Date().getFullYear());
        if (name === null) return;
        resetSpoilerReveals();
        const ns = blankShow(name.trim() || 'WorldVision');
        db.shows.push(ns);
        db.activeShowId = ns.id;
        view = 'participants';
        saveDB();
        render();
        break;
      } case 'activate':
      juryImportPreview = null;
      juryImportText = '';
      resetSpoilerReveals();
      db.activeShowId = id;
      view = 'home';
      saveDB();
      render();
      break;
    case 'duplicate':
      {
        resetSpoilerReveals();
        const orig = db.shows.find(x => x.id === id);
        if (!orig) return;
        const cp = clone(orig);
        cp.id = uid();
        cp.name = orig.name + ' (Copy)';
        cp.createdAt = new Date().toISOString();
        cp.juries = cp.juries.map(j => ({ ...j, id: uid() }));
        cp.participants = cp.participants.map(p => ({ ...p, id: uid() }));
        const idMap = {};
        orig.participants.forEach((p, i) => idMap[p.id] = cp.participants[i].id);
        cp.juries.forEach((j, i) => {
          const old = orig.juries[i];
          const v = {};
          Object.entries(old?.votes || {}).forEach(([pid, pts]) => {
            if (idMap[pid]) v[idMap[pid]] = pts;
          });
          j.votes = v;
        });
        const tv = {};
        Object.entries(orig.televote || {}).forEach(([pid, v]) => {
          if (idMap[pid]) tv[idMap[pid]] = v;
        });
        cp.televote = tv;
        cp.musicAssetId = null;
        cp.musicName = '';
        db.shows.push(cp);
        db.activeShowId = cp.id;
        saveDB();
        render();
        toast('Show duplicated (please select the music file again).');
        break;
      } case 'delete-show':
      if (db.shows.length === 1) {
        toast('The last show cannot be deleted.');
        return;
      }
      if (confirm('Delete this show?')) {
        deleteMusicAsset(id);
        db.shows = db.shows.filter(x => x.id !== id);
        if (db.activeShowId === id) {
          db.activeShowId = db.shows[0].id;
          resetSpoilerReveals();
        }
        saveDB();
        render();
      }
      break;
    case 'add-participant':
      addParticipant();
      break;
    case 'add-template':
      DEFAULT_COUNTRIES.slice(0, 14).forEach(([flag, name]) => s.participants.push({ id: uid(), flag, name, artist: '', song: '', order: s.participants.length + 1 }));
      saveDB();
      render();
      toast('14 countries added.');
      break;
    case 'remove-participant':
      if (confirm('Remove this participant?')) {
        s.participants = s.participants.filter(p => p.id !== id);
        s.juries.forEach(j => delete j.votes[id]);
        delete s.televote[id];
        saveDB();
        render();
      }
      break;
    case 'sort-participants':
      s.participants.sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));
      saveDB();
      render();
      break;
    case 'add-jury':
      addJury();
      break;
    case 'remove-jury':
      if (confirm('Remove this jury?')) {
        s.juries = s.juries.filter(j => j.id !== id);
        saveDB();
        render();
      }
      break;
    case 'jury-up':
      {
        const i = s.juries.findIndex(j => j.id === id);
        if (i > 0) {
          [s.juries[i - 1], s.juries[i]] = [s.juries[i], s.juries[i - 1]];
          saveDB();
          render();
        }
        break;
      } case 'jury-down':
      {
        const i = s.juries.findIndex(j => j.id === id);
        if (i >= 0 && i < s.juries.length - 1) {
          [s.juries[i + 1], s.juries[i]] = [s.juries[i], s.juries[i + 1]];
          saveDB();
          render();
        }
        break;
      } case 'shuffle-juries':
      s.juries.sort(() => Math.random() - .5);
      saveDB();
      render();
      toast('Jury order shuffled.');
      break;
    case 'copy-juries':
      {
        let n = 0;
        s.participants.forEach(p => {
          if (!s.juries.some(j => j.name === p.name)) {
            s.juries.push({ id: uid(), flag: p.flag, name: p.name, votes: {} });
            n++;
          }
        });
        saveDB();
        render();
        toast(`${n} juries copied.`);
        break;
      } case 'randomize-jury':
      randomizeJury();
      break;
    case 'clear-juries':
      if (confirm('Clear all jury scores?')) clearJuries();
      break;
    case 'random-tv':
      randomizeTV();
      break;
    case 'clear-tv':
      if (confirm('Clear all televote points?')) {
        s.televote = {};
        saveDB();
        render();
      }
      break;
    case 'start-pres':
      startPresentation();
      break;
    case 'export':
      exportShow();
      break;
    case 'import-trigger':
      document.getElementById('importFile').click();
      break;
    case 'reset-show':
      if (confirm('Completely reset this show?')) {
        juryImportPreview = null;
        juryImportText = '';
        resetSpoilerReveals();
        deleteMusicAsset(s.id);
        const n = blankShow(s.name);
        n.id = s.id;
        n.year = s.year;
        n.host = s.host;
        const i = db.shows.findIndex(x => x.id === s.id);
        db.shows[i] = n;
        saveDB();
        render();
        toast('Show reset.');
      }
      break;
    case 'close-pres':
      closePres();
      break;
    case 'pres-next':
      presNext();
      break;
    case 'pres-prev':
      presPrev();
      break;
    case 'pres-reset':
      presReset();
      break;
    case 'pres-pause':
      presPause();
      break;
    case 'pres-faster':
      adjustSpeed(.7);
      break;
    case 'pres-slower':
      adjustSpeed(1.4);
      break;
    case 'music-toggle':
      toggleMusic();
      break;
    case 'pres-fullscreen':
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => toast('Fullscreen is not available in this browser.'));
      else document.exitFullscreen?.();
      break;
  }
}


let fireFieldStartTimeout = null;
let fireFieldInterval = null;
let fireFieldIsFinalLap = false;

function startFireField(presentation) {
  stopFireField();

  fireFieldIsFinalLap = false;

  // Feuerstrahlen erst 11 Sekunden nach Songstart
  fireFieldStartTimeout = setTimeout(() => {
    fireFieldStartTimeout = null;

    if (!presentation.classList.contains('fire-field')) return;

    spawnFireFieldStreaks(presentation);
    spawnFireFieldSparks(presentation);
  }, 11000);
}

function spawnFireFieldStreaks(presentation) {
  if (fireFieldInterval !== null) {
    clearInterval(fireFieldInterval);
  }

  const interval = fireFieldIsFinalLap ? 125 : 350;

  fireFieldInterval = setInterval(() => {
    if (!presentation.classList.contains('fire-field')) {
      stopFireField();
      return;
    }

    const streak = document.createElement('div');
    streak.className = 'fire-streak';

    streak.style.left = `${Math.random() * 100}%`;

    const intensityRoll = Math.random();

    let fireWidth;
    let fireHeight;
    let fireOpacity;
    let fireGlow;

    if (intensityRoll < 0.70) {
      // 70 % normale Feuerstrahlen
      fireWidth = 12 + Math.random() * 20;
      fireHeight = 100 + Math.random() * 200;
      fireOpacity = 0.8;
      fireGlow = 1;
    } else if (intensityRoll < 0.90) {
      // 20 % besonders intensive Feuerstrahlen
      fireWidth = 22 + Math.random() * 22;
      fireHeight = 150 + Math.random() * 200;
      fireOpacity = 0.95;
      fireGlow = 1.5;
    } else {
      // 10 % extrem intensive Ausbrüche
      fireWidth = 30 + Math.random() * 25;
      fireHeight = 180 + Math.random() * 180;
      fireOpacity = 1;
      fireGlow = 2;
    }

    streak.style.setProperty('--fire-width', `${fireWidth}px`);
    streak.style.setProperty('--fire-height', `${fireHeight}px`);
    streak.style.setProperty('--fire-opacity', fireOpacity);
    streak.style.setProperty('--fire-glow', fireGlow);
    streak.style.setProperty( '--fire-flicker-duration', `${0.25 + Math.random() * 0.45}s` );
    streak.style.setProperty(
      '--fire-duration',
      `${1.2 + Math.random() * 1.3}s`
    );

    streak.addEventListener('animationend', () => {
      streak.remove();
    }, { once: true });

    presentation.appendChild(streak);
  }, interval);
}

let fireFieldSparkInterval = null;

function spawnFireFieldSparks(presentation) {
  if (fireFieldSparkInterval !== null) {
    clearInterval(fireFieldSparkInterval);
  }

  const interval = fireFieldIsFinalLap ? 45 : 110;

  fireFieldSparkInterval = setInterval(() => {
    if (!presentation.classList.contains('fire-field')) {
      clearInterval(fireFieldSparkInterval);
      fireFieldSparkInterval = null;
      return;
    }

    const spark = document.createElement('div');
    spark.className = 'fire-spark';

    spark.style.left = `${Math.random() * 100}%`;

    spark.style.setProperty(
      '--spark-drift',
      `${(Math.random() - 0.5) * 100}px`
    );

    spark.style.setProperty(
      '--spark-size',
      `${2 + Math.random() * 4}px`
    );

    spark.style.setProperty(
      '--spark-duration',
      `${0.7 + Math.random() * 1.3}s`
    );

    spark.addEventListener('animationend', () => {
      spark.remove();
    }, { once: true });

    presentation.appendChild(spark);
  }, interval);
}

function setFireFieldFinalLap(presentation, enabled) {
  if (fireFieldIsFinalLap === enabled) return;

  fireFieldIsFinalLap = enabled;

  // Nur das Intervall ändern, wenn die Feuerstrahlen bereits laufen.
  // Die 11-Sekunden-Wartezeit wird dabei nicht erneut gestartet.
  if (fireFieldInterval !== null) {
    spawnFireFieldStreaks(presentation);
  }

  if (fireFieldSparkInterval !== null) {
    spawnFireFieldSparks(presentation);
  }
}

function stopFireField() {
  if (fireFieldStartTimeout !== null) {
    clearTimeout(fireFieldStartTimeout);
    fireFieldStartTimeout = null;
  }

  if (fireFieldInterval !== null) {
    clearInterval(fireFieldInterval);
    fireFieldInterval = null;
  }

  if (fireFieldSparkInterval !== null) {
    clearInterval(fireFieldSparkInterval);
    fireFieldSparkInterval = null;
  }

  fireFieldIsFinalLap = false;

  document.querySelectorAll('.fire-streak').forEach(streak => {
    streak.remove();
  });
}

root.addEventListener('click', e => {
  const nav = e.target.closest('[data-view]');
  if (nav) {
    view = nav.dataset.view;
    render();
    return;
  }
  const b = e.target.closest('[data-action]');
  if (b) handleAction(b.dataset.action, b.dataset.id);
});
document.getElementById('topActions').addEventListener('click', e => {
  const b = e.target.closest('[data-action]');
  if (b) handleAction(b.dataset.action, b.dataset.id);
});
document.getElementById('presentation').addEventListener('click', e => {
  const b = e.target.closest('[data-action]');
  if (b) handleAction(b.dataset.action, b.dataset.id);
});
document.getElementById('mainNav').addEventListener('click', e => {
  const b = e.target.closest('[data-view]');
  if (b) {
    view = b.dataset.view;
    render();
  }
});
root.addEventListener('input', e => {
  const el = e.target, s = activeShow();
  if (!s) return;
  if (el.dataset.edit === 'participant') {
    const p = contestant(el.dataset.id, s);
    if (p) {
      if (el.dataset.key === 'flag') {
        const pos = el.selectionStart;
        const code = el.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2);
        if (code !== el.value) {
          el.value = code;
          try {
            el.setSelectionRange(Math.min(pos, code.length), Math.min(pos, code.length));
          } catch (_) {
          }
        }
        p.flag = code;
      } else p[el.dataset.key] = el.dataset.key === 'order' ? Number(el.value) : el.value;
      saveDB();
    }
  } else if (el.dataset.edit === 'jury') {
    const j = s.juries.find(x => x.id === el.dataset.id);
    if (j) {
      j[el.dataset.key] = el.value;
      saveDB();
    }
  } else if (el.dataset.showfield) {
    s[el.dataset.showfield] = el.dataset.showfield === 'year' ? Number(el.value) : el.value;
    saveDB();
    document.getElementById('sideShowName').textContent = s.name;
  } else if (el.dataset.tv) {
    s.televote[el.dataset.tv] = Math.max(0, Number(el.value) || 0);
    saveDB();
  }
});
root.addEventListener('change', async e => {
  const el = e.target, s = activeShow();
  if (!s) return;
  if (el.dataset.edit === 'participant' && el.dataset.key === 'flag') {
    const p = contestant(el.dataset.id, s);
  
    if (p) {
      p.flag = toISOCode(el.value);
  
      const countries = await getCountryLookup();
      const country = countries.byCode.get(p.flag);
  
      if (country) {
        p.name = country.name;
      }
  
      saveDB();
      render();
    }
  } else if (
    el.dataset.edit === 'participant' &&
    el.dataset.key === 'name'
  ) {
    const p = contestant(el.dataset.id, s);
  
    if (p) {
      const countries = await getCountryLookup();
      const code = countries.byName.get(
        normalizeCountryName(el.value)
      );
  
      if (code) {
        p.flag = code;
        saveDB();
        render();
      }
    }
  } else if (el.dataset.juryvote) {
    const j = s.juries.find(x => x.id === el.dataset.juryvote);
    if (j) {
      const pt = Number(el.dataset.points);
      Object.keys(j.votes).forEach(id => {
        if (Number(j.votes[id]) === pt) delete j.votes[id];
      });
      if (el.value) j.votes[el.value] = pt;
      saveDB();
      render();
    }
  } else if (el.dataset.setting) {
    const k = el.dataset.setting;
    if (k === 'pointPreset') {
      if (el.value === 'esc') {
        applyScoringPoints(s, POINTS, 'esc');
      } else if (el.value === 'fzero44') {
        applyScoringPoints(s, FZERO_GX_POINTS, 'fzero44');
      } else if (el.value === 'top5') {
        applyScoringPoints(s, [5, 4, 3, 2, 1], 'top5');
      } else {
        s.settings.pointPreset = 'custom';
        saveDB();
        render();
      }
      return;
    }
    if (el.type === 'checkbox') s.settings[k] = el.checked;
    else s.settings[k] = el.value;
    saveDB();
    render();
    if (k === 'musicEnabled') syncEntryMusicSetting();
  } else if (el.dataset.tv) {
    s.televote[el.dataset.tv] = Math.max(0, Number(el.value) || 0);
    saveDB();
  }
});
document.getElementById('juryImportFile').addEventListener('change', async e => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const content = await file.text();
    view = 'juries';
    juryImportText = content;
    juryImportPreview = parseJuryImportText(content, activeShow());
    render();
    const textarea = document.getElementById('juryImportText');
    if (textarea) textarea.value = content;
    if (!juryImportPreview.submissions.length) toast('No jury submissions found in this file.');
    else if (juryImportPreview.errors.length) toast('File loaded; correct the errors shown in the preview.');
    else toast(`${juryImportPreview.submissions.length} jury submissions recognized.`);
  } catch (error) {
    console.error('Could not read jury text file.', error);
    toast('The selected text file could not be read.');
  }
  e.target.value = '';
});
document.getElementById('importFile').addEventListener('change', e => {
  if (e.target.files[0]) importData(e.target.files[0]);
  e.target.value = '';
});
document.addEventListener('keydown', e => {
  if (!pres) return;
  if (e.key === 'Escape') {
    closePres();
    return;
  }
  if (e.target.matches('input,select,textarea')) return;
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    presNext();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    presPrev();
  } else if (e.key === 'Home') {
    e.preventDefault();
    presReset();
  } else if (e.key === ' ') {
    e.preventDefault();
    presPause();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    adjustSpeed(.7);
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    adjustSpeed(1.4);
  }
});
initializeSoundCloudPlayers();
updateMuteButton();
render();
tryStartEntryMusic();
const retryEntryMusicAfterGesture = () => {
  if (entryMusicPending && !entryMusicStoppedForPresentation && !pres && activeShow()?.settings?.musicEnabled) {
    tryStartEntryMusic();
  }
};
document.addEventListener('pointerdown', retryEntryMusicAfterGesture, true);
document.addEventListener('keydown', retryEntryMusicAfterGesture, true);

let worldVisionFPSBenchmark = {
  running: false,
  frameCount: 0,
  lastTime: 0,
  animationId: null
};

function startFPSBenchmark() {
  if (worldVisionFPSBenchmark.running) {
    console.warn('FPS-Benchmark läuft bereits.');
    return;
  }

  worldVisionFPSBenchmark.running = true;
  worldVisionFPSBenchmark.frameCount = 0;
  worldVisionFPSBenchmark.lastTime = performance.now();

  console.log('FPS-Benchmark gestartet.');

  function measureFPS(now) {
    if (!worldVisionFPSBenchmark.running) return;

    worldVisionFPSBenchmark.frameCount++;

    const elapsed = now - worldVisionFPSBenchmark.lastTime;

    if (elapsed >= 1000) {
      const fps =
        worldVisionFPSBenchmark.frameCount / (elapsed / 1000);

      console.log(`WorldVision Studio: ${fps.toFixed(2)} FPS`);

      worldVisionFPSBenchmark.frameCount = 0;
      worldVisionFPSBenchmark.lastTime = now;
    }

    worldVisionFPSBenchmark.animationId =
      requestAnimationFrame(measureFPS);
  }

  worldVisionFPSBenchmark.animationId =
    requestAnimationFrame(measureFPS);
}

function stopFPSBenchmark() {
  if (!worldVisionFPSBenchmark.running) {
    console.warn('FPS-Benchmark läuft nicht.');
    return;
  }

  worldVisionFPSBenchmark.running = false;

  if (worldVisionFPSBenchmark.animationId !== null) {
    cancelAnimationFrame(worldVisionFPSBenchmark.animationId);
    worldVisionFPSBenchmark.animationId = null;
  }

  console.log('FPS-Benchmark gestoppt.');
}
