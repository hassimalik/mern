const express = require("express");

const app = express();

const logger = require("./middlewares/logger.middleware");
const routes = require("./routes");

app.use(logger);

app.use(express.json());

app.use((req, res, next) => {
    console.log("A request came!");
    next();
});

app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Hello Hassaan!");
});

module.exports = app;