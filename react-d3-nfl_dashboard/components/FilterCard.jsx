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
  // const [dataUpdate, setDataUpdate] = useState(data.filter(d => d.team === "NYG" && d.position));
  const [dataUpdate, setDataUpdate] = useState({
    team: 'all',
    position: 'all',
  });
  const [teamValue, setTeamValue] = useState([filters.team, 'all']);
  const [positionValue, setPositionValue] = useState([filters.position, 'all']);
  // console.log('teamValue', teamValue)
  // console.log('positionValue', positionValue)

  const teams = [... new Set(data.flatMap((d) => d.team))].filter(d => d != null && d !== "").sort(d3.ascending);
  const positions = [... new Set(data.flatMap((d) => d.position))].filter(d => d != null && d !== "").sort(d3.ascending);
  // const colleges = [... new Set(data.flatMap((d) => d.college))].filter(d => d != null).sort(d3.ascending);

  const handleDropDownUpdate = (key, value) => {
    // console.log('key', key)
    // console.log('value', value)

    key === filters.team ? setTeamValue([key, value]) : setPositionValue([key, value]);
  }

  const handleFormSubmit = () => {
    setDataUpdate([teamValue, positionValue])
    console.log('dataUpdate', dataUpdate)

    // console.log('(e.target.value)', (e.target.value))
    onFilterChange(dataUpdate)
  }

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

