const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const allRoutes = require("../app/routes");

app.use(`/`, allRoutes)

app.listen(PORT, () => console.log(`Server listening on: http://${HOST}:${PORT}`));