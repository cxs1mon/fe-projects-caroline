const { Router } = require("express");
const allRoutes = Router();
const { body, validationResult } = require("express-validator");
const express = require('express');

const date = new Date();
const formattedDate = date.toISOString().split('T')[0];

// Add body parsing middleware
allRoutes.use(express.json());
allRoutes.use(express.urlencoded({ extended: true }));

allRoutes.get("/(index)?(.html)?", (req, res) => res.render('index'));
allRoutes.get("/angebot(.html)?", (req, res) => res.render('angebot'));
allRoutes.get("/meine-pferde(.html)?", (req, res) => res.render('meine-pferde'));
allRoutes.get("/kontakt(.html)?", (req, res) => res.render('kontakt'));

allRoutes.post("/api/contact-form", [
    body('name').trim().isLength({ min: 2 }).isAlpha(),
    body('birthdate').trim().isLength({ min: 10 }).isDate().isBefore(formattedDate),
    body('email').trim().isEmail(),
    body('phone').trim().isLength({ min: 10 }).isNumeric(),
    body('phone').trim(),
    body('topic').trim(),
    body('message').trim()
], (req, res) => {
    console.log('Received body:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    const { name, birthdate, email, phone, experience, topic, message } = req.body;
    console.log('Contact form submission:', { name, birthdate, email, phone, experience, topic, message });

    res.json({
        success: true,
        data: { name, birthdate, email, phone, experience, topic, message }
    });
});

allRoutes.get("/ueber-mich(.html)?", (req, res) => res.render('ueber-mich'));

module.exports = allRoutes;