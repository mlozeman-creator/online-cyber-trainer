/*
========================================
CyberTrainer
UI
========================================
*/

window.CyberTrainerUI = {

    /*
    ========================================
    Algemene UI
    ========================================
    */

    render(html) {

        const app =
            document.getElementById("app");

        app.innerHTML = html;

    },


    /*
    ========================================
    Branding
    ========================================
    */

    brand() {

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

    },


    /*
    ========================================
    HTML veilig maken
    ========================================
    */

    escapeHtml(value) {

        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    },


    /*
    ========================================
    Antwoorden shuffelen
    ========================================
    */

    shuffleAnswers(answers) {

        /*
        We maken eerst een kopie.

        De oorspronkelijke content.json
        wordt hierdoor niet aangepast.
        */

        const shuffled = [...answers];


        /*
        Fisher-Yates shuffle.
        */

        for (
            let i = shuffled.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );


            [
                shuffled[i],
                shuffled[j]
            ] = [
                shuffled[j],
                shuffled[i]
            ];

        }


        return shuffled;

    }

};
