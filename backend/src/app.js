const express = require("express");

const app = express();
const logger = require("./middlewares/logger.middleware")

app.use(logger)

app.use((req, res, next) => {
    console.log('A request came!');
    next();
})

app.use()

app.use("/api", routes)

app.get('/', (req, res)=>{
    res.send("Hello Hassaan!")
})


module.exports = app;