import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/api/v1/class_details" 
 : "http://localhost:3001/api/v1/class_details";


export default axios.create({
    baseURL,
});

