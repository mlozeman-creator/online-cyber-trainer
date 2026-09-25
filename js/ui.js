/*
========================================
CyberTrainer
UI
========================================
*/


/*
========================================
Antwoorden shuffelen
========================================
*/

// Maakt een nieuwe array met de antwoorden in willekeurige volgorde.
// De oorspronkelijke content.json wordt hiermee niet aangepast.
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
Startscherm
========================================
*/

function renderStart(container, audiences, onAudienceSelect) {

    container.innerHTML = `

        <section class="screen start-screen">

            <p class="eyebrow">
                CYBERTRAINER
            </p>

            <h1>
                Echte situaties.<br>
                Slimmere keuzes.
            </h1>

            <p class="intro">
                Oefen met digitale situaties en ontdek
                welke keuze past bij bewust en
                verantwoord digitaal handelen.
            </p>

            <h2>
                Kies je doelgroep
            </h2>

            <div class="choice-list">

                ${audiences.map(audience => `

                    <button
                        class="choice-button"
                        data-audience-id="${audience.id}">

                        ${audience.name}

                    </button>

                `).join("")}

            </div>

        </section>

    `;


    container
        .querySelectorAll("[data-audience-id]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    onAudienceSelect(
                        button.dataset.audienceId
                    );

                }
            );

        });

}


/*
========================================
Thema's
========================================
*/

function renderThemes(
    container,
    themes,
    onThemeSelect
) {

    container.innerHTML = `

        <section class="screen">

            <p class="eyebrow">
                CYBERTRAINER
            </p>

            <h1>
                Kies een thema
            </h1>

            <div class="theme-list">

                ${themes.map(theme => `

                    <button
                        class="theme-card"
                        data-theme-id="${theme.id}">

                        <strong>
                            ${theme.name}
                        </strong>

                        <span>
                            ${theme.description}
                        </span>

                    </button>

                `).join("")}

            </div>

        </section>

    `;


    container
        .querySelectorAll("[data-theme-id]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    onThemeSelect(
                        button.dataset.themeId
                    );

                }
            );

        });

}


/*
========================================
Scenario starten
========================================
*/

function renderScenario(
    container,
    scenario,
    engine,
    onFinished
) {

    renderCurrentStep(
        container,
        scenario,
        engine,
        onFinished
    );

}


/*
========================================
Huidige stap tonen
========================================
*/

function renderCurrentStep(
    container,
    scenario,
    engine,
    onFinished
) {

    const step =
        engine.getCurrentStep();


    /*
    Als er geen volgende stap meer is,
    gaan we naar de reflectie.
    */

    if (!step) {

        renderReflection(
            container,
            engine,
            onFinished
        );

        return;
    }


    /*
    Antwoorden worden hier één keer
    geschud wanneer de stap wordt getoond.

    De originele step.choices blijft intact.
    */

    const shuffledChoices =
        shuffleAnswers(step.choices);


    container.innerHTML = `

        <section class="screen training-screen">

            <div class="scenario-header">

                <p class="eyebrow">
                    PRAKTIJKSITUATIE
                </p>

                <h1>
                    ${scenario.title}
                </h1>

            </div>


            <div class="situation">

                <p>
                    ${step.situation}
                </p>

            </div>


            ${
                step.question
                    ? `

                        <div class="question">

                            <h2>
                                ${step.question}
                            </h2>

                        </div>

                    `
                    : ""
            }


            <div class="choice-list">

                ${shuffledChoices.map(choice => `

                    <button
                        class="choice-button"
                        data-choice-id="${choice.id}">

                        ${choice.text}

                    </button>

                `).join("")}

            </div>


            <div
                id="feedback"
                class="feedback"
                hidden>
            </div>

        </section>

    `;


    /*
    Antwoordknoppen koppelen.
    */

    container
        .querySelectorAll("[data-choice-id]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    handleAnswer(
                        container,
                        scenario,
                        engine,
                        button.dataset.choiceId,
                        onFinished
                    );

                }
            );

        });

}


/*
========================================
Antwoord verwerken
========================================
*/

function handleAnswer(
    container,
    scenario,
    engine,
    choiceId,
    onFinished
) {

    const result =
        engine.answer(choiceId);


    const feedback =
        container.querySelector("#feedback");


    /*
    Alle antwoorden tijdelijk uitschakelen.
    */

    container
        .querySelectorAll("[data-choice-id]")
        .forEach(button => {

            button.disabled = true;

        });


    /*
    FOUT ANTWOORD
    */

    if (!result.correct) {

        feedback.hidden = false;

        feedback.innerHTML = `

            <div class="feedback-content feedback-wrong">

                <strong>
                    Denk nog eens na.
                </strong>

                <p>
                    ${result.feedback}
                </p>

                <button
                    id="retry-button"
                    class="feedback-button">

                    Opnieuw proberen

                </button>

            </div>

        `;


        const retryButton =
            container.querySelector("#retry-button");


        retryButton.addEventListener(
            "click",
            () => {

                /*
                Belangrijk:
                we renderen de stap NIET opnieuw.

                Daardoor blijft de oorspronkelijke
                shuffle behouden.
                */

                container
                    .querySelectorAll("[data-choice-id]")
                    .forEach(button => {

                        button.disabled = false;

                    });


                feedback.hidden = true;

                feedback.innerHTML = "";

            }
        );


        return;
    }


    /*
    CORRECT ANTWOORD
    */

    feedback.hidden = false;

    feedback.innerHTML = `

        <div class="feedback-content feedback-correct">

            <strong>
                GOED GEKOZEN
            </strong>

            <p>
                ${result.feedback}
            </p>

            <button
                id="next-button"
                class="feedback-button">

                ${
                    engine.hasNextStep()
                        ? "Volgende stap"
                        : "Training afronden"
                }

            </button>

        </div>

    `;


    const nextButton =
        container.querySelector("#next-button");


    nextButton.addEventListener(
        "click",
        () => {

            if (engine.hasNextStep()) {

                engine.nextStep();

                renderCurrentStep(
                    container,
                    scenario,
                    engine,
                    onFinished
                );

            }

            else {

                renderReflection(
                    container,
                    engine,
                    onFinished
                );

            }

        }
    );

}


/*
========================================
Reflectie
========================================
*/

function renderReflection(
    container,
    engine,
    onFinished
) {

    const reflection =
        engine.getReflection();


    container.innerHTML = `

        <section class="screen reflection-screen">

            <p class="eyebrow">
                REFLECTIE
            </p>

            <h1>
                Even nadenken
            </h1>

            <div class="reflection-question">

                <p>
                    ${reflection.question}
                </p>

            </div>


            <textarea
                id="reflection-answer"
                class="reflection-input"
                placeholder="Schrijf hier je antwoord..."
                rows="6">
            </textarea>


            <button
                id="finish-button"
                class="feedback-button">

                Training afronden

            </button>

        </section>

    `;


    const finishButton =
        container.querySelector("#finish-button");


    finishButton.addEventListener(
        "click",
        () => {

            const answer =
                container
                    .querySelector("#reflection-answer")
                    .value
                    .trim();


            onFinished(answer);

        }
    );

}


/*
========================================
Foutmelding
========================================
*/

function renderError(
    container,
    message
) {

    container.innerHTML = `

        <section class="screen">

            <h1>
                Er ging iets mis
            </h1>

            <p>
                ${message}
            </p>

        </section>

    `;

}
