import { useState } from 'react'
import './App.css'

import BarChart from '../components/BarChart';

import data from '../data/data.json'

const testData = [130, 200, 170, 140, 130, 250, 160];

function App() {
  console.log('data', data);

  return (
    <BarChart width={450} height={300} data={testData}/>
  )
}

export default App
