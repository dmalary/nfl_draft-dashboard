/* eslint-disable react/prop-types */

import { useEffect } from "react";
import * as d3 from 'd3';

const PieChart = ({ width, height, data }) => {
  const totalValue = data.length;
  // console.log('totalValue', totalValue)

  const keys = [... new Set(data.flatMap((d) => d.position))].filter(d => d != null);
  // console.log(keys);

  const keyCounts = {};

  data.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (!keyCounts[key]) {
        keyCounts[key] = {};
      }
      if (!keyCounts[key][obj[key]]) {
        keyCounts[key][obj[key]] = 1;
      } else {
        keyCounts[key][obj[key]] += 1;
      }
    });
  });
  // console.log(keyCounts);
  
  const total = Object.values(keyCounts.position).reduce((acc, curr) => acc + curr, 0); // update keyCounts.position value from dropdowns

  const percentageBreakdown = {};
  Object.keys(keyCounts.position).forEach(key => { // update keyCounts.position value from dropdowns
    percentageBreakdown[key] = (keyCounts.position[key] / total) * 100;
  });
  console.log(percentageBreakdown);

  function transformObject(obj) {
    return Object.entries(obj).map(([name, value]) => ({ name, value }));
  }
  
  const pieData = transformObject(percentageBreakdown);
  console.log(pieData);

  const color = d3
    .scaleOrdinal(d3.schemeTableau10)
    .domain(pieData.map((d) => d.name))
    // .domain(Object.keys(keyCounts.position).map((d) => d)) // update keyCounts.position value from dropdowns

  const pie = d3
    .pie()
    .value((d) => d.value);


  return (
    <div>sim sim salabim</div>
  )
};

export default PieChart;