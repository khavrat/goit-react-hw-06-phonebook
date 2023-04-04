import { createSlice } from '@reduxjs/toolkit';
import shortid from 'shortid';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },

  reducers: {
    addContact: (state, action) => {
      const { name, number } = action.payload;
      const id = shortid.generate();
      const searchedContact = state.contacts.find(
        contact =>
          contact.name.toLocaleLowerCase() ===
          action.payload.name.toLocaleLowerCase()
      );
      if (searchedContact) {
        return alert(`${action.payload.name} is already in contacts`);
      } else {
        state.contacts.push({ id, name, number });
      }
    },

    removeContact: (state, action) => {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload
      );
      if (index !== -1) {
        state.contacts.splice(index, 1);
      }
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: 'Contacts',
  storage,
};


export const persistedReducer = persistReducer(persistConfig, contactsSlice.reducer);

export const { addContact, removeContact, setFilter } = contactsSlice.actions;

// Selectors
export const getContacts = state => state.contacts.contacts;
export const getFilter = state => state.contacts.filter;