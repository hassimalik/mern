const logger = (req, res, next) => {

    const start = Date.now();


    res.on("finish", () => {

        const duration = Date.now() - start;


        console.log(
            `${req.method} ${req.originalUrl}
            Status: ${res.statusCode}
            Time: ${duration}ms`
        );

    });
    next();
};


module.exports = logger;