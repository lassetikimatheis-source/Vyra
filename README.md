# VYRA Software Studio

Deutschsprachige Website für individuelle Softwareentwicklung: Prozessanalyse, Konzeption, Entwicklung und Einführung. HTML, CSS und JavaScript; Nodemailer ausschließlich für das serverseitige Kontaktformular.

## Lokal und Build

- Node.js 20 oder neuer; Production ist auf Node 24 eingestellt.
- `npm run dev`: lokale Vorschau auf Port 3000.
- `npm run check`: Syntax der vorhandenen Skripte; neue Skripte zusätzlich mit `node --check studio.js` und `node --check clients.js` prüfen.
- `npm test`: bestehende Kontakt-Tests.
- `npm run build`: statische Dateien nach `dist/`, Vercel baut die Funktionen aus `api/` separat.

## Seiten

Startseite `/`, Leistungen `/leistungen`, Referenzen `/projekte`, Vesta `/projekte/vesta`, Bauklar `/projekte/bauklar`, Über VYRA `/ueber-uns`, Kontakt `/kontakt` sowie Impressum, Website-Datenschutz und Cookie-Informationen. Frühere Produkt- und Rhythm-Marketing-URLs leiten auf das neue Angebot um. Bestehende App-Rechtstexte und Apple-Verifikation sind davon unabhängig.

## Kontaktformular und Freischaltung

`/kontakt` verwendet `/api/contact` als Vercel-Node-Funktion, Nodemailer und ausschließlich das vom Betreiber gewählte IONOS-Postfach. Sender und Empfänger sind fest `info@vyra.solutions`; Antworten gehen an die validierte Besucheradresse. Kein Datei-Upload, keine Nachrichtendatenbank, keine Protokollierung der Formulardaten. Origin-Prüfung, Größenlimits und Honeypot reduzieren Missbrauch; sie ersetzen keine mengenbasierte Firewall-Regel bei erhöhtem Spamaufkommen.

**Konfiguration (25.10.2026):** Der Betreiber hat die Existenz und Erreichbarkeit von info@vyra.solutions bestätigt. `IONOS_SMTP_PASSWORD` ist als sensitive Variable für Production vorhanden; ihr Wert wurde vom Agenten nicht ausgelesen. Der IONOS-Versand wird mit einem neuen Production-Deployment aktiviert. Es wird kein zusätzlicher Versanddienst benötigt. Niemals das Passwort ins Repository oder in den Chat schreiben. Ohne Passwort liefert die API HTTP 503 und das Formular bleibt gesperrt. Live-Test am 25.10.2026: Genau eine als technischer Funktionstest gekennzeichnete Nachricht wurde über die öffentliche Kontaktseite an info@vyra.solutions gesendet. Der IONOS-Mailserver hat sie zur Zustellung angenommen. Das Formular hat anschließend die Eingaben zurückgesetzt. Der tatsächliche Eingang im Postfach ist durch den Betreiber zu bestätigen. Im Fehler-Logscan der Bereitstellung für die letzten zehn Minuten wurden keine Einträge gefunden.

Hosting über Vercel: geltenden AVV und Übermittlungsgrundlage prüfen. IONOS: nach Anbieterinformation ist die AVV bei Neuverträgen seit 19.07.2022 Teil der AGB; beim eigenen Vertrag kontrollieren. Die Datenschutzerklärung behauptet keinen bestätigten Vertragsabschluss.

`npm test` prüft Validierung, Origin, Größenlimit, festen Empfänger und Fehlerfälle mit einer isolierten SMTP-Test-Doppelung. Dies ist kein Live-Versandtest. Lokal zeigt der statische Server nur die Verfügbarkeit; POST wird ausschließlich auf Vercel ausgeführt. Der Live-Formulartest bis zur SMTP-Annahme ist abgeschlossen; der Eingang im Postfach kann vom Agenten nicht geprüft werden.

Keine optionalen Cookies oder Speicherzugriffe im Website-Code. `/cookies` informiert über den Stand; ein Zustimmungsbanner ist bei diesem Funktionsumfang nicht vorgesehen. App-Datenschutz ist gesondert zu erstellen.

## VYRA Software Studio – 26.11.2026

Die öffentliche Marketingwebsite wurde auf individuelle Softwareentwicklung von der Prozessanalyse bis zur Einführung ausgerichtet. `studio.css` und `studio.js` sind unabhängig vom früheren Rhythm-Layout. Leistungen, Projekte (Vesta für Claus R. Menges und Bauklar für Paribus), Über VYRA und das vorhandene Kontaktformular bilden den neuen Auftritt. Kunden und die Zuordnung zu den offiziellen Websites wurden vom Betreiber bestätigt. Bauklar ist der für dieses Projekt gewählte Name. Projektgrafiken sind ausdrücklich Visualisierungen, keine tatsächlichen Produkt-Screenshots. Keine Leistungskennzahlen, Kundenstimmen oder Hackathon-Auszeichnungen wurden erfunden.

### Weitere Kundenlogos ergänzen

1. Freigegebenes Original-Logo unter `assets/clients/` speichern.
2. In `clients.js` einen Eintrag mit `name` und `logo` ergänzen; `project` (interne Projektseite) oder `website` (Kunden-Website) sind optional.
3. Bauen und veröffentlichen. Beide Ticker-Gruppen werden automatisch erstellt. Die Bewegung läuft von links nach rechts, lässt sich pausieren und wird bei reduzierter Bewegung deaktiviert.

Originalquellen: Menges https://www.cr-menges.de/wp-content/uploads/2026/05/cr-menges-immobilienmakler-giessen-2.webp ; Paribus SVG aus dem Header von https://www.paribus.de/ . Die Marken bleiben Eigentum der jeweiligen Rechteinhaber. Verwendung als Kundenreferenz entsprechend Betreiberauftrag.

Architekturmotiv: Leonhard Niederwimmer, https://unsplash.com/photos/a-view-of-a-city-with-tall-buildings-jMBCVbsgquU ; kostenlose Unsplash License https://unsplash.com/license ; geprüft am 26.11.2026, lokal ausgeliefert. Es handelt sich um ein Stockmotiv, kein Foto eines VYRA-Büros. Vorlage für die visuelle Richtung war pencilrec.de; Texte, Code, Projektdarstellungen und Bildmotiv wurden eigenständig umgesetzt. Keine Produkte, Hackathon- oder Pressebelege der Referenz wurden übernommen.

Bestehende Rhythm-Marketing-URLs leiten zu den neuen Leistungen/Projekten weiter. `/app/` und die separat vorhandene Arbeit am Apple-Verifier werden nicht verändert. Vorbestehende uncommittete Änderungen an package.json und package-lock.json gehören nicht zu dieser Umstellung.

### Farbe und Bewegung

Korall, Mint und Blau ergänzen den dunklen Auftritt. Inhalte werden beim Scrollen eingeblendet; Projektvisualisierungen haben dezente Bewegung. Bei reduzierter Bewegung entfallen diese Animationen. Das lokal gehostete Frankfurt-Video von Masood Aslami / Pexels (https://www.pexels.com/video/aerial-view-of-the-skyline-19236196/, https://www.pexels.com/license/) läuft ohne Ton, lässt sich pausieren und stoppt außerhalb des sichtbaren Bereichs. Bei reduzierter Bewegung oder aktiviertem Datensparmodus startet und lädt es erst nach bewusster Betätigung. Ein aus dem Skyline-Clip abgeleitetes Vorschaubild bleibt als Fallback sichtbar. Die optimierte 1080p-Datei benötigt rund 3,2 MB; kein externer Player, keine Video-Cookies.

### Skyline, Projektmotive und Prozesslinie

Der frühere Überflug wurde durch eine Aufnahme der Skyline vom Main aus ersetzt. Das Layout ist näher an der Pencilrec-Referenz: dunkle Flächen, helle Typografie, große Bildflächen und limettengrüne Akzente. Die geschwungene vertikale Prozesslinie folgt dem Scrollfortschritt; vier Meilensteine werden beim Erreichen hervorgehoben. Bei reduzierter Bewegung wird die vollständige Linie ohne Animation angezeigt. Vesta und Bauklar verwenden lokal gespeicherte KI-generierte Bereichsmotive, ausdrücklich als solche gekennzeichnet; keine realen Kundenobjekte oder erfundenen Produktoberflächen. Original-Prompts und Speicherpfade stehen in assets/projects/generation-notes.txt.

### Produkte und Seitentiefe

VYRA Rhythm ist als eigenes VYRA-Produkt wieder integriert, getrennt von Kundenreferenzen. /produkte bietet den Einstieg; /rhythm führt zu /rhythm/balance, /rhythm/training und /rhythm/challenges. Die Hauptnavigation führt zu eigenständigen Leistungs-, Prozess-, Projekt- und Produktseiten. /prozess erklärt die Zusammenarbeit mit Scrolllinie; Projektseiten verlinken verwandte Projekte und Leistungen. Die App-Visualisierung ist eine ausdrücklich illustrative Funktionsübersicht ohne erfundene Gesundheitswerte. Der vom Betreiber bestätigte TestFlight-Link bleibt erhalten, ohne öffentliche App-Store-Verfügbarkeit zu behaupten. Keine Änderungen an Apple-Verifikation oder bestehenden unveröffentlichten App-Rechtstexten.
