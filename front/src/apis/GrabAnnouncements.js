import axios from "axios";






const baseURL = process.env.NODE_ENV === 'production'
 ? "/announcement_details" 
 : "http://localhost:3001/announcement_details";


export default axios.create({
    baseURL,
});

