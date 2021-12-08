const router = require("express").Router();
const pool = require("../db/db");


//check user logged in, return username

router.post("/new", async(req, res) => {
    try {
        const results = await pool.query("INSERT INTO courses (professor, professor_username, course_title, course_description, course_category, course_capacity, course_tag) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;", [req.body.professor, req.body.professor_username, req.body.course_title ,req.body.course_description ,req.body.course_category, req.body.course_capacity, req.body.course_tag])
        console.log(results)
        res.status(200).json({
            status: "success",
            data: {
                courses: results.rows[0],
            }
        })
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving users");
    }
});

module.exports = router;