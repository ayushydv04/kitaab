import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:5000",
    
});


// get method
export const getPost = () => {
    return api.get("/collection");
}