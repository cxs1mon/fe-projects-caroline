const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const indexRouter = require(`./routes/pages/index`);
const kontaktRouter = require(`./routes/pages/kontakt`);
const angebotRouter = require(`./routes/pages/angebot`);
const ueberMichRouter = require(`./routes/pages/ueber-mich`);
const apiRouter = require(`./routes/api/api-router`);
const adminRouter = require("./routes/admin/admin-router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", "./client/views");
app.set("view engine", "ejs");

app.use(express.static("client/public"));

app.get("/(index)?", indexRouter);
app.get("/kontakt", kontaktRouter);
app.get("/meine-pferde", apiRouter);
app.get("/angebot", angebotRouter);
app.get("/ueber-mich", ueberMichRouter);
app.post("/api/*", apiRouter);

app.get("/admin(/*)?", adminRouter);
app.post("/admin(/*)?", adminRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
