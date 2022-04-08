import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/api/v1/delete" 
 : "http://localhost:3001/api/v1/delete";


export default axios.create({
    baseURL,
});

