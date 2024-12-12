const { Router } = require("express");
const indexRouter = Router();
const { meineLeidenschaft, meinZiel } = require('../../config.js');

indexRouter.get('/(index)?', (req, res) => {
    res.render('layout', { meineLeidenschaft, meinZiel, body: "<%- include('views/page-content/index-content.ejs') %>" });
});

module.exports = indexRouter;