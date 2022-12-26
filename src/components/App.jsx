import { useState } from "react";
import { ContactList, Filter } from "./contacts/Contacts";
import { GlobalStyle } from "./GlobalStyle.styled";
import { NewContactForm } from "./new-contact/NewContact";

export const App = () => {
    const [contacts, setContacts] = useState([
        {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
      ]);
    const [filter, setFilter] = useState('');

    const submitHandling = event =>{
      event.preventDefault();
      const id = contacts.length + 1;
      const form = event.currentTarget;
      const name = form.elements.name.value;
      const number = form.elements.number.value;
      setContacts(prevArray => [...prevArray, ({id: 'id-' + id, name: name, number: number})]);
   }

   const newFilter = event => setFilter(event.currentTarget.value);
   
   const deleteContact = event => setContacts(prevArray => prevArray.filter(item => item.id !== event.currentTarget.id));

   return(
    <div style={{padding: "20px"}}>
        <GlobalStyle/>
        <div>
        <h1 style={{marginBottom: "20px"}}>Phonebook</h1>
        <NewContactForm submitHandling = {submitHandling} />

        <h2 style={{marginBottom: "10px"}}>Contacts</h2>
        <Filter setFilter={newFilter}/>
        <ContactList contacts={contacts} filter={filter} deleteContact={deleteContact}/>
      </div>
    </div>
  )
};
