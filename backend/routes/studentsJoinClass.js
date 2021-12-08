const router = require("express").Router();
const pool = require("../db/db");


//inserts students data into table 

router.post("/:course_id/:user_username/:user_firstname/:user_lastname", async(req, res) => {
    try {
        const results = await pool.query("INSERT INTO studentsjoined (course_id, user_username, user_firstname, user_lastname) VALUES ($1, $2, $3, $4) RETURNING *;", [req.params.course_id,req.params.user_username,req.params.user_firstname ,req.params.user_lastname])
    
        res.status(200).json({
            status: "success",
            data: {
                courses: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error joining class");
    }
});









module.exports = router;