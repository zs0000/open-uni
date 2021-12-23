const express = require('express')
const app = express()
const port = 3001
require("dotenv").config();
const cors = require("cors");
const db = require("./db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator");
const authorization = require("./middleware/authorization");
const validInfo = require("./middleware/validInfo");


//middleware

app.use(express.json()) //req.body
app.use(cors())


//routes


// /auth handles /login, /register, and /isverify to authenticate already logged in users.
app.use("/auth", require("./routes/jwtAuth"));

// first protected route
app.use("/dashboard", require("./routes/dashboard"));


//user check
app.use("/check_user", require("./routes/userCheck"))

//create a class
app.use("/create_class", require("./routes/classCreate"))
// all classes from one professor
app.use("/all_classes", require("./routes/teachersAllClasses"))
//all classes available for enrollment
app.use("/classes_available", require("./routes/studentsAllClasses"))

app.use("/class_details", require("./routes/grabClassDetails"))
//student join class route
app.use("/join_class", require("./routes/studentsJoinClass"))

//handles retrieval, creation, deletion, and completion of assignments
app.use("/create_assignment", require("./routes/teachersHandleAssignments"))

//handles retrieval, creation, deletion, and completion of assignments
app.use("/create_announcement", require("./routes/teachersHandleAnnouncements"))

//handles interactions with assignments
app.use("/assignment_details", require("./routes/grabAssignmentDetails"))

//handles interactions with annoucements
app.use("/announcement_details", require("./routes/grabAnnouncements"))


app.listen(port, (req, res) => {
        console.log(`App running at http://localhost:${port}`)
})