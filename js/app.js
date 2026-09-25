const App = {
  data: null,
  selectedAudienceId: null,
  selectedThemeId: null,

  async init() {
    try {
      const response = await fetch("data/content.json");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      this.data = await response.json();
      CyberTrainerEngine.load(this.data);

      this.showHome();
    } catch (error) {
      console.error(error);
      CyberTrainerUI.render(`
        <main class="container">
          ${CyberTrainerUI.brand()}
          <div class="error-box">
            <h2>CyberTrainer kon niet starten</h2>
            <p>De content kon niet worden geladen. Controleer of <strong>content.json</strong> aanwezig is en of de site via Vercel wordt geopend.</p>
          </div>
        </main>
      `);
    }
  },

  showHome() {
    CyberTrainerUI.render(`
      <main class="container">
        ${CyberTrainerUI.brand()}
        <section class="hero">
          <div class="eyebrow">Digitale awareness</div>
          <h1>Echte situaties.<br>Slimmere keuzes.</h1>
          <p class="lead">
            CyberTrainer laat je oefenen met digitale situaties uit de praktijk.
            Lees de situatie, denk na over de gevolgen en maak een bewuste keuze.
          </p>
          <div class="actions">
            <button class="btn btn-primary" onclick="App.showAudiences()">Start training</button>
          </div>
        </section>
      </main>
    `);
  },

  showAudiences() {
    const audiences = this.data.audiences.filter(item => item.active);

    CyberTrainerUI.render(`
      <main class="container">
        ${CyberTrainerUI.brand()}
        <div class="training-header">
          <div>
            <div class="eyebrow">Stap 1</div>
            <h2>Kies je doelgroep</h2>
          </div>
          <button class="btn btn-ghost" onclick="App.showHome()">Terug</button>
        </div>

        <div class="grid">
          ${audiences.map(audience => `
            <article class="card selectable" onclick="App.selectAudience('${audience.id}')">
              <div class="card-title">${CyberTrainerUI.escapeHtml(audience.name)}</div>
              <div class="card-text">${CyberTrainerUI.escapeHtml(audience.description)}</div>
            </article>
          `).join("")}
        </div>
      </main>
    `);
  },

  selectAudience(audienceId) {
    this.selectedAudienceId = audienceId;
    this.showThemes();
  },

  showThemes() {
    const themes = this.data.themes
      .filter(theme => theme.active)
      .filter(theme =>
        CyberTrainerEngine.getScenariosForTheme(theme.id, this.selectedAudienceId).length > 0
      );

    const audience = CyberTrainerEngine.getAudience(this.selectedAudienceId);

    CyberTrainerUI.render(`
      <main class="container">
        ${CyberTrainerUI.brand()}
        <div class="training-header">
          <div>
            <div class="eyebrow">Stap 2 · ${CyberTrainerUI.escapeHtml(audience.name)}</div>
            <h2>Kies een thema</h2>
          </div>
          <button class="btn btn-ghost" onclick="App.showAudiences()">Terug</button>
        </div>

        <div class="grid">
          ${themes.map(theme => `
            <article class="card selectable" onclick="App.selectTheme('${theme.id}')">
              <div class="card-title">${CyberTrainerUI.escapeHtml(theme.name)}</div>
              <div class="card-text">${CyberTrainerUI.escapeHtml(theme.description)}</div>
            </article>
          `).join("")}
        </div>

        <p class="notice">Prototype: AVG-proof werken en AI prompting.</p>
      </main>
    `);
  },

  selectTheme(themeId) {
    this.selectedThemeId = themeId;
    const scenarios = CyberTrainerEngine.getScenariosForTheme(themeId, this.selectedAudienceId);

    if (!scenarios.length) return;

    this.startScenario(scenarios[0].id);
  },

  startScenario(scenarioId) {
    CyberTrainerEngine.startScenario(scenarioId);
    this.renderScenario();
  },

  renderScenario() {
    const scenario = CyberTrainerEngine.currentScenario;
    const step = CyberTrainerEngine.getCurrentStep();
    const theme = CyberTrainerEngine.getTheme(scenario.themeId);
    const goal = CyberTrainerEngine.getLearningGoal(scenario.learningGoalId);

    CyberTrainerUI.render(`
      <main class="container">
        ${CyberTrainerUI.brand()}

        <div class="training-header">
          <div>
            <div class="eyebrow">${CyberTrainerUI.escapeHtml(theme.name)}</div>
            <h2>${CyberTrainerUI.escapeHtml(scenario.title)}</h2>
          </div>
          <div class="progress">
            Stap ${CyberTrainerEngine.currentStepIndex + 1} van ${scenario.steps.length}
          </div>
        </div>

        <section class="scenario">
          <div class="scenario-visual">
            <div class="visual-placeholder">
              <div>
                <strong>Praktijksituatie</strong><br>
                <span>Hier komt later een relevante afbeelding.</span>
              </div>
            </div>
          </div>

          <div class="scenario-body">
            <div class="meta">
              <span class="tag">${CyberTrainerUI.escapeHtml(theme.name)}</span>
              <span class="tag">Leerdoel</span>
            </div>

            <p class="situation">${CyberTrainerUI.escapeHtml(step.situation)}</p>

            ${step.question ? `<h3 class="question">${CyberTrainerUI.escapeHtml(step.question)}</h3>` : ""}

            <div class="choice-list">
              ${step.choices.map(choice => `
                <button class="choice" onclick="App.handleChoice('${choice.id}')">
                  ${CyberTrainerUI.escapeHtml(choice.text)}
                </button>
              `).join("")}
            </div>

            <div id="feedback"></div>
          </div>
        </section>

        <p class="notice">
          Leerdoel: ${CyberTrainerUI.escapeHtml(goal?.description ?? "")}
        </p>
      </main>
    `);
  },

  handleChoice(choiceId) {
    const choice = CyberTrainerEngine.choose(choiceId);
    if (!choice) return;

    const feedback = document.getElementById("feedback");

    if (!choice.correct) {
      feedback.innerHTML = `
        <div class="feedback error">
          <div class="feedback-title">Denk nog eens na.</div>
          <div>${CyberTrainerUI.escapeHtml(choice.feedback)}</div>
          <div class="actions">
            <button class="btn btn-primary" onclick="App.renderScenario()">Opnieuw proberen</button>
          </div>
        </div>
      `;
      return;
    }

    feedback.innerHTML = `
      <div class="feedback success">
        <div class="feedback-title">GOED GEKOZEN</div>
        <div>${CyberTrainerUI.escapeHtml(choice.feedback)}</div>
        <div class="actions">
          <button class="btn btn-primary" onclick="App.continueAfterCorrect()">Doorgaan</button>
        </div>
      </div>
    `;

    document.querySelectorAll(".choice").forEach(button => {
      button.disabled = true;
      button.style.opacity = ".55";
      button.style.cursor = "default";
    });
  },

  continueAfterCorrect() {
    if (CyberTrainerEngine.nextStep()) {
      this.renderScenario();
      return;
    }

    this.showReflection();
  },

  showReflection() {
    const scenario = CyberTrainerEngine.currentScenario;

    CyberTrainerUI.render(`
      <main class="container">
        ${CyberTrainerUI.brand()}
        <section class="hero">
          <div class="eyebrow">Reflectie</div>
          <h2>Even terugkijken</h2>
          <p class="lead">${CyberTrainerUI.escapeHtml(scenario.reflection.question)}</p>

          <div class="reflection">
            <label for="reflectionAnswer">Jouw antwoord</label>
            <textarea id="reflectionAnswer" placeholder="Schrijf kort op wat je hebt geleerd..."></textarea>
            <div class="actions">
              <button class="btn btn-primary" onclick="App.finishReflection()">Training afronden</button>
            </div>
          </div>
        </section>
      </main>
    `);
  },

  finishReflection() {
    CyberTrainerUI.render(`
      <main class="container">
        ${CyberTrainerUI.brand()}
        <section class="hero">
          <div class="eyebrow">Training afgerond</div>
          <h2>Goed gewerkt.</h2>
          <p class="lead">
            Je hebt de situatie gelezen, afgewogen, een keuze gemaakt en daarop gereflecteerd.
          </p>
          <div class="actions">
            <button class="btn btn-primary" onclick="App.showAudiences()">Nieuwe training</button>
            <button class="btn btn-ghost" onclick="App.showHome()">Startscherm</button>
          </div>
        </section>
      </main>
    `);
  }
};

document.addEventListener("DOMContentLoaded", () => App.init());
