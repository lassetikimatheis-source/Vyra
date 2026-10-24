# VYRA Rhythm

Deutschsprachige Produktwebsite auf bestehender HTML/CSS/JavaScript-Grundlage, ohne zusätzliche Pakete.

## Lokal

Node.js 20 oder neuer.

- `npm run dev` – Vorschau unter http://localhost:3000
- `npm run check` – JavaScript-Syntax prüfen
- `npm run build` – statische Website in `dist/`

## Redaktion und echte Screenshots

Zentrale Konfiguration: `site-config.js`.

Der vom Betreiber bestätigte Beta-Link ist https://testflight.apple.com/join/gQx4gKFY. Die Zielseite wurde im Browser als „VYRA Rhythm-Beta“ geprüft. Eine öffentliche App-Store-Verfügbarkeit wird nicht behauptet.

Die vier Screenshot-Einträge stehen bewusst auf `null`. Originaldateien in `assets/screenshots/` ablegen und die entsprechenden lokalen Pfade in der Konfiguration eintragen:

- `dashboard`: Dashboard mit Tagesbalance, Gesundheitsbereichen, Training und aktiver Challenge
- `challenges`: Challenge-Übersicht
- `activity`: Aktivitätsübersicht
- `training`: Wochenplanung / Trainingsplan

Die Bildplätze zeigen keine nachgebauten oder generierten App-Oberflächen. Ein fehlgeschlagenes Bild behält seinen sichtbaren Platzhalter. Original-Screenshots werden mit Alt-Text, festen Bildmaßen und Lazy Loading außerhalb des Einstiegs eingebunden. Vorhandene Namen und Gesundheitsdaten in gelieferten Screenshots vor Veröffentlichung prüfen.

Die Gesundheitskacheln sind eigenständige Website-Illustrationen mit sichtbar gekennzeichneten Beispieldaten. Der Community-Bereich beschreibt die bestätigten Challenge-Funktionen. Kein Social Feed und keine Freundschaftsanfragen werden beworben.

Impressum und Datenschutzerklärung wurden beim Redesign inhaltlich unverändert erhalten. Beide Seiten enthalten weiterhin die vom Betreiber noch zu ergänzenden rechtlichen Platzhalter.

## Interaktion

- Sticky Navigation mit mobilem Menü, aktivem Abschnitt und Scroll-Fortschritt
- IntersectionObserver-Reveals und animierte Beispielringe
- Dezente, über requestAnimationFrame gebündelte Parallax auf Desktop
- Kurz haftende Tracking-Produktansicht auf großen Bildschirmen
- Native, per Tastatur bedienbare Dialoge, sieben Challenge-Optionen und Trainings-Tabs mit Pfeiltasten
- Bei `prefers-reduced-motion` keine Scroll-Animationen und keine Parallax
- Keine Analytics, externen Schriftarten, Formulare oder externen Bildquellen voreingestellt

## Vercel

Repository importieren. Framework: Other. Build: `npm run build`. Output: `dist`. Die Einstellungen sind in `vercel.json` hinterlegt. GitHub-Remote und Vercel-Anmeldung müssen für die Veröffentlichung verbunden sein.
