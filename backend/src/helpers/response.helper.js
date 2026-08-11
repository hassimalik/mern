const sendResponse = ({
    res,
    statusCode,
    success,
    message,
    data = null,
    meta = null,
}) => {
    return res.status(statusCode).json({
        success,
        statusCode,
        message,
        meta,
        data,
        timestamp: new Date().toLocaleTimeString(),
    });
};

module.exports = sendResponse;