const { Router } = require("express");
const meinePferdeRouter = Router();

meinePferdeRouter.get("/meine-pferde", (req, res) => {
    res.render('layout', {
        body: 'meine-pferde'
    });
});

module.exports = meinePferdeRouter;