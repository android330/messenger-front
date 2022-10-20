import { Avatar, Stack,Box, ListItemAvatar, Typography, ListItemText } from "@mui/material";
import React from "react";
import File from "./File";

export default function Post({message}){


    // TODO: remake entirety of this component, i dont like the way it looks
    return(
    <Stack sx={{m: '1px',":hover": {backgroundColor: '#B0B0B0'}}} direction={"row"} maxWidth="100vw">
        <Avatar alt={"picture-"+message.user.username} src={message.user.picture} sx={{m: '5px'}}/>
        <Box>
            <Typography variant="h7">
                {message.user.username}
                <Typography sx={{display: 'inline', ml: '10px'}} component="span" variant="body2" color="text.secondary">
                    {(function(){
                    const date = new Date(message.date);
                    return date.toLocaleString();
                    })()}
                </Typography>
            </Typography>
            <Typography variant="body1" color={"text.secondary"}>
                {message.message}
            </Typography>
            {message.picture && <File message={message}/>}
        </Box>
    </Stack>

    )
}