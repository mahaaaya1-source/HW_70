import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchDishesApi,
  createDishApi,
  updateDishApi,
  deleteDishApi,
  type ApiDish,
} from '@/api/dishes';

export const fetchDishes = createAsyncThunk('dishes/fetch', async () => {
  return await fetchDishesApi();
});

export const createDish = createAsyncThunk(
  'dishes/create',
  async (dish: ApiDish) => {
    const res = await createDishApi(dish);
    return { id: res.name as string, ...dish };
  }
);

export const updateDish = createAsyncThunk(
  'dishes/update',
  async (payload: { id: string; dish: ApiDish }) => {
    await updateDishApi(payload.id, payload.dish);
    return { id: payload.id, ...payload.dish };
  }
);

export const deleteDish = createAsyncThunk('dishes/delete', async (id: string) => {
  await deleteDishApi(id);
  return id;
});
