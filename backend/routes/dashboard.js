const router = require("express").Router();
const pool = require("../db/db");
const authorization = require("../middleware/authorization");

//protected route, authorized users only

router.get("/", authorization, async(req, res) => {
    try {
        //res.json(req.user);

        const user = await pool.query("SELECT user_username, user_role, user_firstname, user_lastname FROM users WHERE user_id = $1", [
            req.user
        ]);
        res.json(user.rows[0])
    } catch (err) {
      console.error(err.message);
      res.status(403).json("Not Authorized");
    }
});

module.exports = router;