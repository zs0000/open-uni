import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/api/v1/check_user" 
 : "http://localhost:3001/api/v1/check_user";


export default axios.create({
    baseURL,
});

