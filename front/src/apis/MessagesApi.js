import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/messages" 
 : "http://localhost:3001/messages";


export default axios.create({
    baseURL,
});

