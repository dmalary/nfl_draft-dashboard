/* eslint-disable react/prop-types */

import { useState } from 'react';

const DropdownFilter = ({ filterKey, data, handleFilterUpdate }) => {
  const [filter, setFilter] = useState('');

  const handleChangeFilter = (e) => {
    // console.log(e.target.value);
    setFilter(e.target.value);
    handleFilterUpdate(filterKey, e.target.value);
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
        <option key={`all-${filterKey}`} value={`${filterKey}`}>All {filterKey}s</option>
        {data.map(el => ( 
           <option key={el} className={`${filterKey}-${el}`} value={`${el}`}>{el}</option>
        ))}
      </select>
    </div>
  )
};

export default DropdownFilter;