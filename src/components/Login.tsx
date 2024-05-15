import { Button, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'


type User = {
    username: string;
    password: string;
}

type LoginProps = {
  authHandler: () => void;

}

//also works
//explicitly declare any type： export const Login = ({authHandler}: any) => {
//export const Login = (props: LoginProps) => {

/*username, password must be same with backend fields public class AccountCredentials{
	private String username;
	private String password;
*/
export const Login = ({authHandler}: LoginProps) => {
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    })
   

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        {
        setUser({...user,
           [event.target.name] : event.target.value
        });
        //setUser({username:'dd', password: 'aaa', extra: 'aaa'});
      }

/**the login is done by calling the /login endpoint using the POST method and sending the user object 
 * inside the body. If authentication succeeds, we get a token in a response Authorization header. We
 *  will then save the token to session storage and set the isAuthenticated state value to true. */
const [loginFail, setLoginFail] = useState(false);

const handleLogin = () => {
    axios.post("http://localhost:8085/login", user, {
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => {
      const jwtToken = res.headers.authorization;
      //if login successfully, a token will be attached in repsonse header, get token and set authentication status to true
      if (jwtToken !== null) {
        sessionStorage.setItem("jwt", jwtToken);
        //set authentication to true
        authHandler();
      }
    })
    .catch(() => setLoginFail(true));
  }

  const errorMessage = loginFail ? "username or password wrong" : '';

    return(
      <>
        {errorMessage}
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
      </>

    );
}
