/* eslint-disable react/prop-types */

import { useEffect } from "react";
import * as d3 from 'd3';

const PieChart = ({ width, height, data }) => {
  // console.log('data', data.length)

  const totalValue = data.length;
  console.log('totalValue', totalValue)

  console.log([... new Set(data.flatMap((d) => d.position))].filter(d => d != null))

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

  console.log(keyCounts);

  const total = Object.values(keyCounts.position).reduce((acc, curr) => acc + curr, 0); // update keyCounts.position value from dropdowns?

  const percentageBreakdown = {};
  Object.keys(keyCounts.position).forEach(key => {
    percentageBreakdown[key] = (keyCounts.position[key] / total) * 100;
  });

  console.log(percentageBreakdown);

  return (
    <div>sim sim salabim</div>
  )
};

export default PieChart;