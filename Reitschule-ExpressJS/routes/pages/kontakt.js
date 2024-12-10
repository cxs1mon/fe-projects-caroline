const { Router } = require("express");
const kontaktRouter = Router();

kontaktRouter.get("/kontakt", (req, res) => {
    res.render('layout', {
        body: 'kontakt'
    });
});

module.exports = kontaktRouter;