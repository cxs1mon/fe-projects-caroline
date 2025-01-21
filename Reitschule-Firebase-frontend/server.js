const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";
const angebotRouter = require(`./routes/pages/angebot`);
const indexRouter = require(`./routes/pages/index`);
const kontaktRouter = require(`./routes/pages/kontakt`);
const meinePferdeRouter = require(`./routes/pages/meine-pferde`);
const ueberMichRouter = require(`./routes/pages/ueber-mich`);
const apiRouter = require(`./routes/API/api-router`);
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/(index)?", indexRouter);
//app.get("/kontakt", kontaktRouter);
app.get("/kontakt", apiRouter);
app.get("/angebot", angebotRouter);
app.get("/meine-pferde", meinePferdeRouter);
app.get("/ueber-mich", ueberMichRouter);

app.post("/*", apiRouter);

app.listen(PORT, () =>
  console.log(`Server listening on: 
http://${HOST}:${PORT}`)
);
