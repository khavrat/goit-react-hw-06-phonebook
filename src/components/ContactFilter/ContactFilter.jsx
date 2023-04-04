import { useDispatch, useSelector } from 'react-redux';
import { setFilter, getFilter } from 'redux/contactsSlice';
import { FilterLabel, FilterInput } from './ContactFilter.styled';

function ContactFilter() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <div>
      <FilterLabel htmlFor="filter">Find contacts by name</FilterLabel>
      <FilterInput
        type="text"
        name="filter"
        value={filter}
        onChange={changeFilter}
      />
    </div>
  );
}

export default ContactFilter;
