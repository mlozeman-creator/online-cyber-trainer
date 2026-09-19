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

`data/content.json`

Daarin staan doelgroepen, thema's, leerdoelen, lessen en scenario's. Dit houdt de eerste versie eenvoudig te beheren. De structuur is al voorbereid op verdere uitbreiding.

## P1-prototype

Eerste inhoud:

- doelgroep: MBO Burgerschap
- thema: AVG-proof werken
- scenario: Een ticket op je scherm

AI prompting staat als toekomstig thema in de contentstructuur, maar is nog niet actief in de interface.

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
