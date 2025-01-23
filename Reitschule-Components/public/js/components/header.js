class RTSHeader extends HTMLElement {

    connectedCallback() {
        console.log(`Header was loaded on page ${window.location.href}`)

        this.innerHTML =
        `
        <header class="header row">
             <h1 class="header__title col"><a class="link header__link" href="/">Reitschule Schluchebärg</a></h1>
        </header>
        `;
    }
    disconnectedCallback() {
        console.log(`Header was unloaded on page ${window.location.href}`)
    };
}

customElements.define("rts-header", RTSHeader);