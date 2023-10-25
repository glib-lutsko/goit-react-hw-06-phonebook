// import { nanoid } from 'nanoid';
// import { useState } from 'react';
// export const ContactForm = ({ contacts, onAddContact }) => {
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');
//   const [newContact, setNewContact] = useState({});

//   const handleChange = e => {
//     switch (e.target.name) {
//       case 'name':
//         setName(e.target.value);
//         break;
//       case 'number':
//         setNumber(e.target.value);
//         break;
//       default:
//         return;
//     }
//   };
//   const clearForm = () => {
//     setName('');
//     setNumber('');
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     setNewContact({ id: nanoid(), name, number });

//     const existsContact = contacts.find(contact => contact.name === name);

//     if (existsContact) {
//       alert(`${name} is already is contact`);
//     } else {
//       onAddContact(newContact);
//       clearForm();
//     }
//   };

import { nanoid } from 'nanoid';
import { useState } from 'react';

export const ContactForm = ({ contacts, onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const clearForm = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = { id: nanoid(), name, number };

    const existsContact = contacts.find(contact => contact.name === name);

    if (existsContact) {
      alert(`${name} is already in contacts`);
    } else {
      onAddContact(newContact);
      clearForm();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};
