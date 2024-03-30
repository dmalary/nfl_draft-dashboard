/* eslint-disable react/prop-types */

import { useEffect } from "react";
import * as d3 from 'd3';

// import ChartLegend from '../components/ChartLegend';

const margin = {
  top: 30,
  bottom: 70,
  left: 50,
  right: 25,
}

const ScatterChart = ({ width, height, data }) => {
  // console.log('data', data)

  const bottom = height - margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain([1999, 2024]) // set with dropdown (years, round)
    .range([margin.left, width - margin.right])

  const tickValues = d3.range(Math.ceil(1999 / 3) * 3, 2024, 3);

  const xAxis = d3
    .axisBottom(xScale)
    .tickValues(tickValues)
    // .tickSizeOuter(0);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.pick)])
    .nice()
    .range([bottom, margin.top])

  const yAxis = d3.axisLeft(yScale);

  const color = d3
    .scaleOrdinal(d3.schemeSet3)
    .domain(data.map((d) => d.position));

  const keys = [... new Set(data.flatMap((d) => d.position))].filter(d => d != null);

  useEffect(() => {
    d3.select(".x-axis-scatter")
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "13px")
      // Rotate the labels to make them easier to read.
      // .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");
    
    d3.select(".y-axis-scatter")
      .call(yAxis)
      .selectAll("text")
      .attr("font-size", "13px");
  }, [xAxis, yAxis]);

  return (
    <div className="container">
      {/* <ChartLegend data={data}/> */}
      <svg className="viz-scatter" width={width} height={height + height / 4} viewBox={`0 0 ${width} ${height - height / 8}`}>
        <g className="viz-legend">
          {/* {data.map((d, i) => { */}
          {keys.map((d, i) => {
            // const x = Math.min(width - 2, height - 2) / 2 - 70 + 14;
            // const y = -height / 4 + i * 20 + 20;

            const x = 20 + i * 28;
            const y = -40

            return (
              <g key={d}>
                <rect x={x} y={y} width={20} height={15} fill={color(d)} />
                <text
                  x={x}
                  y={y}
                  // dx={25}
                  dy={25}
                  fontSize={13}
                  alignmentBaseline="hanging"
                  fill='#fff'
                  // textAnchor="middle"
                > 
                  {d}
                </text>
              </g>
            );
          })}
        </g>
        <g className="circles">
          {data.map((d, i) => (
            d.pick !== null && d.pick !== "" &&
            <circle
              key={i}
              r={2}
              cx={xScale(d.year)}
              cy={yScale(d.pick)}
              opacity={1}
              stroke={color(data[i].position)}
              fill={color(data[i].position)}
              fillOpacity={0.2}
              strokeWidth={1}
            />
          ))}
        </g>
        <g className="x-axis-scatter" transform={`translate(0,${bottom})`}></g>
        <g className="y-axis-scatter" transform={`translate(${margin.left},0)`}></g>
      </svg>
    </div>
  )
}

export default ScatterChart;