import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from '../features/contacts/contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

// Типы можно экспортировать из types.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
