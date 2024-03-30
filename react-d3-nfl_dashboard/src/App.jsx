/* eslint-disable react/prop-types */

import { useState } from 'react'
import './App.css'

import FilterCard from '../components/FilterCard';
import ScatterChart from '../components/ScatterChart';

import data from '../data/data.json'

const App = () => {
  // const [workingData, setWorkingData] = useState(data.filter(d => d.team === "NYG" && d.position));
  const [workingData, setWorkingData] = useState(data.filter(d => d.team !== "" && d.position));
  
  const scatterData = data.filter(d => d.team !== "" && d.position)
  // const scatterData = data.filter(d => d.team === "BUF" && d.position === "QB" && d.position)
  // const scatterData = data.filter(d => d.team === "NYG" && (d.position === "WR" || d.position === "TE") && d.position)
  // const scatterData = data.filter(d => (d.position === "WR" || d.position === "TE") && d.position)

  const onFilterChange = (val) => {
    console.log('val', val);
    setWorkingData(data.filter(d => d.team === val.team && d.position === val.position && d.position))
  }
  console.log('workingData', workingData)

  return (
    <div className='flex'>
      <div className='w-1/3'>
        <div className=''>
          <h1>Title</h1>
        </div>
        <div className=' p-2'>
          <p><i>data source: <a href="http://https://www.pro-football-reference.com/">Pro Football Reference</a></i></p>
          <p>description of data, charts + filters</p>
        </div>
        <div>
          <FilterCard data={data} onFilterChange={onFilterChange}/>
        </div>
      </div>
      <div className='w-1/4 p-2'>
        {/* <ScatterChart width={800} height={600} data={scatterData}/> */}
        <ScatterChart width={800} height={600} data={workingData} />
      </div>
    </div>
  )
}

export default App
