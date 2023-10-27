import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import {
  addContact,
  deleteContact,
  updateFilter,
} from '../components/redux/contactSlice';

const LOCAL_KEY = 'phoneContacts';

export const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  const [isDataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!isDataLoaded) {
      const contactsFromLocalStorage = JSON.parse(
        localStorage.getItem(LOCAL_KEY)
      );

      if (contactsFromLocalStorage) {
        dispatch(addContact(contactsFromLocalStorage));
        setDataLoaded(true);
      }
    }
  }, [dispatch, isDataLoaded]);

  useEffect(() => {
    if (isDataLoaded) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
    }
  }, [contacts, isDataLoaded]);

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  const handleFilterChange = e => {
    dispatch(updateFilter(e.target.value.toLowerCase()));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(
    contact => contact.name && contact.name.toLowerCase().includes(filter || '')
  );

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </>
  );
};
