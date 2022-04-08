import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/api/v1/join_class" 
 : "http://localhost:3001/api/v1/join_class";


export default axios.create({
    baseURL,
});

