class RTSFooter extends HTMLElement {

    connectedCallback() {
        this.innerHTML =
        `
        <div class="container">
            <footer class="py-3 my-4 border-top pt-3">
                <p class="  text-center text-body-secondary">&copy; 2025 Caroline Simon - <a href="mailto:caroline.simon@gmx.ch" target="" class="link--underline link text-body-secondary">caroline.simon@gmx.ch</a></p>
                <p class="text-center text-body-secondary">Made with <a href="https://getbootstrap.com/" class="link text-body-secondary link--underline">Bootstrap</a> examples</p>
            </footer>
        </div>
        `;
    }
    disconnectedCallback() {
        /* optional function */
    };
}

customElements.define("rts-footer", RTSFooter);