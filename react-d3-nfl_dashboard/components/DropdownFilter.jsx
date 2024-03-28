/* eslint-disable react/prop-types */

import { useState } from 'react';

const DropdownFilter = ({ filterKey, data }) => {
  const [filter, setFilter] = useState('');

  const handleChangeFilter = event => {
    setFilter(event.target.value);
  }

  console.log('filterKey', filterKey)
  console.log('data', data)

  return (
    <div className='rounded-2xl bg-gray-400'>
      <label htmlFor="filter">{filterKey}: </label>
      <select
        name="filter"
        value={filter}
        onChange={handleChangeFilter}
      >
        <option value="">-- Please Select --</option>
        {/* map over data and create option element for each */}
        {data.map(el => ( 
           <option key={el} value={`${filterKey}-${el}`}>{el}</option>
        ))}
        {/* <option value="name">Name</option>
        <option value="date">Date</option>
        <option value="category">Category</option> */}
      </select>
    </div>
  )
};

export default DropdownFilter;