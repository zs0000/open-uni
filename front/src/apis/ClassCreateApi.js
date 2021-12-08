import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/create_class" 
 : "http://localhost:3001/create_class";


export default axios.create({
    baseURL,
});

