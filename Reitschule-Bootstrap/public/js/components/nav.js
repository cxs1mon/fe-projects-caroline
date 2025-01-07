class RTSNav extends HTMLElement {

    connectedCallback() {
        console.log(`Navigation was loaded on page ${window.location.href}`)
        this.innerHTML =
        `
        <nav class="nav">
            <ul class="nav__list">
                <li class="nav__item "><a class="link nav__link" href="/">Home</a></li>
                <li class="nav__item "><a class="link nav__link" href="angebot">Angebot</a></li>
                <li class="nav__item "><a class="link nav__link" href="meine-pferde">Meine Pferde</a></li>
                <li class="nav__item "><a class="link nav__link" href="ueber-mich">Über mich</a></li>
                <li class="nav__item "><a class="link nav__link" href="kontakt">Kontakt</a></li>
            </ul>
        </nav>
        `;
    }
    disconnectedCallback() {
        console.log(`Navigation was unloaded on page ${window.location.href}`)
    }
}

customElements.define("rts-nav", RTSNav);