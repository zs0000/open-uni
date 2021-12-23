const router = require("express").Router();
const pool = require("../db/db");

//grabs all detials for one assignment

router.get("/:course_id/:assignment_id", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM assignments WHERE (assignment_id) = ($1)", [req.params.assignment_id])
    
        res.status(200).json({
            status: "successfully retrieved assignment details",
            data: {
                assignment: results.rows[0],
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving assignment details");
    }
});


module.exports = router;