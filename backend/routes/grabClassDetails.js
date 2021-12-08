const router = require("express").Router();
const pool = require("../db/db");


//all courses based on professors username.

router.get("/retrieve/:course_id", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM courses WHERE (course_id) = ($1)", [req.params.course_id])
    
        res.status(200).json({
            status: "success",
            data: {
                courseDetails: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving class details");
    }
});




module.exports = router;