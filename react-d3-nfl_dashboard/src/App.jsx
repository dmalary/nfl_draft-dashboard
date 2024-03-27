/* eslint-disable react/prop-types */

import { useState } from 'react'
import './App.css'

import BarChart from '../components/BarChart';
// import DropdownFilter from '../components/DropdownFilter';
import NavBar from '../components/NavBar';

import data from '../data/data.json'

// const testData = [130, 200, 170, 140, 130, 250, 160];

function App() {
  // console.log('data', data);
  
  const workingData = data.filter(d => d.year === 2001 && d.position === "LB" && d.position) // update with dropdown
  console.log('workingData', workingData);
  
  return (
    // add navbar that filters & returns data from dropdown with hooks 
    <div>
      <NavBar />
      <BarChart width={800} height={600} data={workingData}/>
    </div>
  )
}

export default App
