import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/check_user" 
 : "http://localhost:3001/check_user";


export default axios.create({
    baseURL,
});

