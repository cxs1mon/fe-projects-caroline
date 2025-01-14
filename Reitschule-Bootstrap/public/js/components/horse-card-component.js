class RTSHorseCard extends HTMLElement {

    connectedCallback() {
        const name = this.getAttribute('name');
        const photosrc = this.getAttribute('photo-src');
        const alt = this.getAttribute('alt');
        const id = this.getAttribute('id');

        console.log(`Horse-card was loaded on page ${window.location.href}`)


        this.innerHTML =
        `
        <div class="col" id="${id}">
          <div class="card shadow-sm">
            <img src="${photosrc}" class="bd-placeholder-img horse-card-image" height="225" alt="${alt}">
            <div class="card-body align-items-center">
              <p class="card-text">${name}</p>
            </div>
          </div>
        </div>
        `;

      
    }
    disconnectedCallback() {
        console.log(`Horse-card was unloaded on page ${window.location.href}`)
    };
}

customElements.define("rts-horse-card", RTSHorseCard);