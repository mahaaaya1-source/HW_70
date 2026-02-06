import { createSlice } from '@reduxjs/toolkit';
import { fetchDishes, createDish, updateDish, deleteDish } from './dishesThunks';

type Dish = {
  id: string;
  title: string;
  price: number;
  image: string;
};

type DishesState = {
  items: Dish[];
  loading: boolean;
};

const initialState: DishesState = {
  items: [],
  loading: false,
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(createDish.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        state.items = state.items.map((d) => (d.id === action.payload.id ? action.payload : d));
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.items = state.items.filter((d) => d.id !== action.payload);
      });
  },
});

export default dishesSlice.reducer;
