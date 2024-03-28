/* eslint-disable react/prop-types */

// import { useEffect } from "react";
import * as d3 from 'd3';

const offsetX = 70;

const PieChart = ({ width, height, data }) => {
  // const totalValue = data.length;
  // console.log('totalValue', totalValue)

  // const keys = [... new Set(data.flatMap((d) => d.position))].filter(d => d != null);
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
    percentageBreakdown[key] = +((keyCounts.position[key] / total) * 100).toFixed(2); 
  });
  // console.log(percentageBreakdown);

  function transformObject(obj) {
    return Object.entries(obj).map(([name, value]) => ({ name, value }));
  }
  
  const pieData = transformObject(percentageBreakdown);

  // console.log('pieData.map((d) => d.name)', pieData.map((d) => d.name))

  const color = d3
    .scaleOrdinal(d3.schemeSet3)
    .domain(pieData.map((d) => d.name))
    // .domain(Object.keys(keyCounts.position).map((d) => d)) // update keyCounts.position value from dropdowns

  const pie = d3
    .pie()
    .value((d) => d.value);

  const outerRadius = Math.min(width - 2, height - 2) / 2 - offsetX;

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(outerRadius);

  // A separate arc generator for labels.
  const labelRadius = arc.outerRadius()() * 1
  const arcLabel = d3.arc()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

  const arcs = pie(pieData);
  // console.log('arcs', arcs)

  return (
    <div className="container">
      <svg
        width={width}
        height={height}
        viewBox={`${-width / 2 + offsetX} ${-height / 2} ${width} ${height}`}
        className="viz"
      >
        {arcs.map((d, i) => (
          <g key={d.data.name} stroke="white">
            <path d={arc(d)} fill={color(pieData[i].name)} />
            <text
              x={arcLabel.centroid(d)[0]}
              y={arcLabel.centroid(d)[1]}
              textAnchor="middle"
              stroke="none"
              fontSize={16}
              strokeWidth={0}
              fill="#ccc"
            >
              {`${pieData[i].name}, ${pieData[i].value}%`}
            </text>
          </g>
        ))}

        {/* Legend */}
        <g>
          {pieData.map((d, i) => {
            const x = outerRadius + 14;
            const y = -height / 2 + i * 20 + 20;

            return (
              <g key={d.name}>
                <rect x={x} y={y} width={20} height={15} fill={color(d.name)} />
                <text
                  x={x}
                  y={y}
                  dx={25}
                  fontSize={14}
                  alignmentBaseline="hanging"
                  fill='#fff'
                >
                  {d.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  )
};

export default PieChart;