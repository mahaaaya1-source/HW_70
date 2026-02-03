import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  createContact,
  fetchContact,
  updateContact,
  deleteContact,
} from './contactsThunks';
import { type ContactWithId, type Contact } from './contactsTypes';
import type { RootState } from '../../app/types'; // ← импорт только типов

interface ContactsState {
  items: ContactWithId[];
  oneContact: Contact | null;
  fetchLoading: boolean;
  createLoading: boolean;
  fetchOneLoading: boolean;
  updateLoading: boolean;
}

const initialState: ContactsState = {
  items: [],
  oneContact: null,
  fetchLoading: false,
  createLoading: false,
  fetchOneLoading: false,
  updateLoading: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => { state.fetchLoading = true; })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => { state.items = payload; state.fetchLoading = false; })
      .addCase(fetchContacts.rejected, (state) => { state.fetchLoading = false; })

      .addCase(createContact.pending, (state) => { state.createLoading = true; })
      .addCase(createContact.fulfilled, (state) => { state.createLoading = false; })
      .addCase(createContact.rejected, (state) => { state.createLoading = false; })

      .addCase(fetchContact.pending, (state) => { state.fetchOneLoading = true; })
      .addCase(fetchContact.fulfilled, (state, { payload }) => { state.oneContact = payload; state.fetchOneLoading = false; })
      .addCase(fetchContact.rejected, (state) => { state.fetchOneLoading = false; })

      .addCase(updateContact.pending, (state) => { state.updateLoading = true; })
      .addCase(updateContact.fulfilled, (state) => { state.updateLoading = false; })
      .addCase(updateContact.rejected, (state) => { state.updateLoading = false; });
  },
});

// Named export редьюсера
export const contactsReducer = contactsSlice.reducer;

// Селекторы
export const selectContacts = (state: RootState) => state.contacts.items;
export const selectCreateContactLoading = (state: RootState) => state.contacts.createLoading;
export const selectFetchOneContactLoading = (state: RootState) => state.contacts.fetchOneLoading;
export const selectUpdateContactLoading = (state: RootState) => state.contacts.updateLoading;
export const selectOneContact = (state: RootState) => state.contacts.oneContact;
