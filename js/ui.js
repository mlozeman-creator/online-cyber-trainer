// ui.js
// Verzorgt de weergave en interactie van CyberTrainer.
// De inhoud en trainingslogica blijven gescheiden van de UI.

/**
 * Maakt een nieuwe array met de antwoorden in willekeurige volgorde.
 *
 * De originele array uit content.json wordt niet aangepast.
 */
function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}


/**
 * Houdt de geschudde antwoordvolgorde per stap bij.
 *
 * Daardoor verandert de volgorde niet wanneer een student
 * na een fout antwoord opnieuw probeert.
 */
const shuffledChoicesByStep = {};


/**
 * Haalt de geschudde antwoorden voor een stap op.
 *
 * Als deze stap nog niet eerder is weergegeven, worden de
 * antwoorden één keer geschud.
 */
function getShuffledChoices(step) {
    if (!shuffledChoicesByStep[step.id]) {
        shuffledChoicesByStep[step.id] = shuffleArray(step.choices);
    }

    return shuffledChoicesByStep[step.id];
}


/**
 * Maakt de startpagina.
 */
function renderStart(container, audiences, onAudienceSelect) {
    container.innerHTML = `
        <section class="screen start-screen">
            <div class="hero">
                <p class="eyebrow">CYBERTRAINER</p>

                <h1>Echte situaties.<br>Slimmere keuzes.</h1>

                <p class="intro">
                    Oefen met digitale situaties en ontdek welke keuze
                    past bij bewust en verantwoord digitaal handelen.
                </p>

                <h2>Voor wie?</h2>

                <div class="choice-list audience-list">
                    ${audiences.map(audience => `
                        <button
                            class="choice-button"
                            data-audience-id="${audience.id}">
                            ${audience.name}
                        </button>
                    `).join("")}
                </div>
            </div>
        </section>
    `;

    container.querySelectorAll("[data-audience-id]").forEach(button => {
        button.addEventListener("click", () => {
            onAudienceSelect(button.dataset.audienceId);
        });
    });
}


/**
 * Toont de beschikbare thema's.
 */
function renderThemes(container, themes, onThemeSelect) {
    container.innerHTML = `
        <section class="screen">
            <p class="eyebrow">CYBERTRAINER</p>

            <h1>Kies een thema</h1>

            <div class="theme-list">
                ${themes.map(theme => `
                    <button
                        class="theme-card"
                        data-theme-id="${theme.id}">

                        <strong>${theme.name}</strong>

                        <span>
                            ${theme.description}
                        </span>
                    </button>
                `).join("")}
            </div>
        </section>
    `;

    container.querySelectorAll("[data-theme-id]").forEach(button => {
        button.addEventListener("click", () => {
            onThemeSelect(button.dataset.themeId);
        });
    });
}


/**
 * Toont een scenario binnen een thema.
 */
function renderScenario(container, scenario, engine, onFinished) {
    // Bij ieder nieuw scenario verwijderen we oude shuffle-resultaten.
    Object.keys(shuffledChoicesByStep).forEach(key => {
        delete shuffledChoicesByStep[key];
    });

    renderCurrentStep(container, scenario, engine, onFinished);
}


/**
 * Toont de huidige stap van een scenario.
 */
function renderCurrentStep(container, scenario, engine, onFinished) {
    const step = engine.getCurrentStep();

    if (!step) {
        renderReflection(container, engine, onFinished);
        return;
    }

    // Antwoorden worden één keer geschud voor deze specifieke stap.
    const choices = getShuffledChoices(step);

    container.innerHTML = `
        <section class="screen training-screen">

            <div class="scenario-header">
                <p class="eyebrow">PRAKTIJKSITUATIE</p>
                <h1>${scenario.title}</h1>
            </div>

            <div class="situation">
                <p>${step.situation}</p>
            </div>

            ${
                step.question
                    ? `
                        <div class="question">
                            <h2>${step.question}</h2>
                        </div>
                    `
                    : ""
            }

            <div class="choice-list">
                ${choices.map(choice => `
                    <button
                        class="choice-button"
                        data-choice-id="${choice.id}">
                        ${choice.text}
                    </button>
                `).join("")}
            </div>

            <div id="feedback" class="feedback" hidden></div>
        </section>
    `;

    container.querySelectorAll("[data-choice-id]").forEach(button => {
        button.addEventListener("click", () => {
            handleAnswer(
                container,
                scenario,
                engine,
                button.dataset.choiceId,
                onFinished
            );
        });
    });
}


/**
 * Verwerkt een antwoord.
 */
function handleAnswer(
    container,
    scenario,
    engine,
    choiceId,
    onFinished
) {
    const result = engine.answer(choiceId);

    const feedbackElement = container.querySelector("#feedback");

    // Alle antwoordknoppen tijdelijk uitschakelen.
    container.querySelectorAll("[data-choice-id]").forEach(button => {
        button.disabled = true;
    });

    if (!result.correct) {
        feedbackElement.hidden = false;

        feedbackElement.innerHTML = `
            <div class="feedback-content feedback-wrong">
                <strong>Denk nog eens na.</strong>
                <p>${result.feedback}</p>

                <button id="retry-button" class="feedback-button">
                    Opnieuw proberen
                </button>
            </div>
        `;

        const retryButton = container.querySelector("#retry-button");

        retryButton.addEventListener("click", () => {
            // De bestaande antwoordvolgorde blijft behouden.
            container.querySelectorAll("[data-choice-id]").forEach(button => {
                button.disabled = false;
            });

            feedbackElement.hidden = true;
            feedbackElement.innerHTML = "";
        });

        return;
    }

    // Correct antwoord.
    feedbackElement.hidden = false;

    feedbackElement.innerHTML = `
        <div class="feedback-content feedback-correct">
            <strong>GOED GEKOZEN</strong>
            <p>${result.feedback}</p>

            <button id="next-button" class="feedback-button">
                ${
                    engine.hasNextStep()
                        ? "Volgende stap"
                        : "Training afronden"
                }
            </button>
        </div>
    `;

    const nextButton = container.querySelector("#next-button");

    nextButton.addEventListener("click", () => {
        if (engine.hasNextStep()) {
            engine.nextStep();
            renderCurrentStep(container, scenario, engine, onFinished);
        } else {
            renderReflection(container, engine, onFinished);
        }
    });
}


/**
 * Toont de reflectievraag aan het einde van een scenario.
 */
function renderReflection(container, engine, onFinished) {
    const reflection = engine.getReflection();

    container.innerHTML = `
        <section class="screen reflection-screen">

            <p class="eyebrow">REFLECTIE</p>

            <h1>Even nadenken</h1>

            <div class="reflection-question">
                <p>${reflection.question}</p>
            </div>

            <textarea
                id="reflection-answer"
                class="reflection-input"
                placeholder="Schrijf hier je antwoord..."
                rows="6"></textarea>

            <button id="finish-button" class="feedback-button">
                Training afronden
            </button>

        </section>
    `;

    const finishButton = container.querySelector("#finish-button");

    finishButton.addEventListener("click", () => {
        const answer = container
            .querySelector("#reflection-answer")
            .value
            .trim();

        onFinished(answer);
    });
}


/**
 * Toont een foutmelding.
 */
function renderError(container, message) {
    container.innerHTML = `
        <section class="screen">
            <h1>Er ging iets mis</h1>
            <p>${message}</p>
        </section>
    `;
}
