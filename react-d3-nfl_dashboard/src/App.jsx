/* eslint-disable react/prop-types */

import * as d3 from 'd3';

import { useState } from 'react'
import './App.css'

import DropdownFilter from '../components/DropdownFilter';
import RadioFilter from '../components/RadioFilter';
import BarChart from '../components/BarChart';
import ScatterChart from '../components/ScatterChart';
// import PieChart from '../components/PieChart';

import data from '../data/data.json'

const filters = {
  year: "year",
  team: "team",
  position: "position",
  round: "round",
  yearsPlayed: "yearsPlayed",
  hof: "hof",
  retired: "retired"
}

const App = () => {
  const [chartData, setChartData] = useState([]);

  const teams = [... new Set(data.flatMap((d) => d.team))].filter(d => d != null && d !== "").sort(d3.ascending);
  const years = [... new Set(data.flatMap((d) => d.year))].filter(d => d != null).sort(d3.ascending);
  // const rounds = [... new Set(data.flatMap((d) => d.round))].filter(d => d != null).sort(d3.ascending);

  const getDataFilter = (filter, value) => {
    console.log('filter', filter)
    console.log('value', value)
   
    setChartData(data.filter(d => d[filter] === value))

  }
  // get key/selection from NavBar > dropDownFilter  to filter workingData for all visualizations

  return (
      // add navbar that filters & returns data from dropdown with hooks 
    <div>
      <div>
        <h1>Title</h1>
        <p><i>data source:</i></p>
        <p>description of data, charts + filters</p>
      </div>
      <div>
        <div className='w-1/4 p-4'>
          <h3>Filters title</h3>
        </div>
        <div className='flex'>
          <div className='w-1/4 p-4'>
            <div className='p-4'>
              <DropdownFilter filterKey={filters.year} data={years} getDataFilter={getDataFilter}/>
            </div>
            <div className='p-4'>
              <DropdownFilter filterKey={filters.team} data={teams} getDataFilter={getDataFilter}/> 
            </div>
            <div className='p-4'>
              <RadioFilter />
            </div>
            <div className='w-1/4 p-4'>
              <button>Update</button>
            </div>
          </div>
          <div className='w-1/4 p-4'>
            <ScatterChart width={800} height={600} data={data}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
