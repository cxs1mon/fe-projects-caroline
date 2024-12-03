const { Router } = require("express");
const allRoutes = Router();
const { body, validationResult } = require("express-validator");
const express = require('express');

// Add body parsing middleware
allRoutes.use(express.json());
allRoutes.use(express.urlencoded({ extended: true }));

allRoutes.get("/(index)?(.html)?", (req, res) => res.render('index'));
allRoutes.get("/angebot(.html)?", (req, res) => res.render('angebot'));
allRoutes.get("/meine-pferde(.html)?", (req, res) => res.render('meine-pferde'));
allRoutes.get("/kontakt(.html)?", (req, res) => res.render('kontakt'));

allRoutes.post("/api/contact-form", [
    body('name').trim().isLength({ min: 2 }).escape(),
    body('phone').trim().isLength({ min: 5 }).escape(),
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
    const { name, phone } = req.body;
    console.log('Contact form submission:', { name, phone });
    res.json({
        success: true,
        data: { name, phone }
    });
});

allRoutes.get("/ueber-mich(.html)?", (req, res) => res.render('ueber-mich'));

module.exports = allRoutes;