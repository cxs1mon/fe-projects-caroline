const { Router } = require("express");
const indexRouter = Router();

indexRouter.get('/(index)?', (req, res) => {
    res.render('layout', {
        body: 'index'
    });
});

module.exports = indexRouter;
