import { useQuery } from '@tanstack/react-query';
import { getCars } from '../api/carapi';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

//using MUI DataGrid(soring,paging, filtering)instead of table, 
function Carlist() {

  const { data, error, isSuccess } = useQuery({
    queryKey: ["cars"], 
    queryFn: getCars
  });


  const columns: GridColDef[] = [
    {field: 'brand', headerName: 'Brand', width: 200},
    {field: 'model', headerName: 'Model', width: 200},
    {field: 'color', headerName: 'Color', width: 200},
    {field: 'registrationNumber', headerName: 'Reg.nr.', width: 200},
    {field: 'modelYear', headerName: 'Model Year', width: 150},
    {field: 'price', headerName: 'Price', width: 150},

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
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={row => row._links.self.href}
        />

    );
  }
}

export default Carlist