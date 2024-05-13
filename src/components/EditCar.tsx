import React, { useState } from 'react'
import { Car, CarEntry, CarResponse } from './types'
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { CarDialogContent } from './CarDialogContent';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCar } from '../api/carapi';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

type FormProps = {
    cardata: CarResponse;
}

export const EditCar = ({cardata}: FormProps) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(updateCar, {
        onSuccess: () => {
          queryClient.invalidateQueries(["cars"]);
        },
        onError: (err) => {
          console.error(err);
        }
      });
      
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,  
        price: 0
      });
      
      //populate the form with the values from the car object that is passed to the component in props.
      const handleClickOpen = () => {
        setCar({
            brand: cardata.brand,
            model: cardata.model,
            color: cardata.color,
            registrationNumber: cardata.registrationNumber,
            modelYear: cardata.modelYear,
            price: cardata.price
          });
        setOpen(true);
      };
        
      const handleClose = () => {
        setOpen(false);
      };
             
      const handleSave = () => {
        //
        const url = cardata._links.self.href;
        const carEntry: CarEntry = {car, url}

        //send put request to backend to update selected car item
        mutate(carEntry);

        //clear inputs
        setCar({ brand: '', model: '', color: '',  registrationNumber:'',
        modelYear: 0, price: 0 });

        //close the edit modal
        setOpen(false);
      }

      const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>
        {
          setCar({...car, [event.target.name]: event.target.value});
        }

  return (
    <>  <Tooltip title="Edit car">
            <IconButton aria-label="edit" size="small"
                onClick={handleClickOpen}>
                <EditIcon fontSize = "small" />
            </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit car</DialogTitle>
            <CarDialogContent car={car} handleChange={handleChange}/>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>Save</Button>     
            </DialogActions>
        </Dialog>
    </>
  )
}
