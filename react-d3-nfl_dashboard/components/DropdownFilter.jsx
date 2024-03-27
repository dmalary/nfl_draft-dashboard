/* eslint-disable react/prop-types */

import { useState } from 'react';

const DropdownFilter = ({ filterKey }) => {
  const [filter, setFilter] = useState('');

  const handleChangeFilter = event => {
    setFilter(event.target.value);
  }

  console.log('filterKey', filterKey)

  return (
    <div>
      <label htmlFor="filter">{filterKey}: </label>
      <select
        name="filter"
        value={filter}
        onChange={handleChangeFilter}
      >
        <option value="">-- Please Select --</option>
        <option value="name">Name</option>
        <option value="date">Date</option>
        <option value="category">Category</option>
      </select>
    </div>
  )
};

export default DropdownFilter;