/**
 * MEGA MILLIONS ENGINE v1.0 (CDN Version)
 * Works with Universal Lotto Engine Core
 * Author: John & Joan
 */

(function () {

    // Mega Millions Config
    const config = {
        min: 1,
        max: 70,
        count: 5,
        bonusMin: 1,
        bonusMax: 25,
        bonusCount: 1,

        // UI 업데이트 핸들러
        onUpdate: function (main, bonus) {
            const mainBox = document.getElementById("lottoSelectedMain");
            const bonusBox = document.getElementById("lottoSelectedBonus");

            if (mainBox) mainBox.innerHTML = main.join(", ");
            if (bonusBox) bonusBox.innerHTML = bonus.join(", ");
        },

        // 선택 완료 후 처리
        onComplete: function (mode) {
            console.log("Mega Millions selection complete:", mode);
        }
    };

    // 엔진 생성
    window.MegaMillionsEngine = new UniversalLottoEngine(config);

    // Auto Pick
    window.autoPickLotto = function () {
        window.MegaMillionsEngine.autoPick();
    };

    // Manual Mode UI
    window.enableManualMode = function () {
        alert("Manual pick mode enabled.\nScroll down and click numbers to select.");
    };

    // 숫자 선택(번호판 클릭 시)
    window.pickMain = function (num) {
        window.MegaMillionsEngine.toggleNumber(num);
    };

    window.pickBonus = function (num) {
        window.MegaMillionsEngine.toggleBonus(num);
    };

    // 리셋
    window.resetLotto = function () {
        window.MegaMillionsEngine.reset();
    };

})();
