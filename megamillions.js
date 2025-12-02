/* -----------------------------------------------------
 MEGA MILLIONS — Slip Edition Interface (v4.3 Final)
 Author: Joan Ellis
------------------------------------------------------ */

(function () {

    /* -----------------------------------------------------
       1. Lotto Configuration (for Mega Millions)
    ------------------------------------------------------ */
    window.LottoCore.setConfig({
        mainMax: 70,   // 1–70
        mainPick: 5,   // pick 5
        bonusMax: 25,  // 1–25 (Mega Ball)
        bonusPick: 1
    });

    /* -----------------------------------------------------
       2. UI Build Function — Auto Generates All Number Bubbles
    ------------------------------------------------------ */
    function buildBoard() {

        const mainBoard = document.getElementById("main-board");
        const bonusBoard = document.getElementById("bonus-board");

        mainBoard.innerHTML = "";
        bonusBoard.innerHTML = "";

        // Main Numbers
        for (let i = 1; i <= 70; i++) {
            const b = document.createElement("div");
            b.className = "bubble num";
            b.textContent = i;
            b.dataset.val = i;
            b.onclick = () => {
                window.LottoCore.toggleMain(i);
                updateUI();
            };
            mainBoard.appendChild(b);
        }

        // Bonus Numbers
        for (let j = 1; j <= 25; j++) {
            const b = document.createElement("div");
            b.className = "bubble bonus";
            b.textContent = j;
            b.dataset.val = j;
            b.onclick = () => {
                window.LottoCore.toggleBonus(j);
                updateUI();
            };
            bonusBoard.appendChild(b);
        }
    }

    /* -----------------------------------------------------
       3. Update UI (refresh all selections)
    ------------------------------------------------------ */
    function updateUI() {

        // Main numbers
        document.querySelectorAll(".num").forEach(el => {
            const num = parseInt(el.dataset.val);
            if (window.LottoCore.state.main.includes(num)) {
                el.classList.add("selected");
            } else {
                el.classList.remove("selected");
            }
        });

        // Bonus numbers
        document.querySelectorAll(".bonus").forEach(el => {
            const num = parseInt(el.dataset.val);
            if (window.LottoCore.state.bonus.includes(num)) {
                el.classList.add("selected");
            } else {
                el.classList.remove("selected");
            }
        });

        // Selected Numbers Output
        document.getElementById("selected-main").textContent =
            window.LottoCore.state.main.join(", ") || "…";
        document.getElementById("selected-bonus").textContent =
            window.LottoCore.state.bonus.join(", ") || "…";

        // Activate Generate Button
        const genBtn = document.getElementById("btn-generate");
        genBtn.disabled = !window.LottoCore.isComplete();
    }

    /* -----------------------------------------------------
       4. Control Buttons
    ------------------------------------------------------ */

    // Auto Pick
    document.getElementById("btn-auto").onclick = () => {
        window.LottoCore.reset();
        window.LottoCore.autoPick();
        updateUI();
        showBlessing();
    };

    // Manual Reset
    document.getElementById("btn-reset").onclick = () => {
        window.LottoCore.reset();
        updateUI();
    };

    // Generate Ticket (after manual completion)
    document.getElementById("btn-generate").onclick = () => {
        if (window.LottoCore.isComplete()) {
            showBlessing();
        }
    };

    /* -----------------------------------------------------
       5. God Blessing Popup
    ------------------------------------------------------ */
    function showBlessing() {
        const pop = document.getElementById("popup-blessing");
        pop.style.display = "flex";
    }

    document.getElementById("popup-close").onclick = () => {
        document.getElementById("popup-blessing").style.display = "none";
    };

    /* -----------------------------------------------------
       6. Initialize UI on Page Load
    ------------------------------------------------------ */
    window.addEventListener("DOMContentLoaded", () => {
        buildBoard();
        updateUI();
    });

})();
