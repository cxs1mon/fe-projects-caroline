const { Router } = require("express");
const meinePferdeRouter = Router();
const { horse1, horse2, horse3, horse4, horse5, horse6} = require('../../config.js');

meinePferdeRouter.get("/meine-pferde", (req, res) => res.render('meine-pferde',{ horse1, horse2, horse3, horse4, horse5, horse6}));

module.exports = meinePferdeRouter;