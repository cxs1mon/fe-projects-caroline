const express = require("express");
const app = express();
const { db } = require("./config/firebase");
const { body, validationResult } = require("express-validator");
const port = process.env.PORT || 8383;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(`public`));

// Get all horses or search for specific ones
app.get("/", async (req, res) => {
  const searchText = req.query.searchText;
  const betterSearchText = searchText
    ? searchText.replace(/^(\+|\s)+|(\+|\s)+$/g, "")
    : "";

  try {
    let query = db.collection("stable");
    let horses = [];
    const horsesSnapshot = await query.get();
    horsesSnapshot.forEach((doc) => {
      horses.push({ id: doc.id, ...doc.data() });
    });
    let activeFilter;

    if (betterSearchText) {
      const regex = new RegExp(betterSearchText, "i");
      horses = horses.filter((horse) => regex.test(horse.name));
      activeFilter = true;
      console.log(betterSearchText);
    }

    const numOfHorses = Object.keys(horses).length;
    // if numOfHorses is bigger or equal to 1
    let showInfo;
    showInfo = numOfHorses <= 0;
    res.render("horses", {
      horses,
      searchText: betterSearchText,
      showInfo,
      activeFilter,
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.error("Horses db not loaded");
    console.error(error);
  }
});

// Add new horse
app.post(
  "/api/add",
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
      await db.collection("stable").add(newHorse);
      res.redirect("/");
    } catch (error) {
      console.error("Error while adding horse:", error);
      res.status(500).send("Error while adding horse");
    }
  }
);

// Delete horse
app.post(`/api/delete/:id`, async (req, res) => {
  const horseId = req.params.id;
  try {
    await db.collection("stable").doc(horseId).delete();
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting horse: ", error);
    res.status(500).send("Failed to delete horse.");
  }
});
// Update horse
app.post("/api/edit/:id", async (req, res) => {
  const { id, name, birthyear, color, breed, text } = req.body;

  if (!name || !birthyear || !color || !breed || !text) {
    return res.status(400).send("Check your input, something's wrong.");
  }
  try {
    await db.collection("stable").doc(id).update({
      name: name,
      birthyear: birthyear,
      color: color,
      breed: breed,
      text: text,
    });
    const horsesSnapshot = await db.collection("stable").get();
    const horses = [];
    horsesSnapshot.forEach((doc) => {
      horses.push({ id: doc.id, ...doc.data() });
    });

    res.redirect("/");
  } catch (error) {
    console.error("Error while updating horse.", error);
    res.status(500).send("Error while updating horse.");
  }
});

// Get horse to update
app.get("/api/edit/:id", async (req, res) => {
  const horseId = req.params.id;
  try {
    const horseSnapshot = await db.collection("stable").doc(horseId).get();
    const horse = { id: horseSnapshot.id, ...horseSnapshot.data() };
    res.render("edit-horse", { horse });
  } catch (error) {
    res.status(500).send(error.message);
    console.error("horses db not loaded");
    console.error(error);
  }
});

// Delete all horses
app.post("/api/delete-all", async (req, res) => {
  try {
    // get all documents
    const val = await db.collection("stable").listDocuments();

    // for each document, delete it
    for (let i = 0; i < val.length; i++) {
      const document = val[i];
      await document.delete();
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error deleting all horses: ", error);
    res.status(500).send("Failed to delete all horses.");
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
