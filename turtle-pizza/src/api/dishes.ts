import axios from 'axios';

const BASE_URL = 'https://turtle-pizza-907e5-default-rtdb.firebaseio.com';

export type ApiDish = {
  title: string;
  price: number;
  image: string;
};

export const fetchDishesApi = async () => {
  const { data } = await axios.get(`${BASE_URL}/dishes.json`);
  if (!data) return [];
  return Object.entries(data).map(([id, dish]) => ({
    id,
    ...(dish as ApiDish),
  }));
};

export const createDishApi = async (dish: ApiDish) => {
  const { data } = await axios.post(`${BASE_URL}/dishes.json`, dish);
  return data; 
};

export const updateDishApi = async (id: string, dish: ApiDish) => {
  await axios.put(`${BASE_URL}/dishes/${id}.json`, dish);
};

export const deleteDishApi = async (id: string) => {
  await axios.delete(`${BASE_URL}/dishes/${id}.json`);
};
