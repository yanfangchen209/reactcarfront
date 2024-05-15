import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Carlist from './components/Carlist';
import { AddCar } from './components/AddCar';
import { useState } from 'react';
import { Login } from './components/Login';




const queryClient = new QueryClient();

function App() {

  const [isAuthenticated, setAuth] = useState(false);

  const authenticationHandler = () => {
    setAuth(true);
  }

  const logoutHandler = () => {
    setAuth(false);
  }
  
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
          Car shop
          </Typography>
         {isAuthenticated && <div style={{ marginLeft: 'auto' }}>
            <button onClick={logoutHandler}>Log out</button>
          </div>}
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        {!isAuthenticated && <Login  authHandler={authenticationHandler}/>}
        {isAuthenticated && <AddCar />}
        {isAuthenticated && <Carlist />}
      </QueryClientProvider>
    </Container>
  )
}
export default App;