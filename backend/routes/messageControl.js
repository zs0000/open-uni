const router = require("express").Router();
const pool = require("../db/db");


//create a conversation

router.post("/create/:conversation_starter/:conversation_receiver/:conversation_key", async(req, res) => {
    try {
        const results = await pool.query("INSERT INTO conversations (conversation_starter, conversation_receiver, conversation_key) VALUES ($1, $2, $3) RETURNING *;", [req.params.conversation_starter, req.params.conversation_receiver, req.params.conversation_key])
    
        res.status(200).json({
            status: "successfully created conversation.",
            data: {
                conversation: results.rows[0],
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error creating conversation/conversation might already exist");
    }
});

//grab all messages to a conversation

router.get("/retrieve/:conversation_key", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM messages WHERE conversation_key = $1 ORDER BY message_sent_time DESC;",[req.params.conversation_key])
    
        res.status(200).json({
            status: "successfully retrieved conversation messages",
            data: {
                messages: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving conversation.");
    }
});
//grabs conversation details
router.get("/details/:conversation_key", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM conversations WHERE conversation_key = $1",[req.params.conversation_key])
    
        res.status(200).json({
            status: "successfully retrieved conversation details",
            data: {
                details: results.rows[0],
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving conversation details.");
    }
});
//sends a message in a conversation

router.post("/send/:conversation_key", async(req, res) => {
    try {
        const results = await pool.query("INSERT INTO messages (conversation_key, message_content, message_sent_by) VALUES ($1, $2, $3) RETURNING *;", [req.params.conversation_key, req.body.message_content, req.body.message_sent_by])
    
        res.status(200).json({
            status: "successfully sent message",
            data: {
                message: results.rows[0],
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error sending message");
    }
});

//grabs all conversations where you are the starter of the conversation

router.get("/sent/:conversation_starter", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM conversations WHERE conversation_starter = $1 ORDER BY conversation_updated_at DESC;", [req.params.conversation_starter])
    
        res.status(200).json({
            status: "successfully retrieved conversations",
            data: {
                conversations: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving conversations");
    }
});
//grabs all conversations where you are the receiver of a conversation start

router.get("/received/:conversation_starter", async(req, res) => {
    try {
        const results = await pool.query("SELECT * FROM conversations WHERE conversation_receiver = $1 ORDER BY conversation_updated_at DESC;", [req.params.conversation_starter])
    
        res.status(200).json({
            status: "successfully retrieved conversations",
            data: {
                conversations: results.rows,
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error retrieving conversations");
    }
});

//updates starter conversation view status

router.put("/set_starter/:conversation_key", async(req, res) => {
    try {
        const results = await pool.query("UPDATE conversations SET starter_new_message = $1 WHERE conversation_key = $2",[req.body.starter_new_message, req.params.conversation_key])
    
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

//updates receiver conversation view status

router.put("/set_receiver/:conversation_key", async(req, res) => {
    try {
        const results = await pool.query("UPDATE conversations SET receiver_new_message = $1 WHERE conversation_key = $2",[req.body.receiver_new_message, req.params.conversation_key])
    
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


//updates conversation timestamp 


router.put("/set_time/:conversation_key", async(req, res) => {
    try {
        const results = await pool.query("UPDATE conversations SET conversation_updated_at = current_timestamp WHERE conversation_key = $1",[req.params.conversation_key])
    
        res.status(200).json({
            status: "successfully updated time",
            data: {
                update: results.rows[0],
            }
        })
  
    } catch (err) {
        console.error(err);
        res.status(401).json("Error updating");
    }
});


module.exports = router;