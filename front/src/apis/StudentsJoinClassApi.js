import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/join_class" 
 : "http://localhost:3001/join_class";


export default axios.create({
    baseURL,
});

