const router = require("express").Router();
const pool = require("../db/db");


//inserts students data into table with class details

router.post("/:course_id/:user_username/:user_firstname/:user_lastname/:course_user_combo/:course_tag/:course_title/:professor", async(req, res) => {
    try {
        const results = await pool.query("INSERT INTO studentsjoined (course_id, user_username, user_firstname, user_lastname, course_user_combo, course_tag, course_title, professor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;", [req.params.course_id,req.params.user_username,req.params.user_firstname ,req.params.user_lastname, req.params.course_user_combo, req.params.course_tag, req.params.course_title, req.params.professor])
    
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