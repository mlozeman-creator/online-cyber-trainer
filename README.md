# CyberTrainer

**Echte situaties. Slimmere keuzes.**

CyberTrainer is een eenvoudige, content-driven webapp voor digitale awareness.

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

De eerste prototypeversie gebruikt één gecombineerd contentbestand:

`content.json`

Daarin staan doelgroepen, thema's, leerdoelen, lessen en scenario's. Dit houdt de eerste versie eenvoudig te beheren. De structuur is al voorbereid op verdere uitbreiding.

## P1-prototype

Huidige inhoud in v0.6.0:

- doelgroep: MBO Burgerschap
- thema: AVG-proof werken
- scenario: Een ticket op je scherm
- thema: AI prompting
- scenario: Doelgericht prompten in zes leerstappen
- thema: Phishing & online fraude
- scenario: Denk na voor je klikt! (vijf leerstappen)

CyberTrainer v0.2.0 vormde het eerste stabiele technische ijkpunt. In v0.3.0 is AI prompting als tweede inhoudelijke toepassing opgenomen.

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

## Versiegeschiedenis

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
