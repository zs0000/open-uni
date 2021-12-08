const router = require("express").Router();
const pool = require("../db/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");


//register 

router.post("/register", validInfo, async(req, res) => {
    try {
        
        const {  firstname, lastname,username, email, password, role } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email =$1", [
            email
        ]);

        // check if user exist

        if(user.rows.length !== 0){
            return  res.status(403).send("User already exists");
        }

        // hash password if user does exist

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (user_firstname, user_lastname, user_username, user_email, user_password, user_role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
        [firstname, lastname,username, email, bcryptPassword, role]);

        // generate a JWT token and store user info + token into users table (Postgres)

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token, username});

    } catch (err) {
        console.error(err.message);
        res.status(500).send       
    }
});

// logging in 
router.post("/login", validInfo, async(req, res)=>{
    try {

        const { email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        // check if user exist

        if(user.rows.length === 0) {
            return res.status(401).json("The information provided doesn't match any registered accounts.");
        }

        //compare password to stored hashed password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword) {
            return res.status(401).json("Password or email is incorrect");
        }
        
        //generate token if password matches

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token, username: user.rows[0].user_username, role: user.rows[0].user_role, firstname: user.rows[0].user_firstname, lastname: user.rows[0].user_lastname})

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
   
router.get("/is-verify", authorization, async (req, res) => {

//if token is valid, return true to authorize user (changes isAuthenticated to (true) )

try {
    res.json(true);
} catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error")
}
});


module.exports = router;