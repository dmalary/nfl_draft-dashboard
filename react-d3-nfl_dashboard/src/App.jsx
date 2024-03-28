/* eslint-disable react/prop-types */

import * as d3 from 'd3';

import { useState } from 'react'
import './App.css'

import BarChart from '../components/BarChart';
import NavBar from '../components/NavBar';
import DropdownFilter from '../components/DropdownFilter';
import PieChart from '../components/PieChart';

import data from '../data/data.json'

const filters = {
  position: "position",
  yearsPlayed: "yearsPlayed",
  round: "round",
  team: "team",
  year: "year",
}

const App = () => {
  const [chartData, setChartData] = useState([]);

  // const rounds = [... new Set(data.flatMap((d) => d.round))].filter(d => d != null).sort(d3.ascending);
  const positions = [... new Set(data.flatMap((d) => d.position))].filter(d => d != null);
  const teams = [... new Set(data.flatMap((d) => d.team))].filter(d => d != null && d !== "").sort(d3.ascending);
  const years = [... new Set(data.flatMap((d) => d.year))].filter(d => d != null).sort(d3.ascending);
  
  const barData = data.filter(d => d.year === 2001 && d.position === "LB" && d.position) // update with dropdown

  const pieData = data.filter(d => d.year === 2001 && d.position) // update with dropdown
  console.log('pieData', pieData)

  const getDataFilter = (filter, value) => {
   console.log('filter', filter)
   console.log('value', value)
   
   setChartData(data.filter(d => d[filter] === value))

  }

  // get key/selection from NavBar > dropDownFilter  to filter workingData for all visualizations
  
  return (
    // add navbar that filters & returns data from dropdown with hooks 
    <div>
      {/* <NavBar dataParams={dataParams}/> */}
      <div>
        <DropdownFilter filterKey={filters.year} data={years} getDataFilter={getDataFilter}/>
        <DropdownFilter filterKey={filters.position} data={positions} getDataFilter={getDataFilter}/>
        <DropdownFilter filterKey={filters.team} data={teams} getDataFilter={getDataFilter}/> 
        {/* <DropdownFilter filterKey={filters.round} data={rounds}/> */}
      </div>
      {/* fix chartData so previous filter remains, move dropdowns back to NavBar and get dataParams[] to update data button onClick*/}
      {/* <BarChart width={800} height={600} data={chartData}/> */}
      <BarChart width={800} height={600} data={barData}/>
      <PieChart data={pieData}/>
    </div>
  )
}

export default App
