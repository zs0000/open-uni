import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/api/v1/question_control" 
 : "http://localhost:3001/api/v1/question_control";


export default axios.create({
    baseURL,
});

