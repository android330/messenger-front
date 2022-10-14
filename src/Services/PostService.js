import axios from "axios";

export async function apiGetAllPosts(){
    let response = await axios.get("http://localhost:8080/posts");
    return response;
}

export async function apiCreatePost(post){
    const token = localStorage.getItem("jwt");
    let response = await axios.post("http://localhost:8080/posts", {token: token, message: post});
    return response;
}