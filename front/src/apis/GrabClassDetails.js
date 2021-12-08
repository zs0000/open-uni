import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/class_details" 
 : "http://localhost:3001/class_details";


export default axios.create({
    baseURL,
});

