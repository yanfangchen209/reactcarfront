import { CarResponse } from '../components/types';
import axios from 'axios';


export const getCars = async (): Promise<CarResponse[]> => {
  const response = await axios.get('http://localhost:8085/api/cars');
  return response.data._embedded.cars;
}