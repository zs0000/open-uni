import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/dashboard" 
 : "http://localhost:3001/all_classes";


export default axios.create({
    baseURL,
});

