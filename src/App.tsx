import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Counter from './component/Counter'

function App() {
  
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>
              Car Shop
            </Typography>
            <div><Counter /></div>
          </Toolbar>
        </AppBar>
    </Container>

  );


  
}

export default App;
