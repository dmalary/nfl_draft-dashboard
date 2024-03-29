/* eslint-disable react/prop-types */

import { useState } from 'react';

const teamOrg = {
  offense: ["QB", "RB", "WR", "TE", "T", "G", "C", "FB", "OL", "OT"],
  defense: ["DE", "S", "CB", "LB", "T", "OLB", "DT", "DB", "ILB", "DL", "NT",],
  specialteams: ["K", "LS", "P"],
}

const RadioFilter = () => {
// const RadioFilter = ({ filterKey, data, getDataFilter }) => {
  // const [filter, setFilter] = useState('');

  // const handleChangeFilter = (event) => {
  //   console.log(event.target.value);
  //   setFilter(event.target.value);
  //   getDataFilter(filterKey, event.target.value);
  // }

  // console.log('filterKey', filterKey)
  // console.log('data', data)


  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedCheckboxes.includes(option)) {
      setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== option));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, option]);
    }
  };

  console.log('selectedCheckboxes', selectedCheckboxes)

  return (
    <div>
      <div className='flex'>
        {/* <NavBar dataParams={dataParams}/> */}
        {/* filters trigger highlights & fade out css */}
        <div className='p-4'>
          {teamOrg.offense.map((position, index) => (
            <label key={index}>
              <input 
                type="checkbox" 
                name="position" 
                value={position} 
                checked={selectedCheckboxes.includes(position)}
                onChange={() => handleCheckboxChange(position)}
              />
              {position}
            </label>
          ))}
        </div>
        <div className='p-4'>
          {teamOrg.defense.map((position, index) => (
            <label key={index}>
              <input 
                type="checkbox" 
                name="position" 
                value={position} 
                checked={selectedCheckboxes.includes(position)}
                onChange={() => handleCheckboxChange(position)}
              />
              {position}
            </label>
          ))}
        </div>
        <div className='p-4'>
          {teamOrg.specialteams.map((position, index) => (
            <label key={index}>
              <input 
                type="checkbox" 
                name="position" 
                value={position} 
                checked={selectedCheckboxes.includes(position)}
                onChange={() => handleCheckboxChange(position)}
              />
              {position}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
};

export default RadioFilter;