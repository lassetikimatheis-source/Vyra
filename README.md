# VYRA Rhythm

Deutschsprachige Produktwebsite auf bestehender HTML/CSS/JavaScript-Grundlage, mit Nodemailer ausschließlich für den serverseitigen Formularversand.

## Lokal

Node.js 20 oder neuer.

- `npm run dev` – Vorschau unter http://localhost:3000
- `npm run check` – JavaScript-Syntax prüfen
- `npm run build` – statische Website in `dist/`

## Redaktion und Produktbilder

Bestätigter Beta-Link in `site-config.js`: https://testflight.apple.com/join/gQx4gKFY.

Die Produktdarstellungen stammen aus dem vom Betreiber gelieferten Website-Mockup. Die Website verwendet CSS-Bildausschnitte des komprimierten Originalmotivs in `assets/rhythm-product-reference.jpg`; es werden keine App-Oberflächen nachgebaut. Die Bilder sind als Produktvisualisierung / Designstand gekennzeichnet. Die Community-Darstellung verwendet ausschließlich die Challenge-Ansicht, keinen unbestätigten Social Feed.

Alle Eyebrow-Zeilen und leeren Screenshot-Platzhalter wurden entfernt. Website-Metriken bleiben als Beispieldaten gekennzeichnet. Die App wird als TestFlight-Beta präsentiert, nicht als bestätigte öffentliche App-Store-Version.

Impressum und Website-Datenschutzerklärung wurden anhand der Betreiberangaben ergänzt. Die Gewerbeanmeldung steht noch aus. Eine anwaltliche Prüfung und die Prüfung der tatsächlich geltenden Auftragsverarbeitungsverträge bleiben offen.

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
- Keine Analytics, externen Schriftarten oder externen Bildquellen voreingestellt

## Vercel

Repository importieren. Framework: Other. Build: `npm run build`. Output: `dist`. Die Einstellungen sind in `vercel.json` hinterlegt. GitHub-Remote und Vercel-Anmeldung müssen für die Veröffentlichung verbunden sein.

## Kontaktformular und Freischaltung

`/kontakt` verwendet `/api/contact` als Vercel-Node-Funktion, Nodemailer und ausschließlich das vom Betreiber gewählte IONOS-Postfach. Sender und Empfänger sind fest `info@vyra.solutions`; Antworten gehen an die validierte Besucheradresse. Kein Datei-Upload, keine Nachrichtendatenbank, keine Protokollierung der Formulardaten. Origin-Prüfung, Größenlimits und Honeypot reduzieren Missbrauch; sie ersetzen keine mengenbasierte Firewall-Regel bei erhöhtem Spamaufkommen.

**Konfiguration (25.10.2026):** Der Betreiber hat die Existenz und Erreichbarkeit von info@vyra.solutions bestätigt. `IONOS_SMTP_PASSWORD` ist als sensitive Variable für Production vorhanden; ihr Wert wurde vom Agenten nicht ausgelesen. Der IONOS-Versand wird mit einem neuen Production-Deployment aktiviert. Es wird kein zusätzlicher Versanddienst benötigt. Niemals das Passwort ins Repository oder in den Chat schreiben. Ohne Passwort liefert die API HTTP 503 und das Formular bleibt gesperrt. Keine Zustellung wurde bisher durchgeführt oder bestätigt.

Hosting über Vercel: geltenden AVV und Übermittlungsgrundlage prüfen. IONOS: nach Anbieterinformation ist die AVV bei Neuverträgen seit 19.07.2022 Teil der AGB; beim eigenen Vertrag kontrollieren. Die Datenschutzerklärung behauptet keinen bestätigten Vertragsabschluss.

`npm test` prüft Validierung, Origin, Größenlimit, festen Empfänger und Fehlerfälle mit einer isolierten SMTP-Test-Doppelung. Dies ist kein Live-Versandtest. Lokal zeigt der statische Server nur die Verfügbarkeit; POST wird ausschließlich auf Vercel ausgeführt. Vor Freigabe muss genau ein Ende-zu-Ende-Test mit dem echten Postfach erfolgreich sein. Ohne aktiven elektronischen Kontakt ist die Website noch nicht als vollständig veröffentlichungsreif zu bewerten.

Keine optionalen Cookies oder Speicherzugriffe im Website-Code. `/cookies` informiert über den Stand; ein Zustimmungsbanner ist bei diesem Funktionsumfang nicht vorgesehen. App-Datenschutz ist gesondert zu erstellen.
