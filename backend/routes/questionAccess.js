const router = require("express").Router();
const pool = require("../db/db");


//creates new questions

router.post("/new/:question_created_by_name/:question_created_by_username/:course_title/:question_status/:course_id", async(req, res) => {
    try {
        const results = await pool.query("INSERT INTO questions (question_title, question_content, question_created_by_name, question_created_by_username, course_title, question_status, course_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",[req.body.question_title, req.body.question_content, req.params.question_created_by_name, req.params.question_created_by_username, req.params.course_title, req.params.question_status, req.params.course_id])
    
        res.status(200).json({
            status: "successfully created question",
            data: {
                question: results.rows[0],
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error creating question");
    }
});
//Grabs all questions for a specific course

router.get("/retrieve_questions/:course_id", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM questions WHERE course_id = $1", [req.params.course_id])
    
        res.status(200).json({
            status: "successfully retrieved course questions",
            data: {
                questions: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving course questions");
    }
});
//Grabs question details

router.get("/question_details/:question_id", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM questions WHERE question_id = $1", [req.params.question_id])
    
        res.status(200).json({
            status: "successfully retrieved question details",
            data: {
                question: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving question details");
    }
});

//create answer to a question 

router.post("/add_answer/:answer_created_by_name/:answer_created_by_username/:question_id", async(req, res) => {
    try {
        const results = await pool.query("INSERT INTO answers (answer_content, answer_created_by_name, answer_created_by_username, question_id) VALUES ($1, $2, $3, $4) RETURNING *;",[req.body.answer_content, req.params.answer_created_by_name, req.params.answer_created_by_username, req.params.question_id])
    
        res.status(200).json({
            status: "successfully created answer",
            data: {
                answer: results.rows[0],
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error creating answer");
    }
});

router.get("/grab_answers/:question_id", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM answers WHERE question_id = $1", [req.params.question_id])
    
        res.status(200).json({
            status: "successfully retrieved question replies",
            data: {
                replies: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving question repliess");
    }
});

//updates Question Status

router.put("/set_answer/:answer_is_final/:answer_id", async(req, res) => {
    try {
        const results = await pool.query("UPDATE answers SET answer_is_final = $1 WHERE answer_id = $2",[req.params.answer_is_final, req.params.answer_id])
    
        res.status(200).json({
            status: "successfully updated",
            data: {
                update: results.rows[0],
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error updating");
    }
});
router.put("/set_solved/:question_status/:question_id", async(req, res) => {
    try {
        const results = await pool.query("UPDATE questions SET question_status = $1 WHERE question_id = $2",[req.params.question_status, req.params.question_id])
    
        res.status(200).json({
            status: "successfully updated",
            data: {
                update: results.rows[0],
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error updating");
    }
});

router.get("/users_questions/:question_created_by_username", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM questions WHERE question_created_by_username = $1", [req.params.question_created_by_username])
    
        res.status(200).json({
            status: "successfully retrieved questions",
            data: {
                questions: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving questions");
    }
});

module.exports = router;