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
3. Bauen und veröffentlichen. Die Logos erscheinen einmalig in einer statischen, auf kleinen Displays umbrechenden Reihe.

Originalquellen: Menges https://www.cr-menges.de/wp-content/uploads/2026/05/cr-menges-immobilienmakler-giessen-2.webp ; Paribus SVG aus dem Header von https://www.paribus.de/ . Die Marken bleiben Eigentum der jeweiligen Rechteinhaber. Verwendung als Kundenreferenz entsprechend Betreiberauftrag.

Architekturmotiv: Leonhard Niederwimmer, https://unsplash.com/photos/a-view-of-a-city-with-tall-buildings-jMBCVbsgquU ; kostenlose Unsplash License https://unsplash.com/license ; geprüft am 26.11.2026, lokal ausgeliefert. Es handelt sich um ein Stockmotiv, kein Foto eines VYRA-Büros. Vorlage für die visuelle Richtung war pencilrec.de; Texte, Code, Projektdarstellungen und Bildmotiv wurden eigenständig umgesetzt. Keine Produkte, Hackathon- oder Pressebelege der Referenz wurden übernommen.

Bestehende Rhythm-Marketing-URLs leiten zu den neuen Leistungen/Projekten weiter. `/app/` und die separat vorhandene Arbeit am Apple-Verifier werden nicht verändert. Vorbestehende uncommittete Änderungen an package.json und package-lock.json gehören nicht zu dieser Umstellung.

### Farbe und Bewegung

Korall, Mint und Blau ergänzen den dunklen Auftritt. Inhalte werden beim Scrollen eingeblendet; Projektvisualisierungen haben dezente Bewegung. Bei reduzierter Bewegung entfallen diese Animationen. Das lokal gehostete Frankfurt-Video von Masood Aslami / Pexels (https://www.pexels.com/video/aerial-view-of-the-skyline-19236196/, https://www.pexels.com/license/) läuft ohne Ton, lässt sich pausieren und stoppt außerhalb des sichtbaren Bereichs. Bei reduzierter Bewegung oder aktiviertem Datensparmodus startet und lädt es erst nach bewusster Betätigung. Ein aus dem Skyline-Clip abgeleitetes Vorschaubild bleibt als Fallback sichtbar. Die optimierte 1080p-Datei benötigt rund 3,2 MB; kein externer Player, keine Video-Cookies.

### Skyline, Projektmotive und Prozesslinie

Der frühere Überflug wurde durch eine Aufnahme der Skyline vom Main aus ersetzt. Das Layout ist näher an der Pencilrec-Referenz: dunkle Flächen, helle Typografie, große Bildflächen und limettengrüne Akzente. Die geschwungene vertikale Prozesslinie folgt dem Scrollfortschritt; vier Meilensteine werden beim Erreichen hervorgehoben. Bei reduzierter Bewegung wird die vollständige Linie ohne Animation angezeigt. Vesta und Bauklar verwenden lokal gespeicherte KI-generierte Bereichsmotive, ausdrücklich als solche gekennzeichnet; keine realen Kundenobjekte oder erfundenen Produktoberflächen. Original-Prompts und Speicherpfade stehen in assets/projects/generation-notes.txt.

### Produkte und Seitentiefe

VYRA Rhythm ist als eigenes VYRA-Produkt wieder integriert, getrennt von Kundenreferenzen. /produkte bietet den Einstieg; /rhythm führt zu /rhythm/balance, /rhythm/training und /rhythm/challenges. Die Hauptnavigation führt zu eigenständigen Leistungs-, Prozess-, Projekt- und Produktseiten. /prozess erklärt die Zusammenarbeit mit Scrolllinie; Projektseiten verlinken verwandte Projekte und Leistungen. Die App-Visualisierung ist eine ausdrücklich illustrative Funktionsübersicht ohne erfundene Gesundheitswerte. Der vom Betreiber bestätigte TestFlight-Link bleibt erhalten, ohne öffentliche App-Store-Verfügbarkeit zu behaupten. Keine Änderungen an Apple-Verifikation oder bestehenden unveröffentlichten App-Rechtstexten.

### Bildschirm-Mockups und ursprüngliche Markenfarben

Die aktuell sichtbaren Architektur- und Baustellenbilder wurden durch direkt in HTML/CSS gestaltete Monitor-Mockups ersetzt. Klare Typografie, Beispieltabellen und schematische Diagramme machen den Softwarebezug sichtbar. Sie sind ausdrücklich konzeptionelle Bildschirmdarstellungen mit Beispieldaten, keine tatsächlichen Kundenoberflächen oder Feature-Nachweise. Frühere KI-Fotomotive werden nicht mehr eingebunden. Korall, Mint und Blau ersetzen die limettengrünen Akzente; der dunkle Hintergrund entspricht wieder der vorherigen Marine-Palette.

### Ruhigere Video-Schleife

Die Startseite verwendet vyra-skyline-calm.mp4: halbe Bewegungsgeschwindigkeit, 30fps mit Bewegungsinterpolation und eine Vorwärts-/Rückwärts-Schleife von rund 41 Sekunden statt des zehnsekündigen Clips mit hartem Neustart. Die Auflösung von 1600x900 und ein Bitratenlimit von 1,6 Mbit/s reduzieren Übertragung und Dekodieraufwand. Die Langsamkeit ist in die Datei eingerechnet; keine ruckelnde JavaScript-Zeitsteuerung. Motion- und Datenspareinstellungen sowie die Pause-Funktion bleiben erhalten.

### Produktliste und feste Referenzlogos

Vesta, Bauklar und VYRA Rhythm stehen als Produktkarten auf der Startseite und unter /produkte. Die Kategorie „eigenes Projekt“ entfällt. Kundenlogos werden einmalig statisch aus clients.js erzeugt, ohne Animation oder doppelte Gruppen. „Deine Software.“ im Einstieg ist in VYRA-Korallpink gesetzt. Vom Betreiber ausdrücklich ausgewählte Pencilrec-Motive ersetzen die Bildschirm-Mockups als gekennzeichnete Symbolbilder; sie sind keine Originalaufnahmen der VYRA-Produkte. Quellen im Impressum und studio-sources.txt. Eine öffentliche Wiederverwendungslizenz wurde nicht gefunden oder behauptet.

### Eigenständiger interaktiver Prozess und Rhythm-Vorschau

Die geschwungene Scrolllinie wurde auf Startseite und /prozess durch einen eigenen Prozess-Explorer ersetzt: vier auswählbare Phasen mit Arbeitsweise, konkreten Schritten und Ergebnis. Tastatursteuerung über Pfeiltasten, Home/End und Vor/Zurück; ohne JavaScript bleiben alle Inhalte sichtbar. Bei reduzierter Bewegung entfallen Übergänge. Das vom Betreiber gelieferte Rhythm-Bild steht als Designvorschau auf Produktkarten und App-Seite. Eine native Dialogansicht vergrößert es, schließt per Escape/Schließen und fällt ohne JavaScript auf den Bildlink zurück. Gezeigte Werte, Personen und Funktionen werden ausdrücklich nicht als aktuelle Produktnachweise behauptet.

Als einzelnes Rhythm-Leitmotiv ist die zweite Smartphone-Ansicht „Dein Trainingsplan“ aus der gelieferten Collage ausgewählt. Der Bildausschnitt wird mit CSS pixelgetreu aus dem unveränderten Original gezeigt; keine KI-Neuerzeugung. In der vergrößerbaren Galerie bleibt die gesamte Designvorschau zugänglich.

### Scrollbasierte Projektspur

Der Prozess verwendet wieder eine Linie, jetzt als eigenständige gerade Projektspur mit vier nacheinander erreichbaren Phasen. Die Linie folgt der Scrollposition; rechts bleibt eine Ergebnisanzeige sichtbar und wechselt passend zur erreichten Phase. Alle Inhalte stehen im natürlichen Seitenfluss, ohne Scroll-Sperre. Phasenlinks erlauben direktes Anspringen. Mobil bleibt die Linie mit den Ergebnissen in den Abschnitten erhalten; bei reduzierter Bewegung wird die Spur vollständig dargestellt und sanftes Scrollen deaktiviert.

### Proportionen und Bildschärfe

Das ausgewählte Rhythm-Gerät wird im schlankeren Verhältnis 9:19,5 gezeigt. Der vollständige Bildausschnitt bleibt dabei erhalten; die Darstellung wird auf das Geräteformat angepasst. Das Bauklar-Detailmotiv verwendet die ursprüngliche PNG-Datei, unbeschnitten und auf maximal 540 CSS-Pixel Breite begrenzt (1080 Pixel Originalbreite, passend für 2x-Darstellung). Ein Bildlink öffnet die Originalauflösung. Die natürliche Tiefenunschärfe und der Detailgrad der Vorlage werden dadurch nicht künstlich erweitert.

### Outlook-Terminbuchung

/termin verlinkt den vom Betreiber autorisierten Microsoft-Personal-Bookings-Typ „VYRA · Erstgespräch“ (30 Minuten, Teams). Kalender: Lasse Tiki Matheis – Claus R. Menges GmbH; der Betreiber hat die Verwendung ausdrücklich bestätigt. Der Buchungstyp nutzt bestehende reguläre Besprechungszeiten und den Outlook-Verfügbarkeitsabgleich. Microsoft-Voreinstellungen: mindestens eine Stunde Vorlauf, maximal 90 Tage, 30-Minuten-Raster, kein zusätzlicher Puffer. Die Signatur-Option wurde ausgeschaltet; vorhandene andere Besprechungstypen blieben unverändert. Kein Kalender-Token oder Kennwort liegt im Website-Code. Die Website lädt Bookings erst über einen bewussten externen Link; kein Iframe. Der Buchungslink ist ein öffentlicher, nicht geheimer Besprechungslink. Hauptnavigation, Startseiten-CTA und Kontaktseite führen zur Terminseite. Datenschutzinformationen nennen die tatsächliche Kalenderorganisation.
