# VYRA Rhythm

Deutschsprachige Produktwebsite auf bestehender HTML/CSS/JavaScript-Grundlage, ohne zusätzliche Pakete.

## Lokal

Node.js 20 oder neuer.

- `npm run dev` – Vorschau unter http://localhost:3000
- `npm run check` – JavaScript-Syntax prüfen
- `npm run build` – statische Website in `dist/`

## Redaktion und Produktbilder

Bestätigter Beta-Link in `site-config.js`: https://testflight.apple.com/join/gQx4gKFY.

Die Produktdarstellungen stammen aus dem vom Betreiber gelieferten Website-Mockup. Die Website verwendet CSS-Bildausschnitte des komprimierten Originalmotivs in `assets/rhythm-product-reference.jpg`; es werden keine App-Oberflächen nachgebaut. Die Bilder sind als Produktvisualisierung / Designstand gekennzeichnet. Die Community-Darstellung verwendet ausschließlich die Challenge-Ansicht, keinen unbestätigten Social Feed.

Alle Eyebrow-Zeilen und leeren Screenshot-Platzhalter wurden entfernt. Website-Metriken bleiben als Beispieldaten gekennzeichnet. Die App wird als TestFlight-Beta präsentiert, nicht als bestätigte öffentliche App-Store-Version.

Impressum und Datenschutzerklärung enthalten weiterhin die vom Betreiber angekündigten, noch zu ergänzenden Anbieterangaben bzw. Rechtstexte. Diese Inhalte dürfen nicht erfunden werden.

## Seitenstruktur

Die Startseite dient als Einstieg. Unter `pages/` liegen eigenständige HTML-Seiten für `/tracking`, `/training`, `/challenges`, `/ueber-vyra` und `/faq` sowie sieben Challenge-Detailseiten unter `/challenges/<name>`. `build.mjs` kopiert diese Verzeichnisse nach `dist/`; direkte Aufrufe funktionieren ohne clientseitiges Routing.

`depth.js` enthält Perspektivbewegungen, Lichtverfolgung und die Bedienung des Entdecken-Menüs. CSS ergänzt animierte räumliche Ringe, Hover-Effekte und progressive View Transitions. `prefers-reduced-motion` deaktiviert Bewegungen; Texte und Navigation bleiben ohne Animation nutzbar. Touch-Geräte erhalten keine Maus-Tilt-Effekte.

## Interaktion

- Sticky Navigation mit mobilem Menü, aktivem Abschnitt und Scroll-Fortschritt
- Animierte Beispielringe; ruhiger Seitenaufbau ohne wiederholte Produktfolien
- Durchgehend lesbare Inhalte, räumliche Ebenen und deaktivierbare Animationen
- Echte Unterseiten und sieben eigenständige Challenge-Detailseiten
- Native, per Tastatur bedienbare Dialoge, sieben Challenge-Optionen und Trainings-Tabs mit Pfeiltasten
- Bei `prefers-reduced-motion` keine Scroll-Animationen und keine Parallax
- Keine Analytics, externen Schriftarten, Formulare oder externen Bildquellen voreingestellt

## Vercel

Repository importieren. Framework: Other. Build: `npm run build`. Output: `dist`. Die Einstellungen sind in `vercel.json` hinterlegt. GitHub-Remote und Vercel-Anmeldung müssen für die Veröffentlichung verbunden sein.
