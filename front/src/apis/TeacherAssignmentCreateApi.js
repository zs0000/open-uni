import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/api/v1/create_assignment" 
 : "http://localhost:3001/api/v1/create_assignment";


export default axios.create({
    baseURL,
});

