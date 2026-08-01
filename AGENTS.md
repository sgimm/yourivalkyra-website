# Arbeitsregeln für die Youri-Valkyra-Website

Diese Regeln sind bei jeder Änderung am Repository verbindlich.

## Git- und PR-Ablauf

### Vor jeder Änderung

1. Prüfen, ob ein vorheriger PR bereits gemergt wurde.
2. Zum lokalen `main` wechseln.
3. Den aktuellen Stand von `origin/main` abrufen und `main` ausschließlich per Fast-forward aktualisieren.
4. Kontrollieren, dass das Arbeitsverzeichnis sauber ist.
5. Vom aktualisierten `main` einen neuen, aussagekräftig benannten Branch erstellen.

### Während der Bearbeitung

- Keine Änderungen aus alten, bereits gemergten oder gelöschten Branches übernehmen.
- Nur Dateien verändern, die für die beauftragte Änderung erforderlich sind.
- Bestehende Inhalte und Komponenten nicht aus älteren lokalen Versionen wiederherstellen.
- Gestaltung und Funktionsweise angrenzender Bereiche berücksichtigen.
- Gemeinsam verwendete CSS- und JavaScript-Regeln nicht isoliert ändern, ohne alle betroffenen Seiten und Komponenten zu prüfen.
- Unbenutztes CSS oder JavaScript nur entfernen, wenn die Auswirkungen geprüft wurden.

### Vor dem Push

1. Den vollständigen Branch-Diff gegen `origin/main` prüfen.
2. Kontrollieren, ob ausschließlich die beauftragten Änderungen enthalten sind.
3. Nach alten oder unerwünschten Formulierungen suchen, die wieder hineingeraten sein könnten.
4. Die Website bauen.
5. Betroffene Bereiche auf Desktop und Mobilgeräten prüfen.
6. Navigation, Links und betroffene interaktive Komponenten testen.

### Nach dem Push

1. Den tatsächlichen Remote-Branch erneut gegen `main` prüfen.
2. Sicherstellen, dass der Remote-Stand die beschriebenen Änderungen wirklich enthält.
3. Erst danach einen PR öffnen oder seine Fertigstellung melden.
4. Den vollständigen PR-Diff prüfen, nicht nur einzelne Dateien oder den lokalen Stand.
5. In der Rückmeldung nur Änderungen nennen, die im Remote-Diff nachweisbar vorhanden sind.

### Nach einem Merge

1. Nicht weiter am gemergten PR oder gelöschten Branch arbeiten.
2. Lokalen `main` erneut aktualisieren.
3. Den alten lokalen Branch löschen.
4. Für jede weitere Änderung einen neuen Branch erstellen.

## Schutz vor unbeabsichtigten Regressionen

- Keine vollständigen Dateien durch ältere lokale Fassungen ersetzen.
- Bei Änderungen an gemeinsam verwendeten CSS-Regeln alle betroffenen Seiten prüfen.
- Wiederkehrende Komponenten wie Carousels müssen einheitlich funktionieren.
- Statusinformationen und Bedienelemente klar voneinander trennen.
- Desktop, Mobilansicht, Tastaturbedienung und Barrierefreiheit mitdenken.
- Redundante Bedienelemente und doppelte Navigationsziele vermeiden.
- Neue UI-Elemente auf sinnvolle Position, Größe, Zustände und Bedienbarkeit prüfen, nicht nur auf technische Funktion.

## Inhaltliche Grundregeln

- Youri wird nicht als „virtual musician“, „virtual artist“ oder „idol“ bezeichnet.
- Neue Texte müssen zum bestehenden Kanon und zum bisherigen Ton der Website passen.
- Bestehende Texte dürfen nicht ungefragt durch frühere Fassungen ersetzt werden.
- Bei Unsicherheit über Kanon oder Formulierung zuerst nachfragen.

## Grundsatz

Eine Änderung gilt erst als abgeschlossen, wenn der aktuelle Remote-Diff geprüft wurde. Der lokale Arbeitsstand allein ist kein Nachweis dafür, was sich im PR oder auf `main` befindet.
