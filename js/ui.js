/*
========================================
CyberTrainer
UI
========================================
*/

/*
========================================
HTML veilig maken
========================================

Zorgt ervoor dat tekst uit content.json
veilig in de HTML kan worden geplaatst.
*/

function escapeHtml(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/*
========================================
Antwoorden shuffelen
========================================

Maakt een nieuwe array met de antwoorden
in willekeurige volgorde.

De oorspronkelijke content.json
wordt hiermee niet aangepast.
*/

function shuffleAnswers(answers) {
  const shuffled = [...answers];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [shuffled[i], shuffled[j]] =
      [shuffled[j], shuffled[i]];
  }

  return shuffled;
}


/*
========================================
Scenario-afbeelding
========================================

Wanneer een scenario een afbeelding heeft,
wordt deze weergegeven.

Heeft een scenario nog geen afbeelding,
dan wordt de bestaande placeholder gebruikt.

Hierdoor kunnen we later per scenario
eenvoudig een afbeelding toevoegen via
content.json.
*/

function scenarioImage(scenario) {
  if (scenario && scenario.image) {
    return `
      <img
        class="scenario-image"
        src="${escapeHtml(scenario.image)}"
        alt="${escapeHtml(scenario.title || "Praktijksituatie")}"
      >
    `;
  }

  return `
    <div class="visual-placeholder">
      <div>
        <strong>Praktijksituatie</strong><br>
        <span>Hier komt later een relevante afbeelding.</span>
      </div>
    </div>
  `;
}


/*
========================================
Merk / branding
========================================
*/

function brand() {
  return `
    <header class="brand">
      <div class="brand-name">
        CYBERTRAINER
      </div>

      <div class="brand-tagline">
        Echte situaties. Slimmere keuzes.
      </div>
    </header>
  `;
}


/*
========================================
Render
========================================

Vervangt de inhoud van de centrale
applicatiecontainer.
*/

function render(content) {
  const app = document.getElementById("app");

  if (!app) {
    console.error(
      "CyberTrainer: element #app niet gevonden."
    );
    return;
  }

  app.innerHTML = content;
}


/*
========================================
UI-object
========================================

De applicatie gebruikt CyberTrainerUI
als centrale interface voor de UI-functies.
*/

const CyberTrainerUI = {
  escapeHtml,
  shuffleAnswers,
  scenarioImage,
  brand,
  render
};
