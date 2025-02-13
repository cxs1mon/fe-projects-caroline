const express = require("express");
const HorseController = require("../../controllers/horseController.js");
const adminRouter = express();

adminRouter.set("views", "./client/views");
adminRouter.set("view engine", "ejs");

// Get the horses
adminRouter.get("/admin", HorseController.getAllHorses);

// Add new horse
adminRouter.post("/admin/add", HorseController.addHorse);

// Delete horse
adminRouter.post(`/admin/delete/:id`, HorseController.deleteHorse);

// Update horse
adminRouter.post("/admin/edit/:id", HorseController.updateHorse);

// Get horse to update
adminRouter.get("/admin/edit/:id", HorseController.getUpdateHorse);

// Delete all horses
adminRouter.post("/admin/delete-all", HorseController.deleteAll);

module.exports = adminRouter;
