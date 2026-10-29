# CyberTrainer

**Echte situaties. Slimmere keuzes.**

CyberTrainer is een content-driven webapp voor digitale awareness in het mbo-onderwijs.

**Huidige vastgelegde release: v1.0.0 (29 oktober 2026).**

## Technische basis

- HTML
- CSS
- JavaScript
- JSON
- GitHub
- Vercel

## Architectuur

De applicatie bepaalt **hoe** de training werkt.  
De content bepaalt **wat** de student krijgt.  
De configuratie bepaalt **voor wie** en **in welke context** de content wordt gebruikt.

De applicatie gebruikt één gecombineerd contentbestand:

`data/content.json`

Daarin staan doelgroepen, thema's, leerdoelen, lessen en scenario's. Dit houdt de eerste versie eenvoudig te beheren. De structuur is al voorbereid op verdere uitbreiding.

## Ontwikkelafspraken

- Geen doelgroep-specifieke logica in JavaScript.
- Geen thema-specifieke logica in JavaScript.
- Geen scenario-specifieke logica in JavaScript.
- Scenario's bestaan uit één of meer leerstappen.
- Fout antwoord betekent opnieuw proberen.
- Correct antwoord geeft uitleg en laat de student doorgaan.
- De leerflow is: lezen → begrijpen → afwegen → kiezen → feedback verwerken → opnieuw proberen → reflecteren.

## Deployment

Repository: GitHub  
Hosting: Vercel  
Productiedomein: https://online-cyber-trainer.vercel.app

## Release v1.0.0 – goedgekeurde basisversie (29 oktober 2026)

- Vijf thema’s en in totaal 22 interactieve vragen/leerstappen.
- Thema’s: AVG-proof werken (1), AI prompting (6), Phishing & online fraude (5), Social media & privacy (5) en AI & deepfakes (5).
- Alle 22 afbeeldingen en de bijbehorende koppelingen inhoudelijk gecontroleerd en goedgekeurd.
- Scenarioteksten, antwoordmogelijkheden en feedback inhoudelijk beoordeeld; bij AI prompting, vraag 4, is feedback aangevuld met een advies om AI-informatie te verifiëren aan de hand van officiële Microsoft-documentatie.
- De bestaande leerflow met directe feedback, opnieuw proberen en reflectie blijft behouden.
- De GitHub-release `v1.0.0` is het herstelpunt vóór de geplande e-mailfunctie voor reflecties.

**Afbakening:** automatische verzending of centrale opslag van reflecties is nog **niet** opgenomen in v1.0.0. Een eventuele uitbreiding met reflectiemails wordt apart ontwikkeld en getest (beoogd: v1.1.0). De volledige browser- en klassikale praktijktest is hiermee niet als afgerond aangemerkt.

**Versienummer in interface:** bij de release is de versieaanduiding nog `v0.8.1`; de wijziging naar `v1.0.0` op het startscherm is als afzonderlijke vervolgcommit voorbereid. Controleer bij publicatie of deze wijziging is doorgevoerd.

## Versiegeschiedenis

## v0.8.1 – unieke vraagbeelden
- 21 onderscheiden, lokaal opgeslagen scenario-afbeeldingen per vraag; bestaande AVG-afbeelding behouden.
- De afbeeldingen zijn grafisch nagebouwde interface-simulaties, geen echte screenshots of fotorealistische AI-foto’s.
- Alle nieuwe afbeeldingen bevatten alternatieve beschrijvingen in de JSON.

## inhoud in v0.8.0:

- doelgroep: MBO Burgerschap
- thema: AVG-proof werken
- scenario: Een ticket op je scherm
- thema: AI prompting
- scenario: Doelgericht prompten in zes leerstappen
- thema: Phishing & online fraude
- scenario: Denk na voor je klikt! (vijf leerstappen)

## v0.8.0 – scenarioafbeeldingen

Drie eerder nog lege afbeeldingsplaatsen zijn ingevuld: phishing, social media & privacy, AI & deepfakes. De bestaande afbeeldingen voor AVG en AI prompting blijven ongewijzigd. Elke illustratie is AI-gegenereerd (fictief), geen authentiek bewijs of een echte screenshot. Per scenario maximaal één afbeelding, met alt-tekst via `imageAlt`. De bestaande beeldpositie wordt behouden. De beelden bij scenario’s met meerdere stappen zijn sfeerbeelden bij het thema, niet noodzakelijk illustraties van iedere afzonderlijke stap.

## v0.8.0 — afbeelding per vraag

- Elk van de 22 vragen heeft een eigen afbeeldingverwijzing en alt-tekst in `data/content.json` (`scenarios[].steps[].image`).
- Afbeeldingen wisselen mee met de huidige vraag via `scenarioImage(scenario, step)`.
- Bestaande afbeeldingen voor AVG en de eerste AI-promptingvraag blijven behouden.
- Bij ontbrekende afbeeldingsverwijzing blijft de scenario-afbeelding als fallback bestaan.
- De aanvullende beelden zijn bijgesneden uit een eerder voor CyberTrainer gegenereerde AI-beeldcollage. Sommige beelden gebruiken dezelfde bronscène; voor volledig unieke, vraag-specifieke fotografie is aanvullende beeldgeneratie nodig.
- Controleer eventuele details in nagebootste berichten en interfaces vóór gebruik in de les.

### v0.6.0 – AI & deepfakes toegevoegd

- Vijf praktijksituaties over gemanipuleerde video’s, misleidende investeringen, ongewenste beelden, nieuws en nagebootste stemmen.
- Aansluiting op lesbrief 4: de bestaande Echt of AI?-afbeeldingenquiz blijft in het lesmateriaal; de webapp oefent handelen.
- Directe feedback, opnieuw proberen en reflectie via bestaande engine.
- Bestaande AVG-, AI-prompting-, phishing- en socialmediatrainingen behouden.
- v1.0.0 pas na integrale inhoudelijke en functionele tests.

### v0.5.0 – Social media & privacy toegevoegd

- Vijf praktijksituaties over toestemming, profielzichtbaarheid, winacties, stagegegevens en ongewenst delen.
- Directe feedback, opnieuw proberen en reflectie via de bestaande engine.
- Eerdere thema’s en scenario’s behouden.
- v1.0.0 volgt pas na afronding en testen van alle vier lesthema’s.


### v0.4.0 – Phishing toegevoegd

- Vijf phishingsituaties in één doorlopende training.
- Directe feedback en opnieuw proberen via bestaande engine.
- AVG en AI prompting ongewijzigd.
- v1.0.0 volgt na afronding en testen van alle vier lesonderwerpen.


### v0.3.0 – AI prompting actief

- AI prompting opgenomen als tweede werkend thema.
- Zes leerstappen rond doel, rol, output, voorwaarden, beoordelen en verbeteren.
- Content-driven architectuur blijft behouden.
- Versienummer op het startscherm bijgewerkt naar v0.3.0.

### v0.2.0 – Eerste stabiele technische basis

- Basisflow voor doelgroep, thema en scenario.
- Willekeurige antwoordvolgorde.
- Feedback, opnieuw proberen en reflectie.
- Content via JSON.
