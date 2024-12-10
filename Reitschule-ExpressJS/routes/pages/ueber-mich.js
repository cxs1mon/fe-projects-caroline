const { Router } = require("express");
const ueberMichRouter = Router();

ueberMichRouter.get("/ueber-mich", (req, res) => {
    res.render('layout', {
        body: 'ueber-mich'
    });
});

module.exports = ueberMichRouter;