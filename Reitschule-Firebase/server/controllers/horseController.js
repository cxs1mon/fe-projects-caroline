const { body, validationResult } = require("express-validator");
const horseService = require("../services/horseServices");

class HorseController {
  async getAllHorses(req, res) {
    const searchText = req.query.searchText;
    try {
      const horses = await horseService.getAllHorses(searchText);
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
  }

  async deleteHorse(req, res) {
    const horseId = req.params.id;
    try {
      await horseService.deleteOneHorse(horseId);
      res.redirect("/admin");
    } catch (error) {
      console.error("Error deleting horse: ", error);
      res.status(500).send("Failed to delete horse.");
    }
  }

  async deleteAll(req, res) {
    try {
      await horseService.deleteAll();
      res.redirect("/admin");
    } catch (error) {
      console.error("Error deleting all horses: ", error);
      res.status(500).send("Failed to delete all horses.");
    }
  }

  async addHorse(req, res) {
    await Promise.all([
      body("name").trim().notEmpty().withMessage("Name is required").run(req),
      body("birthyear")
        .trim()
        .notEmpty()
        .withMessage("Birthyear is required")
        .isInt()
        .withMessage("Birthyear must be a number")
        .run(req),
      body("color").trim().notEmpty().withMessage("Color is required").run(req),
      body("breed").trim().notEmpty().withMessage("Breed is required").run(req),
      body("text").trim().optional().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, birthyear, color, breed, text } = req.body;
    const newHorse = { name, birthyear, color, breed, text };

    try {
      await horseService.addHorse(newHorse);
      res.redirect("/admin");
    } catch (error) {
      console.error("Error while adding horse:", error);
      res.status(500).send("Error while adding horse");
    }
  }

  async updateHorse(req, res) {
    const { id, name, birthyear, color, breed, text } = req.body;

    if (!name || !birthyear || !color || !breed || !text) {
      return res.status(400).send("Check your input, something's wrong.");
    }
    try {
      await horseService.updateHorse(id, name, birthyear, color, breed, text);
      res.redirect("/admin");
    } catch (error) {
      console.error("Error while updating horse.", error);
      res.status(500).send("Error while updating horse.");
    }
  }

  async getUpdateHorse(req, res) {
    const horseId = req.params.id;
    try {
      const horse = await horseService.getUpdateHorse(horseId);
      res.render("edit-horse", { horse });
    } catch (error) {
      res.status(500).send(error.message);
      console.error("horses db not loaded");
      console.error(error);
    }
  }
}

module.exports = new HorseController();
