/* eslint-disable react/prop-types */

import { useState } from 'react';

const positionKeys = {
  offense: ["QB", "RB", "WR", "TE", "T", "G", "C", "FB", "OL", "OT"],
  defense: ["DE", "S", "CB", "LB", "T", "OLB", "DT", "DB", "ILB", "DL", "NT",],
  specialteams: ["K", "LS", "P"],
}

const RadioFilter = ({ handleFilterUpdate }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedCheckboxes.includes(option)) {
      setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== option));
      handleFilterUpdate("position", selectedCheckboxes)
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, option]);
      handleFilterUpdate("position", selectedCheckboxes)
    }
  };

  // const handleChange = (e) => {
  //   handleFilterUpdate(index, e.target.value);
  // };

  // console.log('selectedCheckboxes', selectedCheckboxes)

  return (
    <div>
      <div className='flex'>
        {/* <NavBar dataParams={dataParams}/> */}
        {/* filters trigger highlights & fade out css */}
        <div className='p-4'>
          {positionKeys.offense.map((position, index) => (
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
          {positionKeys.defense.map((position, index) => (
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
          {positionKeys.specialteams.map((position, index) => (
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