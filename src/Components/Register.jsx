import {  Typography, TextField, Button, Paper, Grid, Box } from "@mui/material";
import {  useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { apiLoginUser } from "../Services/AuthService";


export default function Register({setLoggedUser}){
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);


  const onSubmit = (e)=>{
    e.preventDefault();
    apiLoginUser(username, password).then(result=>{
      localStorage.setItem("jwt", result.data);
      setLoggedUser(result.data);
      navigate('/');
    }).catch(()=>{
      setError(true);
    })
  }

  const updateMedia = () => {
    // console.log(isDesktop)
    setDesktop(window.innerWidth > 450);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  

  return(
    <>
      {isDesktop ? 
        <Grid container spacing={0} direction="column"alignItems="center" justifyContent="center" style={{ minHeight: '100vh'}}>
        <Grid item xs={12}>
          <form onSubmit={onSubmit}>
            <Paper elevation={3} sx={{p: '30px'}}>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, flexDirection: 'column' }}>
                <Typography gutterBottom variant="h2" >Register</Typography>
                <TextField id="username-field" label="Username" onChange={(e)=>{setUsername(e.target.value)}} variant="outlined" sx={{mb: 2.5}} error={error} autoFocus/>
                <TextField id="password-field" label="Password" onChange={(e)=>{setPassword(e.target.value)}} variant="outlined" sx={{m: 0}} error={error} helperText={error ? "Invalid Credentials" : " "} type="password"/>
              </Box>
              <Box sx={{ display: 'flex', pl: 1, pb: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <Button size="medium"  sx={{mr:1, mt: 1}} variant="contained" type="submit">Login</Button>
                <Button size="medium" sx={{ml:1, mt:1}} variant="outlined" onClick={(e)=>{navigate('/login')}}>Cancel</Button>
              </Box>
            </Paper>
          </form>
        </Grid>
      </Grid>
      :
      <>
       <form onSubmit={onSubmit}>
          <Grid container spacing={0} direction="column"alignItems="center" justifyContent="center" style={{ minHeight: '100vh'}}>
            <Typography variant="h2" gutterBottom>Register</Typography>
            <TextField id="username-field" label="Username" onChange={(e)=>{setUsername(e.target.value)}} variant="outlined" fullWidth sx={{mb: 2.5}} error={error} autoFocus/>
            <TextField id="password-field" label="Password" onChange={(e)=>{setPassword(e.target.value)}} variant="outlined" fullWidth sx={{mb: 0}} error={error} helperText={error ? "Invalid Credentials" : " "} type="password"/>
            <Button size="large"  variant="contained" sx={{mb: 2}} type="submit" fullWidth>Login</Button>
            <Button size="large" variant="outlined" onClick={(e)=>{navigate('/login')}} fullWidth>Cancel</Button>
          </Grid>
        </form>
      </>     
    }
  </>
  )
}