import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:5000",
    // mongodb+srv://new-ayush_04:<db_password>@kitaabproducts.x6f1s.mongodb.net/
    
});


// get method
export const getPost = () => {
    return api.get("/collection");
}