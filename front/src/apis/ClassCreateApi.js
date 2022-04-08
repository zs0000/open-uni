import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/api/v1/create_class" 
 : "http://localhost:3001/api/v1/create_class";


export default axios.create({
    baseURL,
});

