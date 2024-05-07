
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Item} from './App';

type AddItemProps = {
  addItem: (item: Item) => void;
}


function AddItemForm (props: AddItemProps){
  const [open, setOpen] = useState(false);
  //store a shopping item that the user enters, and its type is Item
  const [item, setItem] = useState<Item>({product: '', amount: ''});
//it specifies that the component should receive a function prop called addItem, 
//which takes an Item as its argument and returns void.


  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  // Calls addItem function from App.tsx and passes 'item' state into it
  const addItemHandler = () => {
    props.addItem(item);
    //clear text fields and close modal dialog
    setItem({product: '', amount: ''});
    handleClose();
  }

  return (
    <>
      <Button onClick={handleOpen}>Add Item</Button>
      {/**clicks outside of the Dialog, onClose is invoked/called */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
          <TextField value={item.product} margin="dense" 
            onChange={e => setItem({...item, product: e.target.value})}
            label="Product" fullWidth />
          <TextField value={item.amount} margin="dense" 
            onChange={e => setItem({...item, amount: e.target.value})} 
            label="Amount" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addItemHandler}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default AddItemForm;
