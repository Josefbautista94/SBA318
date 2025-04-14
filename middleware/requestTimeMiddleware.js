// Adds a requestTime property to the req object
const requestTime = (req,res,next) => {
    req.requestTime= new Date();
    next();
}

module.exports = requestTime;