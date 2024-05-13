import { CarResponse, Car, CarEntry} from '../components/types';
import axios from 'axios';

//get request
export const getCars = async (): Promise<CarResponse[]> => {
  const response = await axios.get('http://localhost:8085/api/cars');
  return response.data._embedded.cars;
}

//delete request
/**deleteCar function, which sends the DELETE request to a car link using the Axios delete method. 
 * A DELETE request to the backend returns a deleted car object. */
export const deleteCar = async (link: string): Promise<CarResponse> => {
  const response = await axios.delete(link);
  return response.data
}

//post request
export const addCar = async (car: Car): Promise<CarResponse> => {
  const response = await axios.post('http://localhost:8085/api/cars', car, {
    headers: {
      'Content-Type': 'application/json',
    },  
  });
  
  return response.data;
}

//update： Put
export const updateCar = async (carEntry: CarEntry):
  Promise<CarResponse> => {
  const response = await axios.put(carEntry.url, carEntry.car, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response.data;
}