const router = require("express").Router();
const pool = require("../db/db");


//Grab Safe Profile Data

router.get("/user_data/:user_username", async(req, res) => {
    try {
        const results = await pool.query("SELECT user_firstname, user_lastname FROM users WHERE user_username = $1;", [req.params.user_username])
    
        res.status(200).json({
            status: "success",
            data: {
                userdata: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving classes");
    }
});

//Grab all enrolled courses for selected user

router.get("/user_courses/:user_username", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM studentsjoined WHERE user_username = $1;", [req.params.user_username])
    
        res.status(200).json({
            status: "success",
            data: {
                usercourses: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving classes");
    }
});









module.exports = router;