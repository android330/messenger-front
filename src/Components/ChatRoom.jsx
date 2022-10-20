import { Box, TextField, Drawer, List, ListItem, Typography, Avatar, Grid, Paper, IconButton, Snackbar} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { apiUploadFile } from "../Services/ChatService";
import React, { useEffect, useRef, useState } from "react";
import { apiGetAllUsers } from "../Services/UsersService";
import { apiCreatePost, apiGetAllPosts } from "../Services/PostService";
import Post from "./Post";
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from "./Navbar";

export default function ChatRoom() {
  const token = localStorage.getItem("jwt");
  const mobileApp = window.innerWidth < 500;

  let [users, setUsers] = useState(); // user list on side
  let [messages, setMessages] = useState([]); //list of posts
  let [currentMessage, setCurrentMessage] = useState(''); //current message in box
  let [error, setError] = useState(); // error message
  let [listening, setListening] = useState(false); // currently listening to chat variable
  let [retrievedData, setRetrievedData] = useState(); // state variable for data retrieved from emitter
  let [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 500); // if sidebar is open
  let [touchCordinates, setTouchCordinates] = useState([null, null]);

  const handleFileUpload = (fileList) =>{
    apiUploadFile(fileList[0], (e)=>{
        // console.log(e)
        //console.log(Math.round((100*e.loaded)/e.total));
    }).then((r)=>{
        // console.log(r);
    }).catch((e)=>{
        setError(e.response ? "Error uploadng file" : "File to large (Must be under 10MB)");
        // console.log("test")
    })
  }

  useEffect(()=>{
    apiGetAllPosts().then((r)=>{
      // console.log(r.data)
      setMessages(r.data);
      // console.log(messages)
    })
  },[])

  useEffect(()=>{
    apiGetAllUsers().then((r)=>{
      setUsers(r.data);
    })
  },[])

  useEffect(()=>{
    if(!listening){
      let emitter = new EventSource("http://localhost:8080/posts/update");

      emitter.onmessage = (r)=>{
        let data = JSON.parse(r.data);
        // console.log(data);
        // console.log(messages);
        // setMessages(r.data)
        setRetrievedData(data);
      }

      emitter.onerror = (e)=>{emitter.close();}

      setListening(true);

      return ()=>{emitter.close()}
    }
  }, [])

  const submit = (e) =>{
    e.preventDefault();
    // console.log(messages);
    apiCreatePost(currentMessage);
    setCurrentMessage("");
  }

  useEffect(()=>{
    if(messages && retrievedData){
      // console.log(messages.concat(retrievedData))
      setMessages(messages.concat(retrievedData));
    }
  },[retrievedData])

  return(
    <>
    {/* TODO: Add navbar */} {/** TODO: add ability to hide drawer in navbar */}
    
      <Drawer sx={{ width: '240px', flexShrink: 0,'& .MuiDrawer-paper': {width: '240px', boxSizing: 'border-box',}, }} 
        variant="persistent" anchor="right" open={sidebarOpen}
        onTouchStart={(e)=>{setTouchCordinates([e.touches[0].clientX , e.touches[0].clientY])}}
        onTouchMove={e=>{e.touches[0].clientX - touchCordinates[0] > 100 && setSidebarOpen(false)}}>
        {/* <IconButton>
          <MenuIcon/>
        </IconButton> */}
        <Typography variant="h4" textAlign={"center"}>Users</Typography>
        {users && users.map((user, index)=>{
            return(
              <Grid key={index} container direction="row" margin={.2} width="235px">
                  <Avatar alt={index + user.username} src={user.picture} sx={{width: 40, height: 40, objectFit: 'cover'}}/>
                  <Typography alignSelf="center" marginLeft={1} maxWidth="100%">
                    {user.username.length > 15 ? (user.username.slice(0,15) + "...") : user.username}
                  </Typography>
              </Grid>
            )
        })}
      </Drawer>
      
      <Box height={'100vh'} paddingRight={sidebarOpen && !mobileApp ? "240px" : "0px"} 
        onTouchStart={(e)=>{setTouchCordinates([e.touches[0].clientX , e.touches[0].clientY])}}
        onTouchMove={e=>{touchCordinates[0] - e.touches[0].clientX > 100 && setSidebarOpen(true)}}>
        <Box paddingBottom={"45px"}>
          <List> 
            {messages && messages.map((message, index)=>{
              return(
                <Post message={message} key={index}/>
              )
            })}
          </List>
        </Box>
        <AlwaysScrollToBottom/>
        <Paper sx={{background: 'white',position: 'fixed', paddingRight: sidebarOpen ? "240px" : "0px", bottom: 0, left: 0, right: 0, height: '55px'}}>
          <Grid container direction={"row"}>
            <Grid item xs={1} alignSelf="center">
              <IconButton component="label">
                <AddIcon/>
                <input type="file" hidden onChange={(event)=>{handleFileUpload(event.target.files)}}/>
              </IconButton>
            </Grid>
            <Grid item xs={11}>
              <form onSubmit={submit}>
                <TextField autoFocus fullWidth autoComplete="off" rows={3} disabled={!token} value={currentMessage} onChange={(e)=>{setCurrentMessage(e.target.value)}}/>
                <button type="submit" hidden/>
              </form>
            </Grid>
          </Grid>
        </Paper> 
      </Box>
      <Snackbar open={Boolean(error)} autoHideDuration={4000} onClose={()=>{setError(false)}} message={error} anchorOrigin={{horizontal: 'center',vertical: 'top'}}/>
    
    <Navbar/>
    </>
  )
}


const AlwaysScrollToBottom = () =>{
  const elementRef = useRef();
  useEffect(()=> elementRef.current.scrollIntoView({behavior: 'smooth'}));
  return <div ref={elementRef}/>
}