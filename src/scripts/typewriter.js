class Typewriter {
    constructor(id, words, wait = 3000) {
        this.txtElement = document.getElementById(id);
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = this.txt;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 4;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            // Word is finished typing

            // CHECK: Is this the last word?
            if (current === this.words.length - 1) {
                // Stop everything. Do not set deleting. Do not loop.
                // Optional: Remove cursor animation
                const cursor = document.querySelector('.cursor');
                if (cursor) cursor.style.display = 'none';
                return;
            }

            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.getElementById('typewriter');
    if (txtElement) {
        const words = ["Spider Man", "Denji", "a Brazil grasshoper", "a Software Engineer"];
        const wait = 1000;
        new Typewriter('typewriter', words, wait);
    }
}
