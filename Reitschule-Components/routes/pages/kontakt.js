const { Router } = require("express");
const kontaktRouter = Router();
const { adressen, lage, kontaktformular} = require('../../config.js');
const ejs = require('ejs');

kontaktRouter.get('/kontakt', async (req, res) => {
    try {
        const body = await ejs.renderFile('views/page-content/kontakt-content.ejs', {adressen, lage, kontaktformular});
        res.render('layout', {title: 'Kontakt', body});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error rendering the page");
    }
});

module.exports = kontaktRouter;