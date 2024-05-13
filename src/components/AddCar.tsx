import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import { Car } from './types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCar } from '../api/carapi';
import { CarDialogContent } from './CarDialogContent';

export const AddCar = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(addCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(["cars"]);
        },
        onError: (err) => {
            console.error(err);
        }
    })
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
    })

    const closeHandler = () => {
        setOpen(false);
    }

    const openHandler = () => {
        setOpen(true);
    }

    const saveHandler = () => {
        //send post request
        mutate(car);

        //clear input after sending post request to backend, must
        setCar({ brand: '', model: '', color: '',  registrationNumber:'',
        modelYear: 0, price: 0 });

        //close the modal
        closeHandler();
    }


    const changeHandler = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
    setCar({...car, [event.target.name]:
        event.target.value});
    } 

  return (
    <>
        <Button onClick={openHandler}>Add Car</Button>
        <Dialog open={open} onClose={closeHandler}>
            <DialogTitle>New Car</DialogTitle>
            <CarDialogContent car={car} handleChange={changeHandler}/>
            <DialogActions>
                <Button variant="contained" onClick={closeHandler}>Cancel</Button>
                <Button variant="contained" onClick={saveHandler}>Save</Button>
            </DialogActions>
        </Dialog>
    </>

  )
}
