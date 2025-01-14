

class RTSToggleText extends HTMLElement {
    

    connectedCallback() {
        const text = this.getAttribute('text');
        const name = this.getAttribute('name');
        const breed = this.getAttribute('breed');
        const birthyear = this.getAttribute('birthyear');
        const color = this.getAttribute('color');
        const gender = this.getAttribute('gender');

        if (window.innerWidth >= 768) {
            var toggleElement = `
            <h5 class="summaryTitle">Mehr über ${name}</h5>
            <p class="summaryText">${text}</p>
            <ul class="list list--no-bullets">
                <li class="list__item"><b>Name:</b> ${name}</li>
                <li class="list__item"><b>Rasse:</b> ${breed}</li>
                <li class="list__item"><b>Geburtsjahr:</b> ${birthyear}</li>
                <li class="list__item"><b>Farbe:</b> ${color}</li>
                <li class="list__item"><b>Geschlecht:</b> ${gender}</li>
            </ul>
            `
        } else {
            var toggleElement = `
            <details>
                <summary class="summaryTitle">Mehr über ${name}</summary>
                <p class="summaryText">${text}</p>
                <ul class="list list--no-bullets">
                    <li class="list__item">Name: ${name}</li>
                    <li class="list__item">Rasse: ${breed}</li>
                    <li class="list__item">Geburtsjahr: ${birthyear}</li>
                    <li class="list__item">Farbe: ${color}</li>
                    <li class="list__item">Geschlecht: ${gender}</li>
                </ul>
            </details
            `
        }
        
        this.innerHTML =
        `
        ${toggleElement}
        `;
    }
    disconnectedCallback() {
        /* optional function */    
    };
};

customElements.define("rts-toggletext", RTSToggleText);