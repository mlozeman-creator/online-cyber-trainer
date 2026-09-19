window.CyberTrainerEngine = {
  data: null,
  currentScenario: null,
  currentStepIndex: 0,
  completed: false,

  load(data) {
    this.data = data;
  },

  getAudience(id) {
    return this.data.audiences.find(item => item.id === id);
  },

  getTheme(id) {
    return this.data.themes.find(item => item.id === id);
  },

  getLearningGoal(id) {
    return this.data.learningGoals.find(item => item.id === id);
  },

  getLesson(id) {
    return this.data.lessons.find(item => item.id === id);
  },

  getScenario(id) {
    return this.data.scenarios.find(item => item.id === id);
  },

  getScenariosForAudience(audienceId) {
    return this.data.scenarios.filter(scenario =>
      scenario.audienceIds.includes(audienceId)
    );
  },

  getScenariosForTheme(themeId, audienceId) {
    return this.data.scenarios.filter(scenario =>
      scenario.themeId === themeId &&
      scenario.audienceIds.includes(audienceId)
    );
  },

  startScenario(scenarioId) {
    this.currentScenario = this.getScenario(scenarioId);
    this.currentStepIndex = 0;
    this.completed = false;
  },

  getCurrentStep() {
    return this.currentScenario?.steps?.[this.currentStepIndex] ?? null;
  },

  choose(choiceId) {
    const step = this.getCurrentStep();
    if (!step) return null;

    const choice = step.choices.find(item => item.id === choiceId);
    if (!choice) return null;

    return choice;
  },

  nextStep() {
    if (!this.currentScenario) return false;

    if (this.currentStepIndex < this.currentScenario.steps.length - 1) {
      this.currentStepIndex += 1;
      return true;
    }

    this.completed = true;
    return false;
  }
};
