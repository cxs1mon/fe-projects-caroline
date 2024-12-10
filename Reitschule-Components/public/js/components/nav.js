class RTSNav extends HTMLElement {

    connectedCallback() {
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
}

customElements.define("rts-nav", RTSNav);