const express = require("express");

const app = express();
const cors = require("cors");
const logger = require("./middlewares/logger.middleware");
const routes = require("./routes");

app.use(cors());

app.use(logger);

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Hello Hassaan!");
});

// 404 Handler (must be the last route)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

module.exports = app;