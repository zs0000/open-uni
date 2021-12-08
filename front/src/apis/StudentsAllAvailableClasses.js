import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/classes_available" 
 : "http://localhost:3001/classes_available";


export default axios.create({
    baseURL,
});

