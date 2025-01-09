

class RTSToggleText extends HTMLElement {
    

    connectedCallback() {
        const text = this.getAttribute('text');
        const name = this.getAttribute('name');
        const breed = this.getAttribute('breed');
        const birthyear = this.getAttribute('birthyear');
        const color = this.getAttribute('color');
        const gender = this.getAttribute('gender');

        if (window.innerWidth >= 768) {
            console.log("big" + window.innerWidth)
            var toggleElement = `
            <h5 class="summaryTitle">Mehr über ${name}</h5>
            <p class="summaryText">${text}</p>
            <ul class="list list--no-bullets">
                <li class="list__item">Name: ${name}</li>
                <li class="list__item">Rasse: ${breed}</li>
                <li class="list__item">Geburtsjahr: ${birthyear}</li>
                <li class="list__item">Farbe: ${color}</li>
                <li class="list__item">Geschlecht: ${gender}</li>
            </ul>
            `
        } else {
            console.log("small" + window.innerWidth)
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
        
        console.log(`A togglable text was loaded on page ${window.location.href}`)
        this.innerHTML =
        `
        ${toggleElement}
        `;
    }
    disconnectedCallback() {
        console.log(`A togglable text was unloaded on page ${window.location.href}`)
    };
};

customElements.define("rts-toggletext", RTSToggleText);