/** 
 * UNIVERSAL LOTTO ENGINE CORE v1.0
 * Designed for CDN delivery 
 * Author: John & Joan (Lotto Number Lab)
 */

class UniversalLottoEngine {
    constructor(config) {
        this.min = config.min;
        this.max = config.max;
        this.count = config.count;

        this.bonusMin = config.bonusMin ?? null;
        this.bonusMax = config.bonusMax ?? null;
        this.bonusCount = config.bonusCount ?? 0;

        this.selectedNumbers = [];
        this.bonusNumbers = [];

        this.onUpdate = config.onUpdate || function () {};
        this.onComplete = config.onComplete || function () {};
    }

    // 번호 1개 랜덤 생성
    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 중복 없이 번호 세트 랜덤 생성
    generateRandomSet(min, max, count) {
        let nums = new Set();
        while (nums.size < count) {
            nums.add(this.randomNumber(min, max));
        }
        return Array.from(nums).sort((a, b) => a - b);
    }

    // 전체 자동 생성
    autoPick() {
        this.selectedNumbers = this.generateRandomSet(this.min, this.max, this.count);

        if (this.bonusCount > 0) {
            this.bonusNumbers = this.generateRandomSet(this.bonusMin, this.bonusMax, this.bonusCount);
        }

        this.onUpdate(this.selectedNumbers, this.bonusNumbers);
        this.onComplete("AUTO");
    }

    // 수동 선택
    toggleNumber(num) {
        if (this.selectedNumbers.includes(num)) {
            this.selectedNumbers = this.selectedNumbers.filter(n => n !== num);
        } else {
            if (this.selectedNumbers.length < this.count) {
                this.selectedNumbers.push(num);
            }
        }

        this.selectedNumbers.sort((a, b) => a - b);
        this.onUpdate(this.selectedNumbers, this.bonusNumbers);

        if (this.selectedNumbers.length === this.count) {
            this.onComplete("MANUAL");
        }
    }

    // 보너스 수동 선택 (파워볼, 일본 로또 등)
    toggleBonus(num) {
        if (this.bonusNumbers.includes(num)) {
            this.bonusNumbers = this.bonusNumbers.filter(n => n !== num);
        } else {
            if (this.bonusNumbers.length < this.bonusCount) {
                this.bonusNumbers.push(num);
            }
        }

        this.bonusNumbers.sort((a, b) => a - b);
        this.onUpdate(this.selectedNumbers, this.bonusNumbers);
    }

    // 초기화
    reset() {
        this.selectedNumbers = [];
        this.bonusNumbers = [];
        this.onUpdate(this.selectedNumbers, this.bonusNumbers);
    }
}

// CDN export
window.UniversalLottoEngine = UniversalLottoEngine;
