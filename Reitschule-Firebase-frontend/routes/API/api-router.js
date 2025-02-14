const express = require("express");
const apiRouter = express.Router();
const { body, validationResult } = require("express-validator");
const { db } = require("../../firebase");

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

const date = new Date();
const formattedDate = date.toISOString().split("T")[0];

// Add body parsing middleware
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

// Get all horses
apiRouter.get("/meine-pferde", async (req, res) => {
  try {
    const horsesSnapshot = await db.collection("stable").get();
    const horses = [];
    horsesSnapshot.forEach((doc) => {
      horses.push({ id: doc.id, ...doc.data() });
    });
    console.log(horses);
    res.render("meine-pferde-content", {horses, title: "Meine Pferde"});
  } catch (error) {
    res.status(500).send(error.message);
    console.error("horses db not loaded");
    console.error(error);
  }
});

apiRouter.post(
  "/api/contact-form",
  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .isString()
      .customSanitizer((value) => {
        // Überprüft, ob der Wert ein Leerzeichen enthält und entfernt es
        return value.replace(/\s/, "-");
      }),
    body("birthdate").trim().isDate().isBefore(formattedDate),
    body("email").trim().isEmail(),
    body("phone").trim().isLength({ min: 10 }).isNumeric(),
    body("phone").trim(),
    body("topic").trim(),
    body("message").trim(),
  ],
  (req, res) => {
    console.log("Received body:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    const { name, birthdate, email, phone, experience, topic, message } =
      req.body;
    console.log("Contact form submission:", {
      name,
      birthdate,
      email,
      phone,
      experience,
      topic,
      message,
    });

    res.json({
      success: true,
      data: { name, birthdate, email, phone, experience, topic, message },
    });
  }
);

module.exports = apiRouter;
