import Login from "./Components/Login";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import ChatRoom from "./Components/ChatRoom";
import { useEffect, useState } from "react";
import { apiAuthUser, apiLoginUser } from "./Services/AuthService";
import Loading from "./Components/Loading";
import Register from "./Components/Register";


function App() {
  let [loggedUser, setLoggedUser] = useState("loading");

  useEffect(()=>{
    let jwt = localStorage.getItem("jwt");
    if(!jwt) return;
    apiAuthUser(jwt).then((r)=>{
      // console.log(r)
      setLoggedUser(r)
    }).catch((r)=>{
      // console.log(r)
      setLoggedUser(false);
    })
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='register' element={<Register/>}/>
        {loggedUser == "Loading" && <Route path="*" element={<Loading setLoggedUser={setLoggedUser}/>}/>}
        <Route path='/login' element={<Login setLoggedUser={setLoggedUser}/>}/>
        {loggedUser && <Route path='/' element={<ChatRoom/>}/>}
        {/* Insert Other Routes Here */}
        <Route path="*" element={<Navigate to="/login"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
