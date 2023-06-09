import {
  ContactSet,
  ContactElement,
  ContactElSpan,
  ContactBtn,
} from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeContact,
  getContacts,
  getFilter,
} from '../../redux/contactsSlice';

function ContactList() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const onDeleteContact = id => {
    dispatch(removeContact(id));
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return Array.isArray(contacts)
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
      : [];
  };
  const contactsList = visibleContacts();

  return (
    <ContactSet>
      {contactsList.map(visibleContact => (
        <ContactElement key={visibleContact.id}>
          <ContactElSpan>{visibleContact.name}:</ContactElSpan>
          <ContactElSpan>{visibleContact.number}</ContactElSpan>
          <ContactBtn
            type="button"
            onClick={() => onDeleteContact(visibleContact.id)}
          >
            Delete
          </ContactBtn>
        </ContactElement>
      ))}
    </ContactSet>
  );
}

export default ContactList;


