class RTSHero extends HTMLElement {
  connectedCallback() {
    const media = this.getAttribute("media");
    const title = this.getAttribute("title");
    const hero_body = this.getAttribute("hero_body");

    this.innerHTML = `
    <div class="container col-xxl-10 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-1">
            <div class="col-10 col-sm-8 col-lg-6">
                ${media}
            </div>
            <div class="col-lg-6">
                <h1 class=" text-block__title display-5 fw-bold lh-1 mb-3">${title}</h1>
                ${hero_body}
            </div>
        </div>
    </div>
    `;
  }
}

customElements.define("rts-hero", RTSHero);
