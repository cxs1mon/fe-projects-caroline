class RTSNav extends HTMLElement {

    connectedCallback() {
        console.log(`Navigation was loaded on page ${window.location.href}`)
        this.innerHTML =
        `
        <nav class="navbar navbar-expand-md navbar-green fixed-top bg-green">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Reitschule Schluchebärg</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        `;

        // initializing collapse functionality
        const navbarToggler = this.querySelector('.navbar-toggler');
        const navbarCollapse = this.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', () => {
                navbarCollapse.classList.toggle('show');
            });
        }
    }
    disconnectedCallback() {
        console.log(`Navigation was unloaded on page ${window.location.href}`)
    }
}

customElements.define("rts-nav", RTSNav);