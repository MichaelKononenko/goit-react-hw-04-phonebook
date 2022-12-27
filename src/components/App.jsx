import { useState } from "react";
import { ContactList, Filter } from "./contacts/Contacts";
import { GlobalStyle } from "./GlobalStyle.styled";
import { NewContactForm } from "./new-contact/NewContact";
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const notifyOptions = {position: 'center-top',timeout: 1500,}

export const App = () => {
    const [contacts, setContacts] = useState([
        {id: nanoid(3), name: 'Rosie Simpson', number: '459-12-56'},
        {id: nanoid(3), name: 'Hermione Kline', number: '443-89-12'},
        {id: nanoid(3), name: 'Eden Clements', number: '645-17-79'},
        {id: nanoid(3), name: 'Annie Copeland', number: '227-91-26'},
      ]);
    const [filter, setFilter] = useState('');

    const submitHandling = event =>{
      event.preventDefault();
      const form = event.currentTarget;
      const name = form.elements.name.value;
      const number = form.elements.number.value;
      if(contacts.find(item => item.name === name || item.number === number) ){
           Notify.warning('Looks like you have the same note', notifyOptions);
           return;
        }
      setContacts(prevArray => [...prevArray, ({id: nanoid(3), name: name, number: number})]);
      event.currentTarget.reset();
   }

   const newFilter = event => setFilter(event.currentTarget.value);
   
   const deleteContact = event => {
    const id = event.target.id;
    const person = contacts.filter(item => item.id === id);
    Notify.info(`${person[0].name} was deleted`, notifyOptions);
    setContacts(prevArray => prevArray.filter(item => item.id !== id));
   }

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
