/* eslint-disable react/prop-types */

import { useState } from 'react';

const DropdownFilter = ({ filterKey, data, getDataFilter }) => {
  const [filter, setFilter] = useState('');

  const handleChangeFilter = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
    getDataFilter(filterKey, event.target.value);
  }

  // console.log('filterKey', filterKey)
  // console.log('data', data)

  return (
    <div className='rounded-2xl bg-gray-400'>
      <label htmlFor="filter">{filterKey}: </label>
      <select
        name="filter"
        value={filter}
        onChange={handleChangeFilter}
      >
        <option value="">-- Please Select --</option>
        {data.map(el => ( 
           <option key={el} className={`${filterKey}-${el}`} value={`${el}`}>{el}</option>
        ))}
      </select>
    </div>
  )
};

export default DropdownFilter;