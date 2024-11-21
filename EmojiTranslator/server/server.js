/**
 * Main Server Configuration File
 * This file sets up the Express server with necessary middleware and routes
 */

// Import required npm packages
const express = require('express');  // Web framework for Node.js
const dotenv = require('dotenv');    // Load environment variables from .env file
const routes = require('./routes');  // Import custom route handlers
const helmet = require('helmet');    // Security middleware for Express

// Initialize environment variables from .env file
dotenv.config();

// Create Express application instance
const app = express();
// Set server port - use PORT from environment variables or default to 3000
const port = process.env.PORT || 3000;

// Configure Middleware
app.use(express.json());                         // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (form data)
app.use(express.static('public'));               // Serve static files from 'public' directory
app.use(helmet());                               // Add security headers to HTTP responses

// Register Routes
// Mount all routes defined in routes.js to the root path '/'
app.use('/', routes);

// Start the Express Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
