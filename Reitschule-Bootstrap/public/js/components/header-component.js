class RTSHeader extends HTMLElement {

    connectedCallback() {
        this.innerHTML =
        `
        <header class="header row">
             <h1 class="header__title col"><a class="link header__link" href="/">Reitschule Schluchebärg</a></h1>
        </header>
        `;
    }
    disconnectedCallback() {
        /* optional function */    
    };
}

customElements.define("rts-header", RTSHeader);