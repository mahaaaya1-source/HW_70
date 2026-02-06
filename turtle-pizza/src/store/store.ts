import { configureStore } from '@reduxjs/toolkit';

import dishesReducer from './dishes/dishesSlice';
import cartReducer from './cart/cartSlice';
import ordersReducer from './orders/ordersSlice';

export const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
