const express = require("express");
const app = express();
const { db } = require("../config/firebase.js");
const { body, validationResult } = require("express-validator");
const port = process.env.PORT || 8080;
const horsesService = require("../services/horseServices.js");
const indexRouter = require(`../routes/pages/index.js`);
const kontaktRouter = require(`../routes/pages/kontakt.js`);
const angebotRouter = require(`../routes/pages/angebot.js`);
const ueberMichRouter = require(`../routes/pages/ueber-mich.js`);
const apiRouter = require(`../routes/api/api-router.js`);
const horseServices = require("../services/horseServices.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", "./client/views");
app.set("view engine", "ejs");

app.use(express.static("client/public"));

app.get("/(index)?", indexRouter);
app.get("/kontakt", kontaktRouter);
app.get("/meine-pferde", apiRouter);
app.get("/angebot", angebotRouter);
app.get("/ueber-mich", ueberMichRouter);
app.post("/api/*", apiRouter);

// Get all horses or search for specific ones
app.get("/adm", async (req, res) => {
  const searchText = req.query.searchText;
  try {
    const horses = await horsesService.getAllHorses(searchText);
    const numOfHorses = horses.length;
    let showInfo = numOfHorses <= 0;
    res.render("horses", {
      horses,
      searchText,
      showInfo,
      activeFilter: !!searchText,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add new horse
app.post(
  "/adm/add",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("birthyear")
      .trim()
      .notEmpty()
      .withMessage("Birthyear is required")
      .isInt()
      .withMessage("Birthyear must be a number"),
    body("color").trim().notEmpty().withMessage("Color is required"),
    body("breed").trim().notEmpty().withMessage("Breed is required"),
    body("text").trim().optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, birthyear, color, breed, text } = req.body;

    const newHorse = {
      name,
      birthyear,
      color,
      breed,
      text,
    };

    try {
      await horsesService.addHorse(newHorse);
      res.redirect("/adm");
    } catch (error) {
      console.error("Error while adding horse:", error);
      res.status(500).send("Error while adding horse");
    }
  }
);

// Delete horse
app.post(`/adm/delete/:id`, async (req, res) => {
  const horseId = req.params.id;
  try {
    await horsesService.deleteOneHorse(horseId);
    res.redirect("/adm");
  } catch (error) {
    console.error("Error deleting horse: ", error);
    res.status(500).send("Failed to delete horse.");
  }
});

// Update horse
app.post("/adm/edit/:id", async (req, res) => {
  const { id, name, birthyear, color, breed, text } = req.body;

  if (!name || !birthyear || !color || !breed || !text) {
    return res.status(400).send("Check your input, something's wrong.");
  }
  try {
    await horsesService.updateHorse(id, name, birthyear, color, breed, text);
    res.redirect("/adm");
  } catch (error) {
    console.error("Error while updating horse.", error);
    res.status(500).send("Error while updating horse.");
  }
});

// Get horse to update
app.get("/adm/edit/:id", async (req, res) => {
  const horseId = req.params.id;
  try {
    const horse = await horsesService.getUpdateHorse(horseId);
    res.render("edit-horse", { horse });
  } catch (error) {
    res.status(500).send(error.message);
    console.error("horses db not loaded");
    console.error(error);
  }
});

// Delete all horses
app.post("/adm/delete-all", async (req, res) => {
  try {
    await horsesService.deleteAll();
    res.redirect("/adm");
  } catch (error) {
    console.error("Error deleting all horses: ", error);
    res.status(500).send("Failed to delete all horses.");
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
