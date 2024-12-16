class RTSTextBlock extends HTMLElement {

    connectedCallback() {
        const title = this.getAttribute('title');
        const text = this.getAttribute('text');
        let h3Element;
        
        if (this.getAttribute('prominent')) {
            console.log(`"${title}" is prominent`);
            h3Element = `<h3 class="text-block__subtitle text-block__subtitle--prominent">${title}</h3>`
        } else {
            console.log(`"${title}" is not prominent`)
            h3Element = `<h3 class="text-block__subtitle">${title}</h3>`
        }
        console.log(`Text block was loaded on page ${window.location.href}`)

        this.innerHTML =
        `
        <section class="text-block">
            ${h3Element}    
            <p class="text-block__text">
                ${text}
            </p>
        </section>
        `;
    }   
    disconnectedCallback() {
        console.log(`Text block was unloaded on page ${window.location.href}`)
    }
}

customElements.define("rts-text-block", RTSTextBlock);