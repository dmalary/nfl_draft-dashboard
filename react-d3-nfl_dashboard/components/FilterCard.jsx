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

const FilterCard = ({data}) => {
  const [dataUpdate, setDataUpdate] = useState(data.filter(d => d.team === "NYG" && d.position));
  const [teamDropDown, setTeamDropDown] = useState([]);
  const [positionDropDown, setPositionDropDown] = useState([]);

  const teams = [... new Set(data.flatMap((d) => d.team))].filter(d => d != null && d !== "").sort(d3.ascending);
  const positions = [... new Set(data.flatMap((d) => d.position))].filter(d => d != null && d !== "").sort(d3.ascending);
  // const colleges = [... new Set(data.flatMap((d) => d.college))].filter(d => d != null).sort(d3.ascending);

  const handleTeamUpdate = (index, value) => {    
    setTeamDropDown(value);
    // setDataUpdate(data.filter(d => d.team === teamDropDown && d.position))
  };
  
  const handlePositionUpdate = (index, value) => {   
    setPositionDropDown(value);
    // setDataUpdate(data.filter(d => d.team === positionDropDown && d.position))
  };

  return (
    <div className='w-7/8 p-4'>
      <div className='p-1'>
        <DropdownFilter filterKey={filters.team} data={teams} handleFilterUpdate={handleTeamUpdate}/> 
      </div>
      {/* <div className='p-1'>
        <DropdownFilter filterKey={filters.position} data={positions} handleFilterUpdate={handlePositionUpdate}/> 
      </div> */}
      {/* <div className='p-1'>
        <DropdownFilter filterKey={filters.college} data={colleges} handleFilterUpdate={handleFilterUpdate}/>
      </div> */}
      {/* <div className='p-1'>
        <RadioFilter handleFilterUpdate={handleFilterUpdate}/> 
      </div> */}
      {/* ADD A SLIDER FOR YEARS? */}
      {/* <div className='w-1/4 p-4'>
        <button>Update</button>
      </div> */}
      {/* <div className='p-1'>
        <ChartLegend data={scatterData}/>
      </div> */}
      <button>update</button>
    </div>    
  )
}

export default FilterCard;

