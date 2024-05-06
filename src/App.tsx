import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Counter from './component/Counter'
import { useEffect, useState } from 'react';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Repositories from './component/Repositories';
const queryClient = new QueryClient();
/** repositories are fetched using the React Query library. We also managed to handle request 
 * status easily using its built-in features. We don’t need any states to store response data 
 * because React Query handles data management and caching:By using React Query, we have to write 
 * less code to get proper error handling, data caching, and so on, due to the built-in functionalities
 *  that it provides. */
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Repositories/>
      </QueryClientProvider>
    
    </>
  );


  
}

export default App;
