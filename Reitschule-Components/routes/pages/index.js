const { Router } = require("express");
const indexRouter = Router();
const { meineLeidenschaft, meinZiel } = require('../../config.js');

indexRouter.get('/(index)?', (req, res) => {
    res.render('index', { meineLeidenschaft, meinZiel });
});

module.exports = indexRouter;