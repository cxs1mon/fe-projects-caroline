const { Router } = require('express');
const indexRouter = Router();
const { meineLeidenschaft, meinZiel } = require('../../config.js');

indexRouter.get('/', async (req, res) => {
    res.render('index-content', {meineLeidenschaft, meinZiel, title: 'Willkommen'});
});

module.exports = indexRouter;