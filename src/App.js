import Login from "./Components/Login";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import ChatRoom from "./Components/ChatRoom";
import { useEffect, useState } from "react";
import { apiAuthUser, apiLoginUser } from "./Services/AuthService";
import Loading from "./Components/Loading";


function App() {
  let [loggedUser, setLoggedUser] = useState("loading");

  useEffect(()=>{
    console.log(localStorage.getItem("jwt"))
    apiAuthUser(localStorage.getItem("jwt")).then((r)=>{
      console.log(r)
      setLoggedUser(r)
    }).catch((r)=>{
      console.log(r)
      setLoggedUser(false);
    })
  },[])

  return (
    <BrowserRouter>
      <Routes>
        {loggedUser == "Loading" && <Route path="*" element={<Loading/>}/>}
        <Route path='/login' element={<Login setLoggedUser={setLoggedUser}/>}/>
        {loggedUser && <Route path='/' element={<ChatRoom/>}/>}
        {/* Insert Other Routes Here */}
        <Route path="*" element={<Navigate to="/login"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
