import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCars, deleteCar} from '../api/carapi';
import { DataGrid, GridCellParams, GridColDef, GridToolbar} from '@mui/x-data-grid';
import { useState } from 'react';
import { Button, IconButton, Snackbar } from '@mui/material';
import { EditCar } from './EditCar';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

//show list + delete item + edit item


//using MUI DataGrid(soring,paging, filtering)instead of table, 
/**add a new column to the table using renderCell to render the button element. The params argument 
 * that is passed to the function is a row object that contains all values from a row. The type of
 *  params is GridCellParams, which is provided by MUI. In our case, it contains a link to a car in 
 * each row, and that is needed in the deletion. The link is in the row’s _links.self.href property, 
 * and we will pass this value to a delete function. */
//autoHideDuration prop defines the time in milliseconds after which the onClose function is called automatically and the message disappears.
function Carlist() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery({
    queryKey: ["cars"], 
    queryFn: getCars
  });

  //The queryClient has an invalidateQueries method that we can call to re-fetch our data after 
  //successful deletion. You can pass the key of the query that you want to re-fetch. 
  //every time a car is deleted, all the cars are fetched again
  const {mutate} = useMutation(deleteCar, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({queryKey: ['cars']});

    },
    onError: (err) => {
      console.error(err);
    }

  })


  const columns: GridColDef[] = [
    {field: 'brand', headerName: 'Brand', width: 200},
    {field: 'model', headerName: 'Model', width: 200},
    {field: 'color', headerName: 'Color', width: 200},
    {field: 'registrationNumber', headerName: 'Reg.nr.', width: 200},
    {field: 'modelYear', headerName: 'Model Year', width: 150},
    {field: 'price', headerName: 'Price', width: 150},

    {field: 'edit',
    headerName: '',
    width: 90,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: GridCellParams) => 
      <EditCar cardata={params.row} />
  },
    {field: 'delete', 
      headerName: '', 
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <Tooltip title = "Delete car">
                  <IconButton aria-label="delete" size="small"
        onClick={() => {
          if(window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)){
            mutate(params.row._links.car.href)
          }
        }}>
          <DeleteIcon fontSize="small" />
        </IconButton>

        </Tooltip>

      )
    }


  ]
//conditional rendering

  if (!isSuccess) {
    return <span>Loading...</span>
  }
  else if (error) {
    return <span>Error when fetching cars...</span>
  }
  else {
    return ( 
      <>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={row => row._links.self.href}
          slots={{toolbar: GridToolbar}}/>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={()=>{setOpen(false)}}
          message="Car deleted" />
      </>
    );
  }
}

export default Carlist