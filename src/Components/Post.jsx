import { Avatar, ListItemButton, ListItemAvatar, Typography, ListItemText } from "@mui/material";
import React from "react";

export default function Post({message: message}){


    return(
    <ListItemButton >
        <ListItemAvatar>
            <Avatar alt={"picture "+message.user.username} src={message.user.picture}/>
        </ListItemAvatar>
        <ListItemText primary={
            <React.Fragment>
            {message.user.username}
            <Typography sx={{display: 'inline', ml: '10px'}} component="span" variant="body2" color="text.secondary">
                {(function(){
                const date = new Date(message.date);
                return date.toLocaleString();
                })()}
            </Typography>
            </React.Fragment>
        } secondary={
            <React.Fragment>
            {message.message}
            {message.picture && <img src={message.picture} alt={"pic"+message.id} height="300px"/>}
            </React.Fragment>
        } />
    </ListItemButton>

    )
}