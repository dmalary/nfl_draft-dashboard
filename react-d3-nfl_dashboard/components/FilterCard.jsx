/* eslint-disable react/prop-types */

import * as d3 from 'd3';
import { useState } from 'react';

import DropdownFilter from '../components/DropdownFilter';

const filters = {
  year: "year",
  team: "team",
  college: "college",
  position: "position",
  round: "round",
  yearsPlayed: "yearsPlayed",
  hof: "hof",
  retired: "retired"
}

const FilterCard = ({ data, onFilterChange }) => {
  const [teamValue, setTeamValue] = useState({[filters.team]: 'all'});
  const [positionValue, setPositionValue] = useState({[filters.position]: 'all'});

  const teams = [... new Set(data.flatMap((d) => d.team))].filter(d => d != null && d !== "").sort(d3.ascending);
  const positions = [... new Set(data.flatMap((d) => d.position))].filter(d => d != null && d !== "").sort(d3.ascending);
  // const colleges = [... new Set(data.flatMap((d) => d.college))].filter(d => d != null).sort(d3.ascending);

  const handleDropDownUpdate = (filter, value) => {
    setTeamValue(prevState => ({ ...prevState, [filter]: value === 'team' ? 'all' : value }));
    setPositionValue(prevState => ({ ...prevState, [filter]: value === 'position' ? 'all' : value}));
  };
  
  const handleFormSubmit = () => {
    const combinedValues = { ...teamValue, ...positionValue };
    onFilterChange(combinedValues);
  };
  

  return (
    <div className='p-4 text-left'>
      <div className='p-1'>
        <DropdownFilter 
          filterKey={filters.team} 
          data={teams} 
          handleFilterUpdate={handleDropDownUpdate}
      /> 
      </div>
      <div className='p-1'>
        <DropdownFilter 
          filterKey={filters.position} 
          data={positions} 
          handleFilterUpdate={handleDropDownUpdate}
      /> 
      </div>
      {/* <div className='p-1'>
        <DropdownFilter 
          filterKey={filters.college} 
          data={colleges} 
          // handleFilterUpdate={handleFilterUpdate}
      />
      </div> */}
      {/* <div className='p-1'>
        <RadioFilter handleFilterUpdate={handleFilterUpdate}/> // for HOF?
      </div> */}
      {/* ADD A SLIDER FOR YEARS? */}
      {/* <div className='w-1/4 p-4'>
        <button>Update</button>
      </div> */}
      <div className='pt-2'>
        <button value="form-btn" onClick={handleFormSubmit}>update</button>
      </div>
    </div>    
  )
}

export default FilterCard;

