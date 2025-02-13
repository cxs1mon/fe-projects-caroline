class RTSToggleText extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute("name");
    const breed = this.getAttribute("breed");
    const birthyear = this.getAttribute("birthyear");
    const color = this.getAttribute("color");
    const text = this.getAttribute("text");

    if (window.innerWidth >= 768) {
      var toggleElement = `
            <h5 class="summaryTitle">Mehr über ${name}</h5>
            <ul class="list list--no-bullets">
                <li class="list__item"> ${text}</li>
                <li class="list__item"><b>Name:</b> ${name}</li>
                <li class="list__item"><b>Rasse:</b> ${breed}</li>
                <li class="list__item"><b>Geburtsjahr:</b> ${birthyear}</li>
                <li class="list__item"><b>Farbe:</b> ${color}</li>
            </ul>
            `;
    } else {
      var toggleElement = `
            <details>
                <summary class="summaryTitle">Mehr über ${name}</summary>
                <ul class="list list--no-bullets">
                    <li class="list__item"> ${text}</li>
                    <li class="list__item">Name: ${name}</li>
                    <li class="list__item">Rasse: ${breed}</li>
                    <li class="list__item">Geburtsjahr: ${birthyear}</li>
                    <li class="list__item">Farbe: ${color}</li>
                </ul>
            </details
            `;
    }

    this.innerHTML = `
        ${toggleElement}
        `;
  }
}

customElements.define("rts-toggletext", RTSToggleText);
