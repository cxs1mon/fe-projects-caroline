const { Router } = require("express");
const meinePferdeRouter = Router();
const { horse1, horse2, horse3, horse4, horse5, horse6} = require('../../config.js');
const ejs = require('ejs');

meinePferdeRouter.get('/meine-pferde', async (req, res) => {
    try {
        const body = await ejs.renderFile('views/page-content/meine-pferde-content.ejs', {horse1, horse2, horse3, horse4, horse5, horse6});
        res.render('layout', {title: 'Meine Pferde', body});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error rendering the page");
    }
});

module.exports = meinePferdeRouter;