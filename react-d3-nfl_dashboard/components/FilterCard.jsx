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
  const [dataUpdate, setDataUpdate] = useState(({
    team: 'all',
    position: 'all',
  }));
  const [teamDropDown, setTeamDropDown] = useState('all');
  const [positionDropDown, setPositionDropDown] = useState('all');

  const teams = [... new Set(data.flatMap((d) => d.team))].filter(d => d != null && d !== "").sort(d3.ascending);
  const positions = [... new Set(data.flatMap((d) => d.position))].filter(d => d != null && d !== "").sort(d3.ascending);
  const colleges = [... new Set(data.flatMap((d) => d.college))].filter(d => d != null).sort(d3.ascending);

  const handleTeamUpdate = (index, value) => {    
    setTeamDropDown(value);

        // setDataUpdate(data.filter(d => d.team === teamDropDown && d.position))
    // setDataUpdate([...dataUpdate, dataUpdate.team = value])
    // setDataUpdate({team: value})
    // console.log('dataUpdate', dataUpdate)
  };
  // console.log('teamDropDown', teamDropDown)
  
  const handlePositionUpdate = (index, value) => {   
    setPositionDropDown(value);
    // setDataUpdate(data.filter(d => d.team === positionDropDown && d.position))
    
    // setDataUpdate({position: value})
    // console.log('dataUpdate', dataUpdate)
  };
  // console.log('positionDropDown', positionDropDown)

  const handleFormSubmit = (e) => {
    // onFilterChange(e.target.value)
    // console.log('dataUpdate', dataUpdate)
    setDataUpdate({
      team: teamDropDown,
      position: positionDropDown,
    })

    onFilterChange(dataUpdate)

    // setDataUpdate(data.filter(d => d.team === teamDropDown && d.position))
    // setDataUpdate([...dataUpdate, dataUpdate.team = value])
    // setDataUpdate({team: value})
    // setDataUpdate(prevValues => {
    //   const updatedValues = [...prevValues];
    //   updatedValues[index] = newValue;
    //   return updatedValues;
    // });
  }

  return (
    <div className='p-4 text-left'>
      <div className='p-1'>
        <DropdownFilter 
          filterKey={filters.team} 
          data={teams} 
          handleFilterUpdate={handleTeamUpdate}
      /> 
      </div>
      <div className='p-1'>
        <DropdownFilter 
          filterKey={filters.position} 
          data={positions} 
          handleFilterUpdate={handlePositionUpdate}
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
      <div className='p-2'>
        <button value="form-btn" onClick={handleFormSubmit}>update</button>
      </div>
    </div>    
  )
}

export default FilterCard;

