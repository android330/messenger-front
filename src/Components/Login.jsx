import {  Typography, TextField, Button, Paper, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { apiLoginUser } from "../Services/AuthService";


export default function Login({setLoggedUser: setLoggedUser}){
  const navigate = useNavigate();

  let [username, setUsername] = useState();
  let [password, setPassword] = useState();
  let [error, setError] = useState(false);

  const onSubmit = (e)=>{
    e.preventDefault();
    const jwt = apiLoginUser(username, password).then(result=>{
      localStorage.setItem("jwt", result.data);
      setLoggedUser(result.data);
      navigate('/');
    }).catch(()=>{
      setError(true);
    })
  }
  

  return(
      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh'}}
      >
      <Grid item xs={12}>
        <form onSubmit={onSubmit}>
          <Paper elevation={3} sx={{p: '30px'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, flexDirection: 'column' }}>
              <Typography gutterBottom variant="h2" >Login</Typography>
              <TextField id="username-field" label="Username" onChange={(e)=>{setUsername(e.target.value)}} variant="outlined" sx={{mb: 2.5}} error={error} autoFocus/>
              <TextField id="password-field" label="Password" onChange={(e)=>{setPassword(e.target.value)}} variant="outlined" sx={{m: 0}} error={error} helperText={error ? "Invalid Credentials" : " "} type="password"/>
            </Box>
            <Box sx={{ display: 'flex', pl: 1, pb: 1, flexDirection: 'row', justifyContent: 'center' }}>
              <Button size="medium"  sx={{mr:1, mt: 1}} variant="contained" type="submit">Login</Button>
              <Button size="medium" sx={{ml:1, mt:1}} variant="outlined">Cancel</Button>
            </Box>
          </Paper>
        </form>
        
      </Grid>
    </Grid>
  )
}