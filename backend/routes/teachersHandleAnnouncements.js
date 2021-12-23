const router = require("express").Router();
const pool = require("../db/db");


//Create New announcement Route

router.post("/new", async(req, res) => {
    try {
        const results = await pool.query("INSERT INTO announcements (course_id, announcement_title, announcement_description, announcement_post_date,  announcement_material_link) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [req.body.course_id, req.body.announcement_title, req.body.announcement_description, req.body.announcement_post_date, req.body.announcement_material_link])
    
        res.status(200).json({
            status: "successfully created announcement",
            data: {
                announcementData: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error creating announcement");
    }
});









module.exports = router;