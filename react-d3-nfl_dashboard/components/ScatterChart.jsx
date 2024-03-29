/* eslint-disable react/prop-types */

import { useEffect } from "react";
import * as d3 from 'd3';

const margin = {
  top: 30,
  bottom: 70,
  left: 50,
  right: 25,
}

const ScatterChart = ({ width, height, data }) => {
  console.log('data', data)

  const scatterData = data.filter(d => d.team === "NYG" && d.position)

  const years = [... new Set(data.flatMap((d) => d.year))].filter(d => d != null).sort(d3.ascending);
  // console.log('years', years)

  const bottom = height - margin.bottom;

  const xScale = d3
    // .scaleBand()
    .scaleLinear()
    // .domain(data.map((d) => d.year)) // set with dropdown (years, round)
    // .domain(years) // set with dropdown (years, round)
    .domain([1999, 2024]) // set with dropdown (years, round)
    .range([margin.left, width - margin.right])

  const tickValues = d3.range(Math.ceil(2000 / 3) * 3, 2023, 3);

  const xAxis = d3
    .axisBottom(xScale)
    .tickValues(tickValues)
    // .tickSizeOuter(0);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(scatterData, (d) => d.pick)]) // set with dropdown (position, all)
    .nice()
    .range([bottom, margin.top])

  const yAxis = d3.axisLeft(yScale);

  const color = d3
    .scaleOrdinal(d3.schemeSet3)
    .domain(scatterData.map((d) => d.position));

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
      <svg className="viz-scatter" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g className="circles">
          {/* {scatterData.map((d) => (
            console.log('xScale(d.x)', xScale(d.x)),
            console.log('yScale(d.y)', yScale(d.y))
          ))} */}
          {scatterData.map((d, i) => (
            d.pick !== null && d.pick !== "" &&
            <circle
              key={i}
              r={2}
              cx={xScale(d.year)}
              cy={yScale(d.pick)}
              opacity={1}
              // stroke="#cb1dd1"
              // fill="#cb1dd1"
              stroke={color(scatterData[i].position)}
              fill={color(scatterData[i].position)}
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