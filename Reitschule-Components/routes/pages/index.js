const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/(index)?", (req, res) => res.render('index'));

module.exports = indexRouter;