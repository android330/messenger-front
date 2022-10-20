import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react"
import DownloadIcon from '@mui/icons-material/Download';


export default function File({message}){
    let [isImg, setIsImage] = useState(true);

    return(
        <>
            {isImg ?
                <Box data-testid="boxclick" display={"flex"} alignItems="center" justifyContent="center"
                    style={{ overflow: "hidden", objectFit: "none", objectPosition: "center", margin: '5px', borderRadius: "5%"}} maxWidth={window.innerWidth - 80}>
                    <img src={message.picture} alt={"pic"+message.id} onError={e=>{setIsImage(false)}} height="300px"/>
                </Box>
            :
                <Box component="span" sx={{display: 'inline-block' ,backgroundColor: "#FF0000", p: '15px', borderRadius: "10px", m:'5px'}} maxWidth={window.innerWidth - 80}>
                    <Typography component="span" children={
                        function(){const split = message.picture.split("/");
                        return split[split.length-1]}()}/>
                        <IconButton>
                            <DownloadIcon/>
                        </IconButton>
                </Box>
            }
        </>
    )
}