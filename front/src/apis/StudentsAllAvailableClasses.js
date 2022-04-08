import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/api/v1/classes_available" 
 : "http://localhost:3001/api/v1/classes_available";


export default axios.create({
    baseURL,
});

