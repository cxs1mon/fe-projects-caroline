const { Router } = require("express");
const ueberMichRouter = Router();
const {vorstellung, reiterfahrung, pferdehaltung} = require('../../config.js');
const ejs = require('ejs');

ueberMichRouter.get('/ueber-mich', async (req, res) => {
    try {
        const body = await ejs.renderFile('views/page-content/ueber-mich-content.ejs', {vorstellung, reiterfahrung, pferdehaltung});
        res.render('layout', {title: 'Meine Pferde', body});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error rendering the page");
    }
});

module.exports = ueberMichRouter;