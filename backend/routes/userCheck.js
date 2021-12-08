const router = require("express").Router();
const pool = require("../db/db");
const authorization = require("../middleware/authorization");

//check user logged in, return username

router.get("/:users", async(req, res) => {
    try {
        const results = await pool.query("SELECT user_username, user_role FROM users WHERE user_username = $1", [req.params.users]);
        res.status(200).json({
            status: "success",
            data: {
                users: results.rows[0].user_role
            }
        })
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving users");
    }
});


//checks if user joined class
router.get("/:course_id/:users", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM studentsjoined WHERE course_id = $1 AND user_username = $2",[req.params.course_id, req.params.users]);
        res.status(200).json({
            status: "success",
            data: {
                users: results.rows
            }
        })
    } catch (err) {
        console.error(err);
        res.status(401).json("Error completing check");
    }
});

module.exports = router;