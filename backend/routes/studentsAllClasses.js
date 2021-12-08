const router = require("express").Router();
const pool = require("../db/db");


//all courses available

router.get("/retrieve/:users", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM courses;")
    
        res.status(200).json({
            status: "success",
            data: {
                courses: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving classes");
    }
});









module.exports = router;