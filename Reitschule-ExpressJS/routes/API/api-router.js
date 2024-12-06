const { Router } = require("express");
const apiRouter = Router();
const { body, validationResult } = require("express-validator");
const express = require('express');

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

const date = new Date();
const formattedDate = date.toISOString().split('T')[0];

// Add body parsing middleware
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

apiRouter.post("/api/contact-form", [
    body('name').trim().isLength({ min: 2 }).isAlpha(),
    body('birthdate').trim().isDate().isBefore(formattedDate),
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

module.exports = apiRouter;