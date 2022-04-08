const router = require("express").Router();
const pool = require("../db/db");


//all courses available

router.get("/retrieve", async(req, res) => {
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

router.get("/all/:user_username", async(req,res) => {
    try {
        const results = await pool.query("SELECT * FROM studentsjoined WHERE user_username = $1;",[req.params.user_username])

         res.status(200).json({
             status: "success",
             data: {
                 enrolledCourses: results.rows,
             }
         })
        
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving enrolled classes")
    }
})







module.exports = router;