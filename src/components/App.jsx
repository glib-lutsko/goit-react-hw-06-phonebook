import React, { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const LOCAL_KEY = 'phoneContacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFormLocalStorage = JSON.parse(
      localStorage.getItem(LOCAL_KEY)
    );

    if (contactsFormLocalStorage.length) {
      console.log('pyk');
      setContacts(contactsFormLocalStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    setContacts(prevState => [...prevState, newContact]);
    console.log(newContact);
  };

  const handleFilterChange = e => {
    const newFilter = e.target.value.toLowerCase();
    setFilter(newFilter);
  };

  const handleDeleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filteredContacts = contacts.filter(
    contact => contact.name && contact.name.toLowerCase().includes(filter)
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
