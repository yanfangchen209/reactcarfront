import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import AddItemForm from './AddItemForm';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {v4 as uuidv4} from "uuid";

//create a type for the shopping items, Item, which we will also export because we need it in other components later:
export type Item = {
  product: string;
  amount: string;
}
function App() {
  
 const [items, setItems] = useState<Item[]>([]);
  const addItem = (newItem: Item) => {
    setItems([newItem, ...items]);
  }
  return (
    <>
      <Container>
        <AppBar position='static'>
          <Typography variant='h6'>
            Shopping List
          </Typography>
        </AppBar>
        <AddItemForm addItem={addItem} />
        <List>
          {items.map(item => 
            <ListItem key={uuidv4()} >
              <ListItemText primary={item.product} secondary={item.amount} />
            </ListItem>)}
        </List>
      </Container>
    
    </>
  );


  
}

export default App;
