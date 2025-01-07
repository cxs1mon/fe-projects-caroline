class RTSHead extends HTMLElement {

    connectedCallback() {
        console.log(`Head was loaded on page ${window.location.href}`)
        this.innerHTML =
        `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title><%= title %></title>
        <meta name="description" content="Reitschule Schluchebärg - Angebote für Reitunterricht und Voltegieren">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative&display=swap" rel="stylesheet">
        <link href="/css/style.css" rel="stylesheet">
        <script src="/js/components/header.js" defer></script>
        <script src="/js/components/nav.js" defer></script>
        <script src="/js/components/footer.js" defer></script>
        <script src="/js/components/text-block.js" defer></script>
        <script src="/js/components/horse-card-component.js" defer></script>
        <script src="/js/components/layout-component.js" defer></script>
        `;
    }
    disconnectedCallback() {
        console.log(`Head was unloaded on page ${window.location.href}`)
    }
}

customElements.define("rts-head", RTSHead);