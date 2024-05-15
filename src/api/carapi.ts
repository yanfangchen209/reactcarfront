import { CarResponse, Car, CarEntry} from '../components/types';
import axios from 'axios';

//after adding login page, don't forget to add code to get token and add Authorization header for 4 of each methods

//get request
/** To fetch the cars, we first have to read the token from 
 * session storage and then add the Authorization header with the token value to the GET request */
export const getCars = async (): Promise<CarResponse[]> => {
  const token = sessionStorage.getItem('jwt');
  const response = await axios.get('http://localhost:8085/api/cars', {headers:{'Authorization': token}});
  return response.data._embedded.cars;
}

//delete request
/**deleteCar function, which sends the DELETE request to a car link using the Axios delete method. 
 * A DELETE request to the backend returns a deleted car object. */
export const deleteCar = async (link: string): Promise<CarResponse> => {
  const token = sessionStorage.getItem('jwt');
  const response = await axios.delete(link, {headers: {'Authorization': token}});
  return response.data
}

//post request
export const addCar = async (car: Car): Promise<CarResponse> => {
  const token = sessionStorage.getItem('jwt');
  const response = await axios.post('http://localhost:8085/api/cars', car, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },  
  });
  
  return response.data;
}

//update： Put
export const updateCar = async (carEntry: CarEntry):
  Promise<CarResponse> => {
    const token = sessionStorage.getItem("jwt");
  const response = await axios.put(carEntry.url, carEntry.car, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  });
  return response.data;
}


/**we have quite a lot of duplicate code, such as the lines where we retrieve our token from session 
 * storage. We can do some refactoring to avoid repeating the same code and make our code easier to maintain
 * refactoring:we will create a function that retrieves the token from session storage and creates a 
 * configuration object for Axios requests that contains headers with the token. Axios provides the 
 * AxiosRequestConfig interface, which can be used to configure requests we send using Axios. We also 
 * set the content-type header value to application/json:
 * 
 * import axios, { AxiosRequestConfig } from 'axios';
import { CarResponse, Car, CarEntry } from '../types';
const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt");
  return {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
  };
};
export const getCars = async (): Promise<CarResponse[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/
                   api/cars`, getAxiosConfig());
  return response.data._embedded.cars;
}
export const deleteCar = async (link: string): Promise<CarResponse> =>
{
  const response = await axios.delete(link, getAxiosConfig())
  return response.data
}
export const addCar = async (car: Car): Promise<CarResponse> => {
  const response = await axios.post(`${import.meta.env.VITE_API_
                   URL}/api/cars`, car, getAxiosConfig());
  return response.data;
}
export const updateCar = async (carEntry: CarEntry):
  Promise<CarResponse> => {
  const response = await axios.put(carEntry.url, carEntry.car,
                                   getAxiosConfig());
return response.data;
}
 */