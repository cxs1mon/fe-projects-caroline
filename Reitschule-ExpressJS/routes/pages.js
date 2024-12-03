const { Router } = require("express");
const allRoutes = Router();
const { body, validationResult } = require("express-validator");

allRoutes.get("/(index)?(.html)?", (req, res) => res.render('index'));

allRoutes.get("/angebot(.html)?", (req, res) => res.render('angebot'));

allRoutes.get("/meine-pferde(.html)?", (req, res) => res.render('meine-pferde'));

allRoutes.get("/kontakt(.html)?", (req, res) => res.render('kontakt'));

allRoutes.post("/kontakt", (req, res) => {
    const { name, phone } = req.body;

    console.log(name);
    console.log(phone);

    // Basic server-side validation as backup
    if (!name || !phone) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }    // Log and send response
    console.log('Contact form:', { name, phone });
    res.json({
        success: true,
        data: { name, phone }
    });
});

allRoutes.get("/ueber-mich(.html)?", (req, res) => res.render('ueber-mich'));

module.exports = allRoutes;