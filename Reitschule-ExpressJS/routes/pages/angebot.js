const { Router } = require("express");
const angebotRouter = Router();

angebotRouter.get("/angebot", (req, res) => {
    res.render('layout', {
        body: 'angebot'
    });
});

module.exports = angebotRouter;