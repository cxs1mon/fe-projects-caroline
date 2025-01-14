const { Router } = require("express");
const meinePferdeRouter = Router();
const {
  horse1,
  horse2,
  horse3,
  horse4,
  horse5,
  horse6,
} = require("../../config.js");

meinePferdeRouter.get("/meine-pferde", async (req, res) => {
  res.render("meine-pferde-content", {
    horse1,
    horse2,
    horse3,
    horse4,
    horse5,
    horse6,
    title: "Meine Pferde",
  });
});

module.exports = meinePferdeRouter;
