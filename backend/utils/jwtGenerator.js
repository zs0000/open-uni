const jwt = require("jsonwebtoken");
require('dotenv').config();

//Generates a week long token. stored in users table and localStorage

function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "168hr"})
}
module.exports = jwtGenerator;