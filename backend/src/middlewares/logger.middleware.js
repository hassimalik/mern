const logger = (req, res, next) => {
    console.log(`${req.method} request is called ${req.url}`);
    next();
};

module.exports = logger;