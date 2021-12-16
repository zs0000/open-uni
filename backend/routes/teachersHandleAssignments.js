const router = require("express").Router();
const pool = require("../db/db");


//Create New Assignment Route

router.post("/new", async(req, res) => {
    try {
        const results = await pool.query("INSERT INTO assignments (course_id, assignment_title, assignment_description, assignment_instruction, assignment_start_date, assignment_due_date, assignment_material_link) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;", [req.body.course_id, req.body.assignment_title, req.body.assignment_description, req.body.assignment_instruction, req.body.assignment_start_date, req.body.assignment_due_date, req.body.assignment_material_link])
    
        res.status(200).json({
            status: "successfully created assignment",
            data: {
                assignmentData: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error creating assignment");
    }
});









module.exports = router;