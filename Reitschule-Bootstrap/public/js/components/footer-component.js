class RTSFooter extends HTMLElement {

    connectedCallback() {
        console.log(`Footer was loaded on page ${window.location.href}`)
        this.innerHTML =
        `
        <div class="container">
            <footer class="py-3 my-4">
                <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                    <li class="nav-item"><a class="nav-link px-2 text-body-secondary" href="/">Home</a></li>
                    <li class="nav-item"><a class="nav-link px-2 text-body-secondary" href="angebot">Angebot</a></li>
                    <li class="nav-item"><a class="nav-link px-2 text-body-secondary" href="meine-pferde">Meine Pferde</a></li>
                    <li class="nav-item"><a class="nav-link px-2 text-body-secondary" href="ueber-mich">Über mich</a></li>
                    <li class="nav-item"><a class="nav-link px-2 text-body-secondary" href="kontakt">Kontakt</a></li>
                </ul>
                <p class="text-center text-body-secondary">&copy; 2024 Company, Inc</p>
            </footer>
        </div>
        `;
    }
    disconnectedCallback() {
        console.log(`Footer was unloaded on page ${window.location.href}`)
    };
}

customElements.define("rts-footer", RTSFooter);