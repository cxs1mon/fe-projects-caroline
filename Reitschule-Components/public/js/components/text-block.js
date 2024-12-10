class RTSTextBlock extends HTMLElement {

    connectedCallback() {
        const title = this.getAttribute('title');
        const text = this.getAttribute('text');
        
        this.innerHTML =
        `
        <section class="text-block">
            <h3 class="text-block__subtitle">${title}</h3>
            <p class="text-block__text">
                ${text}
            </p>
        </section>
        `;
    }
}

customElements.define("rts-text-block", RTSTextBlock);