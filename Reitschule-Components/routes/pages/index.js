const {Router} = require("express");
const indexRouter = Router();
const {meineLeidenschaft, meinZiel} = require('../../config.js');
const ejs = require('ejs');

indexRouter.get('/(index)?', async (req, res) => {
    try {
        const body = await ejs.renderFile('views/page-content/index-content.ejs', {meineLeidenschaft, meinZiel});
        res.render('layout', {title: 'Willkommen', body});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error rendering the page");
    }
});

module.exports = indexRouter;
