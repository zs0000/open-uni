import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/delete" 
 : "http://localhost:3001/delete";


export default axios.create({
    baseURL,
});

