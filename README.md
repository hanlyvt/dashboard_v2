# Zwijsen Dashboard – Projectopzet & Structuur

Dit project is een prototype van een digitaal dashboard voor het nakijken en beheren van werkbladen en leerlingresultaten, ontwikkeld voor het Zwijsen-project.

## Projectopzet

Ik ben gestart met het aanmaken van een privé repository op GitHub. Nadat de repository was aangemaakt, heb ik de HTTPS-link gekopieerd en het project lokaal gecloned via een fork. Vervolgens heb ik het project geopend in Visual Studio Code (VSCode) en met het commando `npm i` de benodigde dependencies geïnstalleerd om het project op te zetten.

## Structuur van het Project

### Bestanden en Mappen

- **Layout bestand:**  
  Dit bestand zorgt voor de basisstructuur die over alle pagina’s heen wordt getoond, zoals de navigatie en sidebar. Hierdoor blijft de layout consistent op elke pagina.
- **Page bestand:**  
  Dit is de hoofdpagina (home) van het dashboard. Elke nieuwe pagina (zoals de leerlingenlijst) wordt als aparte map met een eigen `page` bestand toegevoegd.

### Voorbeeld: Nieuwe Pagina Toevoegen

Voor de leerlingenlijst heb ik een nieuwe map aangemaakt en daarin een eigen `page` bestand geplaatst. Zo kun je eenvoudig verschillende onderdelen van het dashboard uitbreiden en overzichtelijk houden.

## Componenten (Versie 1.0)

Het prototype bestaat uit verschillende herbruikbare componenten, die zijn opgeslagen in de `components` map. Enkele belangrijke componenten:

- **Sidebar:**  
  Gemaakt in de componentenmap en aangeroepen in het layout bestand, zodat de sidebar op elke pagina zichtbaar is.
- **Werkbladen Card:**  
  Voor het overzichtelijk tonen van werkbladen.
- **Search Header:**  
  Voor het zoeken/filteren binnen het dashboard.
- **Leerlingen Lijst Interface:**  
  Voor het tonen van alle leerlingen.
- **Dashboardcard (Leerlingen aandacht):**  
  Voor het uitlichten van leerlingen die extra aandacht nodig hebben.
- **Resultaten:**  
  Voor het tonen van de resultaten van leerlingen.

## Installatie & Gebruik

1. Clone deze repository:
git clone https://github.com/hanlyvt/dashboard_v2

2. Installeer de dependencies:
`npm install`

3. Start het project:
`npm run dev`

4. Open het project in je browser via de lokale host die in de terminal wordt weergegeven.

## Overzicht

Deze opzet maakt het eenvoudig om het dashboard uit te breiden met nieuwe pagina’s en componenten. Door de modulaire structuur en het gebruik van een centrale layout blijft het project overzichtelijk en schaalbaar.

---

[1]: https://docs.github.com/en/get-started/quickstart/create-a-repo
[2]: https://react.dev/learn

