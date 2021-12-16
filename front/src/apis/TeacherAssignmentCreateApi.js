import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/create_assignment" 
 : "http://localhost:3001/create_assignment";


export default axios.create({
    baseURL,
});

