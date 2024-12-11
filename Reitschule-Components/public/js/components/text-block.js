class RTSTextBlock extends HTMLElement {

    connectedCallback() {
        const title = this.getAttribute('title');
        const text = this.getAttribute('text');
        let h3Element;
        
        if (this.getAttribute('prominent')) {
            console.log("prominent");
            h3Element = `<h3 class="text-block__subtitle text-block__subtitle--prominent">${title}</h3>`
        } else {
            console.log("not prominent")
            h3Element = `<h3 class="text-block__subtitle">${title}</h3>`
        }
        
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
}

customElements.define("rts-text-block", RTSTextBlock);