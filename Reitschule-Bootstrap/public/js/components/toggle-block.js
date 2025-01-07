

class RTSToggleText extends HTMLElement {
    

    connectedCallback() {
        const text = this.getAttribute('text');
        const name = this.getAttribute('name');

        if (window.innerWidth >= 768) {
            console.log("big" + window.innerWidth)
            var toggleElement = `
            <h5 class="summaryTitle">Mehr über ${name}</h5>
            <p class="summaryText">${text}</p>
            `
        } else {
            console.log("small" + window.innerWidth)
            var toggleElement = `
            <details>
            <summary class="summaryTitle">Mehr über ${name}</summary>
            <p class="summaryText">${text}</p>
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