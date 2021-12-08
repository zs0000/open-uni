const jwt = require("jsonwebtoken");
require("dotenv").config();


//Checking to see if a token exist and authenticates

module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");

        if(!jwtToken){
            return res.status(403).json("Not authorized");
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user;
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("Not Authorized");
    }
    next();
}