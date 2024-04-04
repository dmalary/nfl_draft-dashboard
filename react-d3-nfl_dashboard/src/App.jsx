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
    <div className='grid grid-cols-3 gap-3'>
      <div className='p-6 main-card rounded-lg'>
        <div className='text-left'>
          <h1 className='text-4xl font-semibold'>NFL Draft Positional History</h1>
        </div>
        <div className='text-left pt-5'>
          <p><i>data source: <a href="http://https://www.pro-football-reference.com/">Pro Football Reference</a></i></p>
          {/* <p>data scraped, and built as json. contains all draft picks from 2000-2023</p> */}
          <p>scatter plot, depicts: x-axis years; y-axis player pick # in the draft</p>
          <p>filters include: teams, player positions</p>
        </div>
        <div className='pt-5'>
          <FilterCard data={data} onFilterChange={onFilterChange}/>
        </div>
      </div>
      <div className='p-2 col-span-2'>
        {/* <ScatterChart width={800} height={600} data={scatterData}/> */}
        <ScatterChart width={850} height={550} data={workingData} />
      </div>
    </div>
  )
}

export default App
