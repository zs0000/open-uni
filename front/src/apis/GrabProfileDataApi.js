import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/api/v1/selected_user" 
 : "http://localhost:3001/api/v1/selected_user";


export default axios.create({
    baseURL,
});

