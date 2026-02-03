import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';
import {type Contact, type ContactWithId } from './contactsTypes';

export const fetchContacts = createAsyncThunk<ContactWithId[]>(
  'contacts/fetchAll',
  async () => {
    const { data } = await axiosApi.get<Record<string, Contact> | null>('/contacts.json');
    if (!data) return [];

    return Object.entries(data).map(([id, contact]) => ({
      ...contact,
      id,
    }));
  }
);

export const createContact = createAsyncThunk<void, Contact>(
  'contacts/create',
  async (contact) => {
    await axiosApi.post('/contacts.json', contact);
  }
);

export const fetchContact = createAsyncThunk<Contact, string>(
  'contacts/fetchOne',
  async (id) => {
    const response = await axiosApi.get<Contact | null>(`/contacts/${id}.json`);
    if (response.data === null) {
      throw new Error('Not found');
    }
    return response.data;
  }
);

interface UpdateContactParams {
  id: string;
  contact: Contact;
}

export const updateContact = createAsyncThunk<void, UpdateContactParams>(
  'contacts/update',
  async ({ id, contact }) => {
    await axiosApi.put(`/contacts/${id}.json`, contact);
  }
);

export const deleteContact = createAsyncThunk<void, string>(
  'contacts/delete',
  async (id) => {
    await axiosApi.delete(`/contacts/${id}.json`);
  }
);
