/* eslint-disable react/prop-types */

import * as d3 from 'd3';

// import { useState } from 'react'
import './App.css'

import BarChart from '../components/BarChart';
// import NavBar from '../components/NavBar';
import DropdownFilter from '../components/DropdownFilter';

import data from '../data/data.json'

const App = () => {
  // console.log('data', data);
  const filters = {
    position: "position",
    yearsPlayed: "yearsPlayed",
    round: "round",
    team: "team",
    year: "year",
  }

  const rounds = [... new Set(data.flatMap((d) => d.round))].filter(d => d != null).sort(d3.ascending);
  const positions = [... new Set(data.flatMap((d) => d.position))].filter(d => d != null);
  const teams = [... new Set(data.flatMap((d) => d.team))].filter(d => d != null).sort(d3.ascending);
  const years = [... new Set(data.flatMap((d) => d.year))].filter(d => d != null).sort(d3.ascending);
  
  // const dropdownList = (filter) => data.filter(d => d[filter])
  // const listData = data.filter(d => d.year)
  // console.log('listData', listData)
  
  const workingData = data.filter(d => d.year === 2001 && d.position === "LB" && d.position) // update with dropdown
  console.log('workingData', workingData);

  // get key/selection from NavBar > dropDownFilter  to filter workingData for all visualizations
  
  return (
    // add navbar that filters & returns data from dropdown with hooks 
    <div>
      {/* <NavBar listData={listData}/> */}
      <div>
        <DropdownFilter filterKey={filters.round} data={rounds}/>
        <DropdownFilter filterKey={filters.position} data={positions}/>
        <DropdownFilter filterKey={filters.team} data={teams}/> 
        <DropdownFilter filterKey={filters.year} data={years}/> 
      </div>
      <BarChart width={800} height={600} data={workingData}/>
    </div>
  )
}

export default App
