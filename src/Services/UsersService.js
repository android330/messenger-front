import axios from "axios";

export async function apiGetAllUsers(){
    let response = await axios.get("http://localhost:8080/users");
    return response;
}