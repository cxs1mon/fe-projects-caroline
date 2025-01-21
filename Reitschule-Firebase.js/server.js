const express = require("express");
const app = express();
const { db } = require("./config/firebase");
const port = process.env.PORT || 8383;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(`public`));

// Get all horses
app.get("/", async (req, res) => {
  try {
    const horsesSnapshot = await db.collection("stable").get();
    const horses = [];
    horsesSnapshot.forEach((doc) => {
      horses.push({ id: doc.id, ...doc.data() });
    });
    res.render("horses", { horses });
  } catch (error) {
    res.status(500).send(error.message);
    console.error("horses db not loaded");
    console.error(error);
  }
});

// Add new horse
app.post("/api/add", async (req, res) => {
  const { name, age, color, breed } = req.body;

  if (!name || !age || !color || !breed) {
    return res.status(400).send("Check your input, something is missing.");
  }
  try {
    await db.collection("stable").add({
      name,
      age,
      color,
      breed,
    });
    res.status(201).send("New horse added!");
  } catch (error) {
    console.error("Error while adding horse.", error);
    res.status(500).send("Error while adding horse.");
  }
});

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
  const { id, name, age, color, breed } = req.body;

  if (!name || !age || !color || !breed) {
    return res.status(400).send("Check your input, something's wrong.");
  }
  try {
    await db.collection("stable").doc(id).update({
      name: name,
      age: age,
      color: color,
      breed: breed,
    });
    const horsesSnapshot = await db.collection("stable").get();
    const horses = [];
    horsesSnapshot.forEach((doc) => {
      horses.push({ id: doc.id, ...doc.data() });
    });

    console.log("all horses (server.js post edit): ", horses);
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
