/* eslint-disable react/prop-types */

import * as d3 from 'd3';

const ChartLegend = ({ data }) => {
  // console.log('data', data)

  const keys = [... new Set(data.flatMap((d) => d.position))].filter(d => d != null);
  console.log('keys', keys)

  const width = 250;
  const height = 250;

  const color = d3
    .scaleOrdinal(d3.schemeSet3)
    .domain(keys.map((d) => d.position));

  return (
    <div className="container">
      <svg className="viz-legend" width={250} height={400} viewBox={`0 0 ${width} ${height}`}>
          {/* {data.map((d, i) => { */}
          {keys.map((d, i) => {
            const x = Math.min(width - 2, height - 2) / 2 - 70 + 14;
            const y = -height / 4 + i * 20 + 20;
            return (
              <g key={d}>
                <rect x={x} y={y} width={20} height={15} fill={color(d)} />
                <text
                  x={x}
                  y={y}
                  dx={25}
                  fontSize={14}
                  alignmentBaseline="hanging"
                  fill='#fff'
                > 
                  {d}
                </text>
              </g>
            );
          })}
      </svg>
    </div>
  )
}

export default ChartLegend;