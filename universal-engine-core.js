/* -----------------------------------------------------
 UNIVERSAL LOTTO ENGINE CORE (v4.3 — Slip Edition)
 Author: Joan Ellis
------------------------------------------------------ */

window.LottoCore = {
    config: {
        mainMax: 0,
        mainPick: 0,
        bonusMax: 0,
        bonusPick: 0
    },

    state: {
        main: [],
        bonus: []
    },

    /* ------------------------------
       Initialize Configuration
    ------------------------------ */
    setConfig(cfg) {
        this.config = { ...cfg };
        this.reset();
    },

    /* ------------------------------
       Reset All Selected Numbers
    ------------------------------ */
    reset() {
        this.state.main = [];
        this.state.bonus = [];
    },

    /* ------------------------------
       Auto Pick Random Numbers
    ------------------------------ */
    autoPick() {
        let mainSet = new Set();
        let bonusSet = new Set();

        while (mainSet.size < this.config.mainPick) {
            mainSet.add(Math.floor(Math.random() * this.config.mainMax) + 1);
        }

        if (this.config.bonusPick > 0) {
            while (bonusSet.size < this.config.bonusPick) {
                bonusSet.add(Math.floor(Math.random() * this.config.bonusMax) + 1);
            }
        }

        this.state.main = Array.from(mainSet).sort((a, b) => a - b);
        this.state.bonus = Array.from(bonusSet).sort((a, b) => a - b);
    },

    /* ------------------------------
       Toggle Manual Selection
    ------------------------------ */
    toggleMain(num) {
        if (this.state.main.includes(num)) {
            this.state.main = this.state.main.filter(n => n !== num);
        } else {
            if (this.state.main.length < this.config.mainPick) {
                this.state.main.push(num);
            }
        }
        this.state.main.sort((a, b) => a - b);
    },

    toggleBonus(num) {
        if (this.state.bonus.includes(num)) {
            this.state.bonus = this.state.bonus.filter(n => n !== num);
        } else {
            if (this.state.bonus.length < this.config.bonusPick) {
                this.state.bonus.push(num);
            }
        }
        this.state.bonus.sort((a, b) => a - b);
    },

    /* ------------------------------
       Selection Complete Check
    ------------------------------ */
    isComplete() {
        return (
            this.state.main.length === this.config.mainPick &&
            this.state.bonus.length === this.config.bonusPick
        );
    }
};
