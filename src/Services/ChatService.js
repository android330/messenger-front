import axios from "axios";

/* 
apiUploadFile(file, (event)={
    progress = Math.round((100*event.loaded)/event.total)
}).then((response)={...})
 */
export async function apiUploadFile(file, onUploadProgress){
    let formData = new FormData();
    const token = localStorage.getItem("jwt");
    formData.append("file", file);
    formData.append("token", token);
    let response = await axios.post("http://localhost:8080/upload", formData, {
        headers:{
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress
    })
    return response;
}

export async function apiDownloadAllFilesKey(){
    let response = await axios.get("http://localhost:8080/files");
    return response;
}

export async function apiDownloadFile(file){
    let response = await axios.get('http://localhost:8080/files/' + file);
    return response;
}