/* eslint-disable react/prop-types */

import { useState } from 'react'
import './App.css'

import FilterCard from '../components/FilterCard';
import ScatterChart from '../components/ScatterChart';

import data from '../data/data.json'

const App = () => {
  const [workingData, setWorkingData] = useState(data.filter(d => d.team !== "" && d.position));
  
  const onFilterChange = (val) => {
    console.log('val', val);
    setWorkingData(data.filter(d => d.team === val.team && d.position === val.position && d.position))
  }
  console.log('workingData', workingData)

  return (
    <div className='flex'>
      <div className='w-1/3'>
        <div className='text-left'>
          <h1>NFL Draft Positional History</h1>
        </div>
        <div className='text-left p-2'>
          <p><i>data source: <a href="http://https://www.pro-football-reference.com/">Pro Football Reference</a></i></p>
          <p>data scraped, and built as json. contains all draft picks from 2000-2023</p>
          <p>scatter plot, depicts: x-axis years; y-axis player pick # in the draft</p>
          <p>filters include: teams, player positions</p>
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
