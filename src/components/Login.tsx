import { Button, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'


type User = {
    username: string;
    password: string;
}
export const Login = () => {
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    })
    const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        {
        setUser({...user,
           [event.target.name] : event.target.value
        });
      }

/**the login is done by calling the /login endpoint using the POST method and sending the user object 
 * inside the body. If authentication succeeds, we get a token in a response Authorization header. We
 *  will then save the token to session storage and set the isAuthenticated state value to true. */
const handleLogin = () => {
    axios.post("localhost:8085/api/login", user, {
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => {
      const jwtToken = res.headers.authorization;
      if (jwtToken !== null) {
        sessionStorage.setItem("jwt", jwtToken);
        setAuth(true);
      }
    })
    .catch(err => console.error(err));
  }

    return(
        <Stack spacing={2} alignItems="center" mt={2}>
          <TextField
            name="username"
            label="Username"
            onChange={handleChange} />
          <TextField
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}/>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogin}>
              Login
          </Button>
        </Stack>
    );
}
