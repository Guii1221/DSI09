// authMiddleware.js
module.exports = (req, res, next) => {
    console.log("Auth middleware");
    next();
};