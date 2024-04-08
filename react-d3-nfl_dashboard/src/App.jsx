/* eslint-disable react/prop-types */

import { useState } from 'react'
import './App.css'

import FilterCard from '../components/FilterCard';
import ScatterChart from '../components/ScatterChart';

import data from '../data/data.json'

const App = () => {
  const [workingData, setWorkingData] = useState(data.filter(d => d.team !== "" && d.position));
  
  const onFilterChange = (val) => {
    const newData = data.filter(d => {
      return (val.team === 'all' || d.team === val.team) && 
             (val.position === 'all' || d.position === val.position);
    });

    setWorkingData(newData);
  }

  return (
    <div className='grid sm:grid-cols-3 gap-3 md:grid-cols-3 gap-3'>
      <div className="sm:hidden">
        <p>This site is best experienced on larger screens.</p>
      </div>
      <div className='hidden sm:block p-6 main-card rounded-lg'>
        <div className='text-left'>
          <h1 className='text-4xl font-semibold'>NFL Draft Positional History</h1>
        </div>
        <div className='text-left pt-5'>
          <p className='pb-3 text-sm'><i>Data source: <a href="http://https://www.pro-football-reference.com/">Pro Football Reference</a></i></p>
          <p className='pb-3 text-sm'><i>Scraping code: <a href="https://github.com/dmalary/nfl_value/blob/main/scrape-draft_history_alt.js">GitHub</a></i></p>
          <p className='pb-3 text-sm'><i>App code: <a href="https://github.com/dmalary/nfl_draft-dashboard">GitHub</a></i></p>
          <div className='p-4'><hr /></div>
          <p className='pb-2'>This scatter plot depicts all NFL draft picks, from 2000-2023.</p>
          <p className='pb-2'>The x-axis represents years, and the y-axis the number at which a player was picked in the draft (eg 1st pick, 12th pick, etc).</p>
          <p className='pb-2'>The chart filters below include: teams, player positions.</p>
        </div>
        <div className='pt-5'>
          <FilterCard data={data} onFilterChange={onFilterChange}/>
        </div>
      </div>
      <div className='hidden sm:block p-2 col-span-2'>
        {/* <ScatterChart width={800} height={600} data={scatterData}/> */}
        <ScatterChart width={850} height={550} data={workingData} />
      </div>
    </div>
  )
}

export default App
