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

**Konfiguration (25.10.2026):** Der Betreiber hat die Existenz und Erreichbarkeit von info@vyra.solutions bestätigt. `IONOS_SMTP_PASSWORD` ist als sensitive Variable für Production vorhanden; ihr Wert wurde vom Agenten nicht ausgelesen. Der IONOS-Versand wird mit einem neuen Production-Deployment aktiviert. Es wird kein zusätzlicher Versanddienst benötigt. Niemals das Passwort ins Repository oder in den Chat schreiben. Ohne Passwort liefert die API HTTP 503 und das Formular bleibt gesperrt. Live-Test am 25.10.2026: Genau eine als technischer Funktionstest gekennzeichnete Nachricht wurde über die öffentliche Kontaktseite an info@vyra.solutions gesendet. Der IONOS-Mailserver hat sie zur Zustellung angenommen. Das Formular hat anschließend die Eingaben zurückgesetzt. Der tatsächliche Eingang im Postfach ist durch den Betreiber zu bestätigen. Im Fehler-Logscan der Bereitstellung für die letzten zehn Minuten wurden keine Einträge gefunden.

Hosting über Vercel: geltenden AVV und Übermittlungsgrundlage prüfen. IONOS: nach Anbieterinformation ist die AVV bei Neuverträgen seit 19.07.2022 Teil der AGB; beim eigenen Vertrag kontrollieren. Die Datenschutzerklärung behauptet keinen bestätigten Vertragsabschluss.

`npm test` prüft Validierung, Origin, Größenlimit, festen Empfänger und Fehlerfälle mit einer isolierten SMTP-Test-Doppelung. Dies ist kein Live-Versandtest. Lokal zeigt der statische Server nur die Verfügbarkeit; POST wird ausschließlich auf Vercel ausgeführt. Der Live-Formulartest bis zur SMTP-Annahme ist abgeschlossen; der Eingang im Postfach kann vom Agenten nicht geprüft werden.

Keine optionalen Cookies oder Speicherzugriffe im Website-Code. `/cookies` informiert über den Stand; ein Zustimmungsbanner ist bei diesem Funktionsumfang nicht vorgesehen. App-Datenschutz ist gesondert zu erstellen.

## Markenauftritt und Startseite (25.10.2026)

Verbindlicher App-Name laut Betreiber: **VYRA Rhythm**. Das vom Betreiber gelieferte Original-Logo liegt unverändert unter `assets/vyra-logo-original.jpg` und wird in Navigation und Footer über einen CSS-Bildausschnitt dargestellt. Das Favicon ist eine kleine SVG-Umsetzung des dreiteiligen Blattzeichens. Korall und Nachtblau greifen die Logo-Farben auf.

Die Startseite verwendet ein neues, generiertes redaktionelles Sportmotiv (`assets/vyra-campaign.jpg`, rein illustratives Markenbild, keine Kundin oder Empfehlung). Das Motiv wird lokal ausgeliefert. Die App-Ansicht darunter verwendet weiterhin ausschließlich die vorhandene, als Designstand gekennzeichnete Produktvisualisierung. Die Startseite führt über eigenständige redaktionelle Abschnitte zu den bestehenden Unterseiten. Keine neuen App-Funktionen, Preise oder Wirkungsversprechen wurden hinzugefügt.
