import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/assignment_details" 
 : "http://localhost:3001/assignment_details";


export default axios.create({
    baseURL,
});

