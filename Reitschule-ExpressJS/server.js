const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const allRoutes = require(`./routes/pages`);
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use('/', allRoutes);

app.listen(PORT, () => console.log(`Server listening on: 
http://${HOST}:${PORT}`));
