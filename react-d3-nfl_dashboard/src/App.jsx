/* eslint-disable react/prop-types */

import * as d3 from 'd3';

import { useState } from 'react'
import './App.css'

import DropdownFilter from '../components/DropdownFilter';
import RadioFilter from '../components/RadioFilter';
import ScatterChart from '../components/ScatterChart';
import ChartLegend from '../components/ChartLegend';
// import PieChart from '../components/PieChart';

import data from '../data/data.json'

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

const App = () => {
  const [chartFilter, setChartFilter] = useState([]);

  const teams = [... new Set(data.flatMap((d) => d.team))].filter(d => d != null && d !== "").sort(d3.ascending);
  const colleges = [... new Set(data.flatMap((d) => d.college))].filter(d => d != null).sort(d3.ascending);

  // const getDataFilter = (filter, value) => {
  //   console.log('filter', filter)
  //   console.log('value', value)
   
  //   setChartData(data.filter(d => d[filter] === value))

  // }
  const scatterData = data.filter(d => d.team === "NYG" && d.position)
  // const scatterData = data.filter(d => d.team === "NYG" && d.position === "WR" && d.position)

  const handleFilterUpdate = (index, value) => {
    const newChartFilter = [...chartFilter];
    console.log('newChartFilter', newChartFilter)
    newChartFilter[index] = value;
    setChartFilter(newChartFilter);
  };
  console.log('chartFilter', chartFilter);

  return (
      // add navbar that filters & returns data from dropdown with hooks 
    <div>
      <div className='w-1/4'>
        <h1>Title</h1>
      </div>
      <div>
        <div className='w-1/4 p-2'>
          <p><i>data source: <a href="http://https://www.pro-football-reference.com/">Pro Football Reference</a></i></p>
          <p>description of data, charts + filters</p>
        </div>
        <div className='flex'>
          <div className='w-1/3 p-4'>
            <div className='p-1'>
              <DropdownFilter filterKey={filters.team} data={teams} handleFilterUpdate={handleFilterUpdate}/> 
            </div>
            <div className='p-1'>
              <DropdownFilter filterKey={filters.college} data={colleges} handleFilterUpdate={handleFilterUpdate}/>
            </div>
            <div className='p-1'>
              <RadioFilter handleFilterUpdate={handleFilterUpdate}/> 
            </div>
            {/* <div className='w-1/4 p-4'>
              <button>Update</button>
            </div> */}
            <div className='p-1'>
              <ChartLegend data={scatterData}/>
            </div>
          </div>
          <div className='w-1/4 p-2'>
            <ScatterChart width={800} height={600} data={scatterData}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
