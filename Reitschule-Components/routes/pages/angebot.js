const { Router } = require("express");
const angebotRouter = Router();
const { gruppenEinzelnterricht, anmeldung, voltegieren, voltegierPreise, gruppeEinzelPreise } = require('../../config.js');
const ejs = require('ejs');

angebotRouter.get('/angebot', async (req, res) => {
    try {
        const body = await ejs.renderFile('views/page-content/angebot-content.ejs', {gruppenEinzelnterricht, anmeldung, voltegieren, voltegierPreise, gruppeEinzelPreise});
        res.render('layout', {title: 'Angebot', body});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error rendering the page");
    }
});

module.exports = angebotRouter;