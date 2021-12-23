import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/create_announcement" 
 : "http://localhost:3001/create_announcement";


export default axios.create({
    baseURL,
});

