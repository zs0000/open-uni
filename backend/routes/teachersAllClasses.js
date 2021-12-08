const router = require("express").Router();
const pool = require("../db/db");


//all courses based on professors username.

router.get("/retrieve/:professor_username", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM courses WHERE (professor_username) = ($1)", [req.params.professor_username])
    
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