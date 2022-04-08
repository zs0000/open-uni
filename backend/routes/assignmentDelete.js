const router = require("express").Router();
const pool = require("../db/db");


//delete a single assignment

router.delete("/delete/:course_id/:assignment_id", async(req, res) => {
    try {
        const results = await pool.query("DELETE FROM assignments WHERE (course_id, assignment_id) = ($1, $2)", [req.params.course_id, req.params.assignment_id])
        console.log(results)
        res.status(200).json({
            status: "successfully deleted assignment",
            data: {
                assignment_row: results.rows[0],
            }
        })
    } catch (err) {
        console.error(err);
        res.status(401).json("Error deleted assignment");
    }
});

module.exports = router;