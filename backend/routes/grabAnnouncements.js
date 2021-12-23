const router = require("express").Router();
const pool = require("../db/db");

//grabs one annoucements

router.get("/:course_id/:announcement_id", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM announcements WHERE (announcement_id) = ($1)", [req.params.annoucement_id])
    
        res.status(200).json({
            status: "successfully retrieved annoucement",
            data: {
                announcement: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving annoucement");
    }
});

//Retrieves all announcements for one course
router.get("/:course_id", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM announcements WHERE (course_id) = ($1)", [req.params.course_id])
    
        res.status(200).json({
            status: "successfully retrieved annoucements",
            data: {
                announcements: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving annoucements");
    }
});

//Retrieves most recent announcement for a course
router.get("/grab/recent/:course_id", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM announcements WHERE (course_id) = ($1) ORDER BY announcement_post_date DESC LIMIT 1;", [req.params.course_id])
    
        res.status(200).json({
            status: "successfully retrieved recent annoucement",
            data: {
                announcements: results.rows[0],
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving recent annoucement");
    }
});


module.exports = router;