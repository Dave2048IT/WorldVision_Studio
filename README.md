# WorldVision Studio

**Benutzerhandbuch und Entwicklerdokumentation**  
Dokumentiert für die aufgeteilte Version mit `index.html`, `style.css` und `script.js`.

---

## Inhaltsverzeichnis

1. [Überblick](#1-überblick)
2. [Dateien, Voraussetzungen und Start](#2-dateien-voraussetzungen-und-start)
3. [Eine Show vorbereiten](#3-eine-show-vorbereiten)
   - [My Shows](#31-my-shows--shows-verwalten)
   - [Participants](#32-participants--teilnehmer-und-beiträge)
   - [Juries & Points](#33-juries--points--jurys-und-punkte)
   - [Televote](#34-televote--publikumsabstimmung)
   - [Settings](#35-settings--regeln-und-einstellungen)
4. [Live-Präsentation bedienen](#4-live-präsentation-bedienen)
5. [Punkte, Rangliste und Gastgeberentscheidung](#5-punkte-rangliste-und-gastgeberentscheidung)
6. [Sprintstrecke und Präsentationsanimationen](#6-sprintstrecke-und-präsentationsanimationen)
7. [Musik und Audio](#7-musik-und-audio)
8. [Speicherung, Backup und Import](#8-speicherung-backup-und-import)
9. [Fehlerbehebung](#9-fehlerbehebung)
10. [Technischer Aufbau](#10-technischer-aufbau)
11. [Wichtige Funktionen und Codebereiche](#11-wichtige-funktionen-und-codebereiche)
12. [Debugging und Leistungstests](#12-debugging-und-leistungstests)
13. [Änderungen sicher entwickeln und testen](#13-änderungen-sicher-entwickeln-und-testen)
14. [Bekannte Hinweise zum Versionsstand](#14-bekannte-hinweise-zum-versionsstand)

---

## 1. Überblick

WorldVision Studio ist eine lokal im Browser laufende Anwendung zum Vorbereiten und Präsentieren einer eigenen Musik- und Abstimmungsshow. Sie eignet sich beispielsweise für einen Wettbewerb im Familien- oder Freundeskreis. Teilnehmer können Länder, Personen oder frei benannte Teams sein.

Die Anwendung umfasst:

- die Verwaltung mehrerer voneinander getrennter Shows;
- Teilnehmer mit Flagge, Namen, Interpret, Songtitel und Reihenfolge;
- eine frei konfigurierbare Jury-Liste;
- mehrere Punkteverteilungen einschließlich einer 44-stufigen F-Zero-GX-Verteilung;
- manuell eingetragene Publikums- bzw. Televote-Punkte;
- kombinierte Gesamtwertungen und eine animierte Rangliste;
- eine Live-Präsentation mit manueller und automatischer Steuerung;
- eine automatische Gastgeberentscheidung mit Sonderbehandlung von Gleichständen;
- optionale, in den Show-Ablauf integrierte Musik und Soundeffekte;
- eine vertikale Sprintstrecke, auf der die Teilnehmerflaggen mit dem Punktestand nach oben wandern;
- lokale Datenspeicherung sowie JSON-Export und -Import.

Die Anwendung benötigt keinen eigenen Server und keinen Build-Schritt. Die Verwaltungsdaten werden lokal im Browser gespeichert. Für Flaggenbilder und die integrierte Online-Musik werden jedoch externe Dienste verwendet.

## 2. Dateien, Voraussetzungen und Start

### 2.1 Benötigte Dateien

Die v3.16-Ausgabe ist nicht mehr eine einzelne HTML-Datei. Die drei Anwendungsdateien müssen zusammen in demselben Ordner liegen:

```text
WorldVision_Studio_v3.16/
├── index.html
├── style.css
├── script.js
├── README_WorldVision_Studio_v3.16.md
└── F-Zero GX - SFX/                 (für lokale Soundeffekte)
    ├── Three two one go - louder.mp3
    ├── Yeah, the final lap.mp3
    └── finiiish.mp3
```

Der Ordner `F-Zero GX - SFX` wird im bereitgestellten Quellpaket nicht automatisch mitgeliefert. Soll die Musikfunktion verwendet werden, muss er neben `index.html` angelegt und mit den drei MP3-Dateien in exakt dieser Schreibweise bestückt werden. Ohne diese lokalen Dateien können die betreffenden Soundeffekte nicht geladen werden. Bei deaktivierter Musik-Einstellung wird ohnehin keine Audiodatei abgespielt.

### 2.2 Voraussetzungen

- Ein aktueller Desktop-Browser. Chrome oder Edge sind geeignete Referenzbrowser; andere moderne Browser können ebenfalls funktionieren.
- JavaScript muss aktiviert sein.
- Eine Internetverbindung für FlagCDN-Flaggen, die SoundCloud-Player-API und die online geladenen Musikstücke von SoundCloud bzw. Internet Archive.
- Erlaubte Audio-Wiedergabe im Browser, wenn die Musikfunktion genutzt werden soll.

### 2.3 Anwendung starten

1. Lege alle drei Anwendungsdateien in denselben Projektordner.
2. Ergänze bei Bedarf den Ordner `F-Zero GX - SFX` samt MP3-Dateien.
3. Öffne `index.html` mit einem Doppelklick oder über **Datei öffnen** im Browser.
4. Erstelle unter **My Shows → New Show** eine neue Show oder öffne eine bereits gespeicherte.

Es ist keine Installation von Python, PHP, Node.js oder einem lokalen Webserver erforderlich.

### 2.4 Externe Verbindungen

| Dienst | Verwendung | Was bei Nichterreichbarkeit passiert |
|---|---|---|
| FlagCDN (`flagcdn.com`) | Länderflaggen anhand des ISO-Ländercodes | Die Flagge kann nicht geladen werden; die übrigen Show-Daten bleiben nutzbar. |
| SoundCloud Widget API | Zwei versteckte Player für die integrierte Musik und die Final-Lap-Versionen | Die entsprechende Online-Musik kann ausfallen. |
| Internet Archive (`archive.org`) | Einstiegs-Musik, Long Course Pre-View und Winning Run | Die jeweilige Audiodatei kann nicht geladen werden. |

Die Anwendung selbst und ihre Show-Daten werden nicht auf diese Dienste hochgeladen. Die externen Dienste liefern Medieninhalte bzw. die Flaggenbilder.

## 3. Eine Show vorbereiten

Die Navigation auf der linken Seite enthält fünf Bereiche: **My Shows**, **Participants**, **Juries & Points**, **Televote** und **Settings**. Die Daten dieser Bereiche gehören immer zur aktuell ausgewählten Show.

### 3.1 My Shows – Shows verwalten

Auf der Startseite werden die vorhandenen Shows als einzelne Karten angezeigt. Jede Show besitzt ihre eigenen Teilnehmer, Jurys, Punkte und Einstellungen.

| Aktion | Bedeutung |
|---|---|
| **New Show** | Erstellt eine neue, leere Show und aktiviert sie. |
| **Open / Switch to show** | Aktiviert die ausgewählte gespeicherte Show. |
| **Duplicate** | Erstellt eine Kopie der Show einschließlich Teilnehmern, Jury-Zuordnungen und Televote-Werten. Die Kopie erhält neue interne IDs. |
| **Delete** | Löscht die ausgewählte Show nach Bestätigung. Die letzte verbliebene Show kann nicht gelöscht werden. |
| **Reset** | Leert die aktuelle Show: Teilnehmer, Jurys, Punkte und zugehörige Wertungen werden zurückgesetzt. Name, Jahr und Veranstaltungsort bleiben erhalten. |

Die Startseite zeigt außerdem Kennzahlen wie die Anzahl der Teilnehmer und Jurys sowie den Bearbeitungsstatus der Jurys. Ein Zwischenstand kann nur nach bewusster Freigabe über **Reveal Spoilers** angezeigt werden.

### 3.2 Participants – Teilnehmer und Beiträge

Jeder Teilnehmer repräsentiert ein Land, eine Person oder ein frei benanntes Team. Die Tabelle enthält folgende Felder:

| Feld | Bedeutung | Beispiel |
|---|---|---|
| **Flag code** | Zweistelliger ISO-3166-1-alpha-2-Code für die Flagge | `DE`, `SE`, `FI` |
| **Country / Team** | Anzeigename des Landes oder Teams | `Germany`, `Team Mom` |
| **Artist** | Interpret bzw. Künstler | `Example Artist` |
| **Song** | Titel des Beitrags | `Example Song` |
| **Running order** | Nummer zur Sortierung der Teilnehmerliste | `1`, `2`, `3` |

Über **Country template** werden 14 vorbereitete Länder auf einmal hinzugefügt. Zusätzliche Teilnehmer lassen sich mit **Add participant** einzeln anlegen. Eigene Teams sind ausdrücklich möglich; in diesem Fall kann das Flaggenfeld leer bleiben.

Mit **Sort by running order** werden die Teilnehmer anhand des eingetragenen Reihenfolgewertes sortiert. Die Flaggen werden anhand des ISO-Codes von FlagCDN geladen und behalten ihr Seitenverhältnis.

### 3.3 Juries & Points – Jurys und Punkte

Eine Jury vergibt die Punkte einer Abstimmungsrunde. Jurys können einzeln angelegt oder aus den Teilnehmern übernommen werden.

**Verwaltungsaktionen:**

- **Add jury:** Eine Jury manuell hinzufügen.
- **Copy participants as juries:** Für Teilnehmer, zu denen noch keine Jury mit gleichem Namen besteht, eine Jury anlegen.
- **Shuffle order:** Die Reihenfolge der Jurys zufällig mischen.
- **Pfeil hoch / Pfeil runter:** Eine Jury in der Liste verschieben.
- **Fill random votes:** Für Testzwecke zufällige Jury-Punkte verteilen.
- **Clear all jury points:** Alle Jury-Zuordnungen nach Bestätigung entfernen.

Für jeden Punktewert wird genau ein Empfänger ausgewählt. Ein Punktewert darf innerhalb einer Jury nicht mehrfach vergeben werden. Nicht vergebene Werte dürfen leer bleiben; eine Jury kann somit unvollständig gespeichert werden. Der Status **Complete / Incomplete** zeigt, ob alle für diese Jury vorgesehenen Punkte vergeben wurden.

Ist **Exclude own entry** aktiviert, kann eine Jury dem eigenen Teilnehmer keinen Punkt zuweisen. Die Zuordnung wird anhand des Jury- und Teilnehmernamens erkannt.

#### Verfügbare Punkteverteilungen

Die Punkteverteilung wird in **Settings → Scoring system** ausgewählt:

| Bezeichnung | Punktewerte | Beschreibung |
|---|---|---|
| **Classic: 12, 10, 8–1** | `12, 10, 8, 7, 6, 5, 4, 3, 2, 1` | Klassische ESC-Verteilung mit zehn Empfängern. |
| **Top 5** | `5, 4, 3, 2, 1` | Fünf Empfänger erhalten Punkte. |
| **F-Zero GX + Extra: 44 values** | 44 absteigende Werte von 100 bis 1 | Erweiterte Verteilung mit bis zu 44 Empfängern. |
| **Custom scoring** | Frei definierbare Werte | Eigene Liste aus eindeutigen positiven Ganzzahlen. |

Die vollständige F-Zero-GX-Verteilung lautet:

```text
100, 93, 87, 81, 76, 71, 66, 62, 58, 54, 50,
47, 44, 41, 38, 35, 33, 31, 29, 27, 25, 23,
22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12,
11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
```

Bei der 44er-Verteilung zeigt eine Jury nur so viele der höchsten Werte an, wie für die teilnahmeberechtigten Einträge benötigt werden. Dadurch werden bei aktivem Ausschluss des eigenen Beitrags keine unnötigen Punktefelder angezeigt.

**Eigene Punkteskala:** Werte können durch Kommas, Semikolons oder Leerzeichen getrennt eingegeben werden. Erlaubt sind eindeutige positive Ganzzahlen zwischen 1 und 1.000.000. Doppelte Werte, Dezimalzahlen und negative Werte werden abgelehnt.

**Wichtige Warnung beim Wechsel der Punkteskala:** Wenn bereits Jury-Punkte zugewiesen wurden und sich die Punkteskala ändert, fragt WorldVision Studio vor dem Anwenden nach einer Bestätigung. Bei Zustimmung werden alle bestehenden Jury-Zuordnungen gelöscht. Das verhindert, dass Punktewerte der alten Skala versehentlich in der neuen Skala verbleiben.

### 3.4 Televote – Publikumsabstimmung

Im Televote-Bereich werden die kombinierten Publikumspunkte pro Teilnehmer eingetragen. Es werden keine einzelnen Stimmen oder Anrufzahlen verwaltet, sondern die bereits berechnete Gesamtpunktzahl, die ein Beitrag vom Publikum erhält.

- Die Punktzahl wird pro Teilnehmer eingetragen; der Eingabebereich ist auf Werte von 0 bis 20.000 ausgelegt.
- **Distribute randomly** verteilt zum Testen zufällige Werte.
- **Clear televote** entfernt alle eingetragenen Televote-Punkte nach Bestätigung.
- Unter **Presentation Order** wird festgelegt, in welcher Reihenfolge die Publikumspunkte angekündigt werden.

Für die Ansagereihenfolge gibt es zwei Möglichkeiten:

- **Jury ranking:** Teilnehmer mit den niedrigsten Jury-Punktzahlen werden zuerst aufgerufen.
- **Televote ranking:** Teilnehmer mit den niedrigsten Televote-Punktzahlen werden zuerst aufgerufen.

**Enable televote** entscheidet, ob die Televote-Punkte in die kombinierte Gesamtwertung eingehen und ob der Televote-Abschnitt in der Präsentation erscheint. Wird die Funktion deaktiviert, bleiben bereits eingetragene Werte gespeichert, werden aber nicht zur Gesamtwertung addiert und nicht als Televote-Runde präsentiert.

### 3.5 Settings – Regeln und Einstellungen

In den Einstellungen werden die allgemeinen Angaben und Regeln der aktuellen Show gepflegt:

| Einstellung | Wirkung |
|---|---|
| **Show title** | Name der Show. |
| **Year** | Veranstaltungsjahr. |
| **Host / Location** | Gastgeber oder Veranstaltungsort; wird unter anderem in der Eröffnungsfolie verwendet. |
| **Scoring system** | Classic, Top 5, F-Zero GX + Extra oder Custom scoring. |
| **Passende Musik je nach Jury-Runde abspielen** | Aktiviert oder deaktiviert sämtliche Musik und Soundeffekte der Show. |
| **Exclude own entry** | Verhindert, dass eine Jury den eigenen Beitrag bewertet. |
| **Use televoting** | Aktiviert oder deaktiviert die Einbeziehung der Publikumswertung. |

Die Musik-Einstellung ist standardmäßig deaktiviert. Bei deaktivierter Einstellung soll während der gesamten Show keine Audiodatei abgespielt werden. Das schließt auch Einstiegs-Musik, Countdown- und Final-Lap-Soundeffekte, Finish-Sound und Winning Run ein. Präsentation, Punktberechnung und Animationen sind davon getrennte Bestandteile.

Der Bereich **Backup & Data** bietet außerdem **Export**, **Import** und **Reset current show**.

## 4. Live-Präsentation bedienen

Die Präsentation kann aus **Juries & Points** oder **Televote** gestartet werden. Es müssen mindestens zwei Teilnehmer vorhanden sein. Nicht jede Jury muss vollständig sein: Es werden die tatsächlich zugewiesenen Punkte in den Präsentationsablauf übernommen.

Die Präsentation öffnet sich als eigene Vollbild-ähnliche Ebene innerhalb der Anwendung. Oben befinden sich Fortschrittsanzeige, Vollbild-Umschaltung und Schließen. Unten liegen die Navigations- und Wiedergabesteuerungen.

### 4.1 Steuerung

| Steuerung | Funktion |
|---|---|
| **Next** / Pfeil rechts | Zum nächsten Präsentationsschritt wechseln. |
| **Pfeil links** | Einen Präsentationsschritt zurückgehen. |
| **Space** | Automatische Wiedergabe starten oder pausieren. |
| **Home** | Präsentation an den Anfang zurücksetzen. |
| **Pfeil hoch** | Automatische Präsentation beschleunigen. |
| **Pfeil runter** | Automatische Präsentation verlangsamen. |
| **Fullscreen** | Browser-Vollbild ein- oder ausschalten. |
| **Esc** bzw. **Close** | Präsentation schließen. |
| **♫ Mute** | Musik und Soundeffekte global stummschalten bzw. wieder freigeben. |

Die automatische Schrittgeschwindigkeit beginnt bei **3.000 Millisekunden (3 Sekunden) pro Schritt**. Sie kann innerhalb der Anwendung zwischen **250 und 8.000 Millisekunden** angepasst werden. Die Geschwindigkeit ist nicht mit jeder Animationsdauer gleichzusetzen: Punktanzeige, Ranglistenbewegung, Flaggenanimationen und Musikübergänge besitzen zusätzliche Zeitsteuerungen.

### 4.2 Ablauf der Präsentation

Der Ablauf wird aus den gespeicherten Show-Daten erzeugt. Je nach Einstellungen enthält er:

1. Eröffnungsfolie mit Show-Namen und gegebenenfalls Gastgeber/Veranstaltungsort;
2. für jede Jury eine Einleitungsfolie, die vergebenen Punkte und eine Abschlussfolie;
3. eine Übersicht der Jury-Gesamtwertung;
4. sofern aktiviert, die Ansage der Televote-Punkte und die Gesamtwertung;
5. die Gewinnerfolie mit allen Personen bzw. Teams auf dem ersten Platz;
6. gegebenenfalls eine gesonderte Gastgeberauswahl oder Gastgeberbekanntgabe.

Innerhalb einer Jury werden die vorhandenen Punktewerte von klein nach groß präsentiert. So wird die höchste Auszeichnung der jeweiligen Jury zuletzt bekanntgegeben. Die Rangliste zeigt die laufenden Gesamtpunkte und wird während der Punktvergabe aktualisiert.

### 4.3 Animierte Rangliste

Wenn Punkte vergeben werden, wird der Punktestand des betroffenen Teilnehmers animiert. Die Rangliste ordnet sich anschließend neu. Der betroffene Eintrag wird in der Rangliste hervorgehoben und bei Bedarf in den sichtbaren Bereich gescrollt. Überholt ein Teilnehmer den bisherigen Führenden und übernimmt Platz 1, erhält seine Flagge eine zusätzliche Hervorhebung.

Nach der Gewinnerfolie wird die Rangliste wieder an den Anfang gescrollt, damit Platz 1 sichtbar ist.

### 4.4 Spoiler-Schutz

Die Verwaltungsansichten halten Jury-Gesamtwertung und Zwischenstände zunächst verborgen. Zum Anzeigen muss **Reveal Spoilers** gewählt und die Nachfrage bestätigt werden. Die Freigabe ist ein Sitzungszustand der aktuellen Anwendung; sie ist keine dauerhafte Show-Einstellung.

## 5. Punkte, Rangliste und Gastgeberentscheidung

Die Jury-Gesamtwertung ergibt sich aus allen tatsächlich vergebenen Jury-Punkten. Wenn Televote aktiviert ist, werden die Publikumspunkte pro Teilnehmer addiert:

```text
Gesamtpunkte = Jury-Punkte + Televote-Punkte
```

Ist Televote deaktiviert, besteht die kombinierte Gesamtwertung nur aus den Jury-Punkten. Gleichstände erhalten denselben Rang. Mehrere Teilnehmer auf dem höchsten Rang werden gemeinsam als Gewinner präsentiert; die Gewinnerliste wird durch die Gastgeberentscheidung nicht auf eine einzelne Person reduziert.

### 5.1 Gastgeberentscheidung ohne Gleichstand

Gibt es genau einen Gesamtsieger, wird dieser automatisch als Gastgeber für die nächste Ausgabe bestimmt.

### 5.2 Gastgeberentscheidung bei Gleichstand

Gibt es mehrere gemeinsame Gesamtsieger, wird die Gastgeberrolle separat bestimmt. Die Kriterien werden in dieser Reihenfolge angewendet:

1. **Televote-Punkte:** Wenn Televote aktiviert ist, werden die aufgezeichneten Televote-Punktzahlen der gemeinsamen Gewinner verglichen. Der Kandidat mit dem höchsten Wert bleibt übrig, sofern damit ein eindeutiger Kandidat bestimmt ist.
2. **Jury-Punktewerte:** Besteht weiterhin Gleichstand, werden die Werte der aktiven Jury-Punkteskala vom höchsten zum niedrigsten Wert geprüft. Verglichen wird, wie oft jeder Kandidat genau diesen Punktewert erhalten hat. Der erste eindeutig führende Kandidat wird Gastgeber.
3. **Manuelle Auswahl:** Bleiben mehrere Kandidaten übrig, wird während der Präsentation eine manuelle Auswahl unter den noch berechtigten gemeinsamen Gewinnern verlangt.

Die Gewinnerliste bleibt in allen Fällen unverändert. Die Gastgeberentscheidung bestimmt nur, wer die nächste Ausgabe veranstaltet.

Bei aktivierter Musik wird die Gastgeberbekanntgabe bis zum tatsächlichen Start des Winning Run zurückgehalten. Dadurch werden die gemeinsamen Gewinner zuerst vollständig gezeigt; der nächste Gastgeber wird erst im dafür vorgesehenen späteren Präsentationsschritt bekanntgegeben.

## 6. Sprintstrecke und Präsentationsanimationen

v3.16 ergänzt links neben der Score Table eine vertikale Sprintstrecke. Sie visualisiert den Punktefortschritt aller Teilnehmer während der Jury- und Televote-Ansagen.

### 6.1 Aufbau der Strecke

- Die Strecke beginnt an der unteren Startlinie.
- Ein grüner Pfeil markiert die Startposition.
- Die Teilnehmerflaggen befinden sich innerhalb des Streckenbereichs.
- Oben befindet sich die Ziellinie; das Zielflaggen-Symbol bleibt während der laufenden Wertung verborgen.
- Nach der Gewinnerermittlung wird das Zielflaggen-Symbol eingeblendet.

### 6.2 Berechnung der Flaggenposition

Beim Start der Präsentation wird der höchste kombinierte Endpunktestand der Teilnehmer als Referenzwert gespeichert. Die Flaggenposition wird anschließend anhand der bis zum jeweiligen Präsentationsschritt erreichten Punkte relativ zu diesem Referenzwert berechnet.

Der höchste mögliche Endpunktestand entspricht 90 % des Streckenfortschritts; die Flagge des späteren Siegers erreicht damit die obere Ziellinienposition. Teilnehmer ohne Punkte beginnen an der unteren Startlinie. Ist der Referenzwert null, bleiben alle Flaggen am Start.

### 6.3 Gleichstände und Anordnung

Teilnehmer mit gleicher Punktzahl erhalten dieselbe vertikale Position. Ihre Flaggen werden horizontal nebeneinander angeordnet. Bei größeren Gleichstandsgruppen wird der Abstand reduziert. Reicht der vorhandene Platz selbst dann nicht aus, dürfen Flaggen teilweise überlappen, damit sie innerhalb des vorgesehenen Div-Bereichs bleiben.

Die Positionen werden bei jeder Punktevergabe aktualisiert. Vorhandene Flaggen-Elemente werden wiederverwendet, damit Positionsänderungen über CSS-Übergänge animiert werden können. Die Flaggen mit dem höchsten Punktestand werden zuletzt gezeichnet und liegen dadurch visuell vor den anderen Flaggen.

Das Zielflaggen-Symbol erscheint ab der Gewinnerfolie und bleibt auch während der anschließenden Gastgeberauswahl bzw. Gastgeberbekanntgabe sichtbar.

## 7. Musik und Audio

Die Musik ist optional und wird zentral über **Settings → Passende Musik je nach Jury-Runde abspielen** gesteuert. Die Einstellung ist showbezogen und standardmäßig ausgeschaltet.

### 7.1 Zentrale Musikregel

- **Aktiviert:** Die Anwendung darf die Einstiegs-Musik, Long Course Pre-View, reguläre Jury-Musik, saisonale Finale-Musik, Final-Lap-Musik, lokale Soundeffekte und den Winning Run abspielen.
- **Deaktiviert:** Während der gesamten Show wird keine Audiodatei abgespielt. Die Präsentation, Punkte, Rangliste, Animationen und Gewinnerlogik sind davon getrennte Funktionen.

Die Schaltfläche **♫ Mute** in der Präsentation ist eine zusätzliche Laufzeit-Stummschaltung. Sie ersetzt die zentrale Show-Einstellung nicht.

### 7.2 Einstiegs-Musik: U-Rays (Tutorial)

Wenn die Musik-Einstellung aktiviert ist, versucht WorldVision Studio beim Öffnen der Seite den Titel **U-Rays (Tutorial)** aus dem Internet Archive abzuspielen. Der verwendete Loop springt bei 52,000 Sekunden zurück zu 8,300 Sekunden. Die Wiedergabe endet, sobald die Live-Präsentation geöffnet wird.

Browser blockieren automatische Wiedergabe häufig, solange noch keine Benutzerinteraktion stattgefunden hat. In diesem Fall wartet die Anwendung und versucht den Start nach der ersten Benutzerinteraktion erneut. Wird die Live-Präsentation vorher geöffnet, wird die Einstiegs-Musik nicht nachträglich gestartet.

### 7.3 Long Course Pre-View

Die Long Course Pre-View wird beim Öffnen der Live-Präsentation vorab geladen. Sie beginnt nicht schon während des Vorladens. Sobald die automatische Präsentation gestartet und die Vorschau tatsächlich abgespielt wird, startet sie bei 0 % Lautstärke und blendet sich über **3.000 Millisekunden (3 Sekunden)** auf die Ziel-Lautstärke ein.

Wird die Präsentation zunächst manuell über die Folien gesteuert und erst später die automatische Wiedergabe gestartet, wird die Vorschau nicht nachträglich mitten in den Ablauf eingeschoben.

### 7.4 Reguläre Jury-Musik

Die regulären SoundCloud-Titel werden in zufälliger Reihenfolge ausgewählt. Zwei versteckte SoundCloud-Player (A und B) ermöglichen es, den nächsten Titel vorzubereiten, während der aktuelle Titel noch läuft oder ausgeblendet wird.

Die letzten drei Jury-Runden sind für das saisonale Finale reserviert. Die davorliegenden Jury-Runden werden in Musikblöcke eingeteilt:

- Ein normaler Musikblock begleitet grundsätzlich zwei Jury-Runden.
- Ergibt sich vor dem saisonalen Finale eine ungerade Anzahl regulärer Runden, wird ein Dreierblock am Ende dieses Abschnitts verwendet. Dadurch entsteht kein einzelner Musikblock, der nur eine Runde lang wäre.
- Bei einem regulären Titelwechsel wird der aktuelle Titel über 3 Sekunden ausgeblendet. Danach folgt eine Stille von 2 Sekunden, bevor der nächste Titel beginnt.

Die regulären Titel stammen aus der F-Zero-GX-Musikauswahl. Das saisonale Finale ist davon getrennt.

### 7.5 Saisonales Finale und Final Lap

Für die letzten drei Jury-Runden wird abhängig vom aktuellen Kalendermonat ein saisonales Finale-Thema ausgewählt:

| Zeitraum | Finale-Thema |
|---|---|
| März bis Mai | Green Plant |
| Juni bis August | Fire Field |
| September bis November | Aeropolis |
| Dezember bis Februar | Phantom Road |

Die normale Finale-Version wird auf Player A geladen. Die passende Final-Lap-Version wird parallel auf Player B vorbereitet. Der Final-Lap-Wechsel wird im Show-Ablauf ausgelöst:

- Ist Televote aktiviert, beginnt der Final-Lap-Übergang mit dem Televote-Abschnitt.
- Ist Televote deaktiviert, wird der Übergang an der letzten Jury-Runde ausgelöst.

Zunächst ertönt der lokale Soundeffekt `Yeah, the final lap.mp3`. Der aktuelle SoundCloud-Titel läuft noch weitere 5 Sekunden. Danach wird auf die vorbereitete Final-Lap-Version gewechselt.

### 7.6 F-Zero-GX-Präsentationsthemen

Wenn ein passender SoundCloud-Titel tatsächlich startet, wird auch die Farbgestaltung der Präsentation angepasst. Die Hintergrundfarben wechseln weich zum jeweiligen Streckenthema.

Zwei Themen besitzen zusätzliche Effekte:

- **Phantom Road:** Die Präsentation erhält einen zusätzlichen Regenbogen-Effekt.
- **Fire Field:** Feuerstreifen beginnen 11 Sekunden nach dem Start des Fire-Field-Titels. Während der Final Lap wird die Erzeugungsrate der Streifen erhöht. Beim Verlassen des Themas werden die laufenden Effekte entfernt.

Diese visuellen Effekte sind an das erkannte Musikthema gebunden. Ein bloßes Laden einer Audiodatei löst den Themenwechsel noch nicht aus.

### 7.7 Countdown, Finish und Winning Run

Beim ersten Start eines regulären Musikblocks wird der lokale Countdown-Sound `Three two one go - louder.mp3` mit einer Verzögerung von 4.300 Millisekunden ausgelöst.

Sobald der Gewinner feststeht, wird die bisherige Jury-/Finale-Musik beendet. Danach laufen parallel:

- der lokale Finish-Soundeffekt `finiiish.mp3`;
- der SoundCloud-Titel **Finish to go**.

Nach dem Ende von **Finish to go** wartet die Anwendung weitere 5 Sekunden und startet anschließend den **Winning Run** aus dem Internet Archive. Die Gastgeberbekanntgabe wird erst freigegeben, wenn die Winning-Run-Wiedergabe tatsächlich begonnen hat.

### 7.8 Lokale Audiodateien

Die drei lokalen Soundeffekte werden relativ zum Ordner von `index.html` geladen:

```text
F-Zero GX - SFX/
├── Three two one go - louder.mp3
├── Yeah, the final lap.mp3
└── finiiish.mp3
```

Die Dateien müssen exakt so heißen und im angegebenen Unterordner liegen. Die Long Course Pre-View, U-Rays (Tutorial), Finish to go und Winning Run werden dagegen über externe Audioquellen geladen.

## 8. Speicherung, Backup und Import

### 8.1 Lokale Speicherung

Die regulären Show-Daten werden automatisch im `localStorage` des Browsers gespeichert. Der zentrale Schlüssel lautet:

```js
const STORAGE_KEY = 'worldvision_studio_v1';
```

Gespeichert werden unter anderem:

- alle Shows und die aktuell aktive Show;
- Teilnehmer, Flaggen-Codes, Interpreten und Songtitel;
- Jurys und deren Punktzuordnungen;
- Televote-Werte;
- Punkteverteilung und Show-Einstellungen;
- Show-Name, Jahr, Gastgeber/Veranstaltungsort sowie Erstellungs- und Änderungszeitpunkt.

Die Anwendung zeigt in der Seitenleiste den Speicherstatus an. Schlägt das Speichern fehl, erscheint ein Hinweis, einen JSON-Backup zu erstellen.

### 8.2 JSON-Export

**Export / Backup** erzeugt eine JSON-Datei mit allen gespeicherten Shows. Die Datei enthält unter anderem den Namen der Anwendung, die Exportformatversion, den Exportzeitpunkt, die aktive Show-ID und das Show-Array.

Der Export enthält keine eingebetteten Audio-Dateien. Integrierte Online-Musik wird über die in der Anwendung hinterlegten Quellen geladen. Die drei lokalen Soundeffekte müssen separat im Ordner `F-Zero GX - SFX` vorhanden sein.

### 8.3 JSON-Import

**Import** liest eine JSON-Datei und fügt die darin enthaltenen Shows zur aktuellen lokalen Sammlung hinzu. Bereits vorhandene Shows werden nicht automatisch ersetzt.

Beim Import erhalten die importierten Shows neue interne Show-IDs. Die Teilnehmer- und Jury-Datensätze werden aus dem JSON übernommen. Die erste importierte Show wird anschließend aktiviert. Die Musik-Einstellung wird für importierte Shows aus Sicherheits- und Kompatibilitätsgründen deaktiviert; sie kann danach in **Settings** wieder eingeschaltet werden.

### 8.4 Backup-Empfehlungen

- Exportiere regelmäßig eine Sicherung.
- Bewahre Backups an einem anderen Ort als dem Projektordner auf.
- Erstelle vor größeren Änderungen an Teilnehmern, Jurys oder Punkteskalen einen zusätzlichen Export.
- Lösche Browserdaten oder lokale Website-Daten nicht, bevor ein aktueller Backup-Export vorliegt.
- Importiere nur JSON-Dateien aus einer vertrauenswürdigen Quelle.

Die Show-Daten liegen nicht automatisch in einer Cloud und werden nicht zwischen verschiedenen Browsern oder Geräten synchronisiert.

## 9. Fehlerbehebung

**Die Anwendung startet nicht oder die Oberfläche bleibt leer.**  
Prüfe, ob `index.html`, `style.css` und `script.js` im selben Ordner liegen. Öffne die Browser-Entwicklerkonsole und suche nach JavaScript- oder Ladefehlern. Die drei Dateien dürfen nicht voneinander getrennt werden.

**Änderungen werden nicht gespeichert.**  
Prüfe den Speicherstatus in der Seitenleiste. Bei einem Speicherkonflikt oder zu wenig Browser-Speicher sofort einen JSON-Export anlegen. Browserdaten nicht löschen, bevor ein Backup erstellt wurde.

**Flaggen fehlen.**  
Prüfe, ob der Flaggen-Code aus genau zwei Buchstaben besteht und ob eine Internetverbindung besteht. Flaggen werden über FlagCDN geladen. Eigene Teamnamen können ohne Flaggen-Code verwendet werden.

**Die Musik startet nicht.**  
Prüfe zunächst die zentrale Musik-Einstellung und die globale **Mute**-Schaltfläche. Für SoundCloud- und Internet-Archive-Inhalte ist eine Internetverbindung erforderlich. Der Browser kann die automatische Einstiegs-Musik blockieren; in diesem Fall wird nach einer Benutzerinteraktion erneut versucht, sie zu starten.

**Ein lokaler Soundeffekt fehlt.**  
Prüfe den Ordnernamen `F-Zero GX - SFX` und die exakte Schreibweise der drei MP3-Dateinamen. Der Unterordner muss direkt neben `index.html` liegen. Wenn die zentrale Musik-Einstellung ausgeschaltet ist, werden absichtlich keine lokalen Soundeffekte abgespielt.

**Die Sprintstrecke zeigt keine Flaggen.**  
Die Sprintstrecke wird innerhalb der Live-Präsentation gerendert. Prüfe, ob mindestens zwei Teilnehmer vorhanden sind und ob die Präsentation tatsächlich gestartet wurde. Flaggenbilder benötigen zusätzlich einen gültigen Flaggen-Code oder werden als Platzhalter dargestellt.

**Die Animationen wirken ruckelig oder laufen langsamer als erwartet.**  
Prüfe die Browser- und Systemleistung, die Bildschirmfrequenz und den Windows-Energiemodus. Bei einem Laptop kann der Akkubetrieb die verfügbare Systemleistung reduzieren. Ein Wechsel auf Netzbetrieb kann die Darstellung wieder flüssiger machen. Das ist nicht automatisch ein Fehler in der Punkte- oder Animationslogik. Zur Messung kann der integrierte FPS-Benchmark verwendet werden (siehe [Debugging und Leistungstests](#12-debugging-und-leistungstests)).

**Die Präsentation lässt sich nicht fortsetzen.**  
Prüfe, ob gerade eine Punkteanimation läuft, ob die Präsentation pausiert ist oder ob eine manuelle Gastgeberauswahl aussteht. Bei aktivierter Musik wird die Gastgeberbekanntgabe an den tatsächlichen Start des Winning Run gekoppelt. Audio-Ladefehler können diesen Teil des Ablaufs beeinflussen; die Browserkonsole hilft bei der Diagnose.

## 10. Technischer Aufbau

### 10.1 Aufteilung in drei Dateien

Die v3.16-Ausgabe trennt Struktur, Darstellung und Verhalten:

| Datei | Zuständigkeit | Typische Inhalte |
|---|---|---|
| `index.html` | Struktur und Einbindung | Navigation, Verwaltungsbereiche, Präsentationscontainer, Audioelemente, SoundCloud-Iframes, Einbindung von CSS und JavaScript. |
| `style.css` | Darstellung | Layout, Farben, responsive Ansichten, Score Table, Ranglisten- und Flaggenanimationen, Musikthemen und Sprintstrecke. |
| `script.js` | Verhalten und Daten | Show-Daten, Speichern, Punkteberechnung, Präsentationsereignisse, Timer, Musiklogik, Sprintpositionsberechnung, Event-Handler und Debugfunktionen. |

Änderungen sollten möglichst in der Datei vorgenommen werden, die für den jeweiligen Bereich zuständig ist. Die drei Dateien müssen weiterhin zusammenpassen.

### 10.2 Datenmodell – vereinfachte Orientierung

Der lokale Speicher enthält eine Datenbank mit mehreren Shows. Vereinfacht sieht die Struktur so aus:

```js
{
  version: 1,
  musicSettingMigratedV313: true,
  activeShowId: "...",
  shows: [
    {
      id: "...",
      name: "WorldVision 2026",
      year: 2026,
      host: "",
      participants: [
        {
          id: "...",
          flag: "DE",
          name: "Germany",
          artist: "",
          song: "",
          order: 1
        }
      ],
      juries: [
        {
          id: "...",
          flag: "🎤",
          name: "Jury 1",
          votes: {}
        }
      ],
      settings: {
        televoteEnabled: true,
        televoteOrder: "jury",
        excludeSelf: true,
        points: [12, 10, 8, 7, 6, 5, 4, 3, 2, 1],
        pointPreset: "esc",
        musicEnabled: false
      },
      televote: {},
      musicName: "",
      musicAssetId: null,
      createdAt: "...",
      updatedAt: "..."
    }
  ]
}
```

Das Schema ist bewusst vereinfacht und nicht als vollständige JSON-Spezifikation gedacht. Teilnehmer- und Jury-Einträge besitzen eindeutige interne IDs. Die Jury-Stimmen werden als Zuordnung von Teilnehmer-ID zu Punktewert gespeichert. Televote-Werte werden über die Teilnehmer-ID zugeordnet.

Es gibt unterschiedliche Versionsnummern, die nicht verwechselt werden dürfen:

- `3.16` ist die Versionsnummer der Anwendung.
- `db.version` ist die interne Version des lokalen Datenmodells.
- `version` im JSON-Export ist die Version des Exportformats.

Diese Werte erfüllen unterschiedliche Aufgaben.

### 10.3 Zentrale Zustände

Wichtige Zustände im JavaScript sind unter anderem:

- `db`: lokale Datenbank und Liste der Shows;
- `view`: aktuell geöffneter Verwaltungsbereich;
- `pres`: Zustand der laufenden Präsentation und die erzeugten Präsentationsereignisse;
- `presIndex`: aktuell angezeigter Präsentationsschritt;
- `presSpeed` und `presPaused`: automatische Wiedergabegeschwindigkeit und Pausenstatus;
- `musicSequence`: Zustand der Musikabfolge, bereits verarbeitete Runden und Übergänge;
- `soundcloudSlots.A` und `soundcloudSlots.B`: Zustand der beiden SoundCloud-Player;
- `globalAudioMuted`: globale Stummschaltung;
- `spoilersRevealed` und `jurySpoilersRevealed`: Freigabestatus für versteckte Wertungen;
- `pres.sprintMaxPoints`: Referenzwert für die vertikale Sprintstreckenposition.

### 10.4 Ereignissteuerung

Die Anwendung verwendet Event Delegation. Dynamisch erzeugte Schaltflächen erhalten nicht jeweils einen eigenen Listener. Stattdessen lauschen übergeordnete Elemente auf Ereignisse und werten `data-*`-Attribute aus.

| Attribut | Zweck |
|---|---|
| `data-view` | Wechselt den Verwaltungsbereich. |
| `data-action` | Löst eine Aktion aus und wird über `handleAction()` verarbeitet. |
| `data-edit` | Kennzeichnet bearbeitbare Teilnehmer- oder Jury-Felder. |
| `data-setting` | Kennzeichnet eine Show-Einstellung. |
| `data-juryvote` | Kennzeichnet eine Jury-Punktezuordnung. |
| `data-tv` | Kennzeichnet einen Televote-Eingabewert. |

Dieses Muster sollte bei neuen dynamischen Schaltflächen und Eingaben beibehalten werden.

## 11. Wichtige Funktionen und Codebereiche

Die folgende Tabelle ist ein Wegweiser für die Quellcode-Navigation. Zeilennummern sind absichtlich nicht festgehalten, weil sie sich mit Änderungen verschieben.

| Funktion / Bereich | Aufgabe |
|---|---|
| `blankShow()` / `initialDB()` | Erstellt eine leere Show bzw. die erste lokale Datenbank. |
| `loadDB()` / `saveDB()` | Lädt und speichert die lokalen Show-Daten. |
| `activeShow()` | Liefert die aktuell ausgewählte Show. |
| `render()` | Rendert den aktuellen Verwaltungsbereich. |
| `renderHome()` | Show-Dashboard und Karten der gespeicherten Shows. |
| `renderParticipants()` | Teilnehmerverwaltung. |
| `renderJuries()` | Juryverwaltung und Punktezuweisung. |
| `renderTelevote()` | Eingabe und Übersicht der Publikumspunkte. |
| `renderSettings()` | Allgemeine Show-Einstellungen und Punkteskalen. |
| `pointsList()` / `juryPointValues()` | Liefert die aktive Punkteverteilung und die für eine Jury relevanten Punktewerte. |
| `totalJuryVotes()` | Berechnet die Jury-Punktesummen. |
| `totalTelevote()` | Berechnet die Televote-Summen. |
| `combinedTotals()` | Addiert Jury- und gegebenenfalls Televote-Punkte. |
| `rankedByScore()` / `standings()` | Erzeugt Rangfolgen einschließlich Gleichständen. |
| `calculateHostingDecision()` | Berechnet Gastgeberkandidaten und Tie-Breaker. |
| `buildEvents()` | Erstellt aus den Show-Daten die Reihenfolge der Präsentationsereignisse. |
| `startPresentation()` | Initialisiert die Live-Präsentation und den Sprint-Referenzwert. |
| `renderPres()` | Rendert den aktuellen Präsentationsschritt einschließlich Rangliste und Sprintstrecke. |
| `renderPresSprint()` | Positioniert die Teilnehmerflaggen auf der Sprintstrecke und steuert das Zielflaggen-Symbol. |
| `animatePresScore()` | Animiert die Veränderung der angezeigten Punktzahl. |
| `animateNewLeaderFlag()` | Hebt eine Flagge hervor, wenn ein Teilnehmer die Führung übernimmt. |
| `animatePresRanking()` | Animiert die Neuordnung der Rangliste. |
| `presNext()` / `presPrev()` / `presReset()` | Navigiert durch die Präsentation. |
| `scheduleAutoStep()` / `startAuto()` | Steuert die automatische Präsentationsfolge. |
| `debugFastForward()` / `debugFastForwardStop()` | Aktiviert bzw. beendet den Konsolen-Fast-Forward-Testmodus. |
| `startMusicAutoplay()` | Initialisiert die Musikplanung der Live-Präsentation. |
| `buildNormalTrackPlan()` | Plant die normalen Musiktitelblöcke vor den letzten drei Jury-Runden. |
| `preloadLongPreview()` / `playPreloadedLongPreview()` | Lädt und startet die Long Course Pre-View. |
| `triggerAutoplayMusicForCurrentEvent()` | Verknüpft Präsentationsereignisse mit der Musikabfolge. |
| `playSeasonalFinale()` / `beginFinalLap()` | Startet das saisonale Finale und den Final-Lap-Wechsel. |
| `beginWinnerSequence()` | Startet Finish to go und die Finish-Sequenz. |
| `handleSoundCloudFinish()` | Plant den Winning Run nach Ende von Finish to go. |
| `stopMusic()` / `resetMusicSequence()` | Stoppt Audio, Timer und Musikzustand. |
| `applyPresentationTrackTheme()` / `resetPresentationTrackTheme()` | Setzt bzw. entfernt F-Zero-GX-Hintergrundthemen. |
| `startFireField()` / `setFireFieldFinalLap()` / `stopFireField()` | Steuert die Fire-Field-Feuerstreifen. |
| `handleAction()` | Zentrale Verarbeitung der über `data-action` ausgelösten Aktionen. |

## 12. Debugging und Leistungstests

Die folgenden Funktionen sind für Tests über die Browser-Entwicklerkonsole vorgesehen. Sie sind keine normalen Bedienelemente für eine laufende Show.

### 12.1 Fast-Forward-Modus

Öffne zunächst eine Live-Präsentation und die Browser-Entwicklerkonsole. Danach kann der Konsolenmodus gestartet werden:

```js
debugFastForward();
```

Zum Beenden:

```js
debugFastForwardStop();
```

Der Fast-Forward-Modus reduziert Präsentationswartezeiten auf ungefähr 16 Millisekunden. Präsentationsanimationen und die Musik werden übersprungen. Die Jury- und Televote-Ereignisse werden weiterhin in der vorgesehenen Reihenfolge verarbeitet; die tatsächlichen Punkte und die Gewinnerlogik bleiben erhalten.

Muss bei einem Gleichstand ein Gastgeber manuell ausgewählt werden, hält der Testmodus an dieser Stelle an. Nach der Auswahl kann er fortfahren. Der Modus ist für schnelle Ablauf- und Logiktests gedacht und ersetzt keinen normalen Browserdurchlauf.

### 12.2 FPS-Benchmark

Der integrierte FPS-Benchmark kann unabhängig von einer Show über die Konsole gestartet werden:

```js
startFPSBenchmark();
```

Zum Stoppen:

```js
stopFPSBenchmark();
```

Der Benchmark zählt `requestAnimationFrame`-Aufrufe und gibt ungefähr einmal pro Sekunde die gemessenen FPS in der Konsole aus. Er misst die tatsächlich erreichte Bildrate des Browserfensters, nicht ausschließlich die Rechenzeit einer bestimmten WorldVision-Funktion.

### 12.3 Musik-Diagnose

`MUSIC_DEBUG` ist im geprüften v3.16-Quellstand auf `true` gesetzt. Dadurch werden zusätzliche Meldungen zur Musikauswahl, zu Playerwechseln und zu Audioübergängen in die Browserkonsole geschrieben. Bei der Fehlersuche sollten diese Meldungen zusammen mit möglichen SoundCloud-, Netzwerk- und Autoplay-Fehlern betrachtet werden.

## 13. Änderungen sicher entwickeln und testen

WorldVision Studio enthält voneinander abhängige Bereiche: Punkteberechnung, Präsentationsereignisse, Animationen, Audioübergänge und Speicherung. Eine Änderung in einem Bereich kann daher an anderer Stelle sichtbar werden.

### 13.1 Grundregeln

1. **Vor jeder Änderung eine Kopie erstellen.** Die letzte funktionierende Version sollte unangetastet bleiben.
2. **Eine Änderung nach der anderen durchführen.** So lässt sich ein Fehler leichter auf die zuletzt geänderte Stelle eingrenzen.
3. **Die Trennung der Dateien respektieren.** Struktur gehört in `index.html`, Darstellung in `style.css`, Verhalten und Berechnungen in `script.js`.
4. **Timer nicht pauschal verändern.** Es gibt getrennte Wartezeiten für Folien, Punktanimationen, Musik-Fades, Audio-Callbacks und Spezialeffekte.
5. **Audio ist asynchron.** SoundCloud-Player können verzögert bereit sein oder von Browser-Autoplay-Regeln blockiert werden. Lade- und Wiedergabestatus müssen bei Änderungen berücksichtigt werden.
6. **Datenänderungen mit Backup testen.** Besonders Änderungen an Punkteverteilungen, IDs oder Import-/Exportformaten können bestehende Shows betreffen.
7. **Syntaxprüfung ist kein Live-Test.** Ein fehlerfreier Syntaxcheck belegt nicht, dass ein kompletter Show-Ablauf oder die Audiowiedergabe im Browser fehlerfrei funktionieren.
8. **Nur tatsächlich getestete Funktionen als getestet dokumentieren.** Ein erfolgreicher Teiltest ersetzt keine vollständige Generalprobe.

### 13.2 Empfohlene Testfolge

- `index.html` öffnen und prüfen, ob alle fünf Verwaltungsbereiche angezeigt werden.
- Eine Testshow mit mindestens zwei Teilnehmern erstellen.
- Teilnehmer hinzufügen, bearbeiten, entfernen und nach Running Order sortieren.
- Eine Jury manuell anlegen, Teilnehmer als Jurys kopieren, Jurys verschieben und mischen.
- Vollständige und unvollständige Jurys testen.
- Selbstbewertung einmal erlauben und einmal ausschließen.
- Classic-, Top-5-, F-Zero-GX- und eigene Punkteverteilungen testen.
- Beim Wechsel der Punkteverteilung prüfen, ob die Bestätigungsabfrage bei vorhandenen Jury-Zuordnungen korrekt erscheint.
- Televote mit positiven Werten testen, deaktivieren und wieder aktivieren.
- Beide Ansagereihenfolgen des Televote testen.
- JSON-Backup exportieren und in einer Testumgebung importieren; prüfen, ob die vorhandenen Shows erhalten bleiben und importierte Shows neue IDs erhalten.
- Präsentation einmal manuell und einmal automatisch durchlaufen.
- Vor- und Zurücknavigation, Pause, Geschwindigkeit, Reset und Schließen testen.
- Punktanimationen, Ranglistenwechsel, automatisches Scrollen und Sprintstrecke mit mehreren Punkteständen prüfen.
- Mehrere Gleichstände testen, insbesondere große Gruppen mit horizontal engem Flaggenabstand.
- Gastgeberentscheidung ohne Gleichstand, mit Televote-Tie-Breaker, mit Jury-Tie-Breaker und mit manueller Auswahl testen.
- Musik vollständig deaktiviert testen und sicherstellen, dass keine Audiodatei abgespielt wird.
- Musik aktiviert testen: U-Rays, Long Course Pre-View, reguläre Titel, Übergänge, saisonales Finale, Final Lap, Finish to go und Winning Run.
- Lokale MP3-Dateien bei vorhandener und fehlender Datei prüfen.
- Fire-Field- und Phantom-Road-Effekte prüfen.
- Präsentation schließen und erneut starten; kontrollieren, ob Timer, Animationen und Musikzustände sauber zurückgesetzt werden.
- Fast-Forward- und FPS-Benchmark getrennt testen.

## 14. Bekannte Hinweise zum Versionsstand

- **v3.16 verwendet eine aufgeteilte Dateistruktur.** Eine alte README, die sich auf eine einzelne `WorldVision_Studio_v3.13.html` bezieht, beschreibt nicht mehr den aktuellen Start- und Dateiaufbau.
- **Lokale Soundeffekte sind separate Dateien.** Der Ordner `F-Zero GX - SFX` ist im Anwendungs-Quellpaket nicht enthalten und muss für diese Effekte separat bereitgestellt werden.
- **Externe Medien bleiben netzwerkabhängig.** SoundCloud, Internet Archive und FlagCDN können unabhängig von der lokalen Anwendung zeitweise nicht erreichbar sein.
- **Browser-Autoplay ist nicht garantiert.** Insbesondere die Einstiegs-Musik kann eine erste Benutzerinteraktion erfordern.
- **Ein vollständiger Live-Show-Durchlauf ist durch Syntax- und Einzeltests nicht ersetzt.** Vor einer echten Veranstaltung sollte eine vollständige Generalprobe im Zielbrowser stattfinden.
- **Gastgeberfreigabe und Winning Run sollten gemeinsam getestet werden.** Die Gastgeberbekanntgabe ist im Musikablauf an den tatsächlichen Start des Winning Run gekoppelt. Lade- oder Autoplay-Probleme können deshalb die Freigabe dieses Präsentationsschritts beeinflussen.

---

## Abschließender Hinweis

Diese README ist sowohl als Benutzerhandbuch als auch als Einstieg in den Quellcode gedacht. Sie beschreibt WorldVision Studio v3.16 und die aufgeteilte Projektstruktur. Bei einer späteren Version sollte sie erneut mit den tatsächlichen Dateien `index.html`, `style.css` und `script.js` abgeglichen werden.
