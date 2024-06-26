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

  const handleTeamDropDown = (filter, value) => {
    setTeamValue(prevState => ({ ...prevState, [filter]: value === 'team' ? 'all' : value }));
  };

  const handlePositionDropDown = (filter, value) => {
    setPositionValue(prevState => ({ ...prevState, [filter]: value === 'position' ? 'all' : value}));
  };
  
  const handleFormSubmit = () => {
    const combinedValues = { ...teamValue, ...positionValue };
    onFilterChange(combinedValues);
  };
  
  return (
    <div className='text-left'>
      <div className='dropdowns'>
        <DropdownFilter 
          filterKey={filters.team} 
          data={teams} 
          handleFilterUpdate={handleTeamDropDown}
      /> 
      </div>
      <div className='dropdowns'>
        <DropdownFilter 
          filterKey={filters.position} 
          data={positions} 
          handleFilterUpdate={handlePositionDropDown}
      /> 
      </div>
      {/* <div className='dropdowns'>
        <DropdownFilter 
          filterKey={filters.college} 
          data={colleges} 
          // handleFilterUpdate={handleFilterUpdate}
      />
      </div> */}
      {/* <div className=''>
        <RadioFilter handleFilterUpdate={handleFilterUpdate}/> // for HOF?
      </div> */}
      {/* ADD A SLIDER FOR YEARS? */}
      <div className='dropdown-btn'>
        <button value="form-btn" onClick={handleFormSubmit}>Update</button>
      </div>
    </div>    
  )
}

export default FilterCard;

