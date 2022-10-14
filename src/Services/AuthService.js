import axios from 'axios';

export async function apiLoginUser(username, password) {
    const response = await axios.post('http://localhost:8080/user/login', {username: username, password: password});
    return response;
}

export async function apiAuthUser(){
    const token = localStorage.getItem("jwt");
    const response = await axios.post('http://localhost:8080/user/auth', token);
    return response;
}
 