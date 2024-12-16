class RTSFooter extends HTMLElement {

    connectedCallback() {
        console.log(`Footer was loaded on page ${window.location.href}`)
        this.innerHTML =
        `
        <footer class="footer row">
            <figure class="footer__figure col">
                <a class="link footer__link" href="https://facbook.com">
                    <img class="footer__img" width="30" alt="Facebook link" src="./img/facebook.png">
                </a>
                <figcaption class="footer__text">Reitschule Schluchebärg</figcaption>
            </figure>
            <figure class="footer__figure col">
                <a class="link footer__link" href="https://instagram.com">
                    <img class="footer__img" width="30" alt="Instagram link" src="./img/instagram.png">
                </a>
                <figcaption class="footer__text">Reitschule Schluchebärg</figcaption>
            </figure>
            <figure class="footer__figure col">
                <img class="footer__img" width="30" src="./img/sonne.png" alt="Shining sun">
                <figcaption class="footer__text">Have a nice day!</figcaption>
            </figure>
        </footer>
        `;
    }
    disconnectedCallback() {
        console.log(`Footer was unloaded on page ${window.location.href}`)
    };
}

customElements.define("rts-footer", RTSFooter);