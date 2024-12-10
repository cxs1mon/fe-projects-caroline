class RTSHorseCard extends HTMLElement {

    connectedCallback() {
        const name = this.getAttribute('name');
        const breed = this.getAttribute('breed');
        const birthyear = this.getAttribute('birthyear');
        const color = this.getAttribute('color');
        const gender = this.getAttribute('gender');
        const photosrc = this.getAttribute('photo-src');
        const alt = this.getAttribute('alt');

        this.innerHTML =
        `
        <hr>
        <section class="horse-overview">
            <ul class="list list--no-bullets">
                <li class="list__item">${name}</li>
                <li class="list__item">${breed}</li>
                <li class="list__item">${birthyear}</li>
                <li class="list__item">${color}</li>
                <li class="list__item">${gender}</li>
            </ul>
    
            <figure class="image__figure">
                <img class="image__img image__img--profile" src="${photosrc}" height="600" alt="${alt}">
            </figure>
        </section>  
        `;
    }
}

customElements.define("rts-horse-card", RTSHorseCard);