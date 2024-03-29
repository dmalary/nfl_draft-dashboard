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

  const bottom = height - margin.bottom;

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year)) // set with dropdown (years, round)
    .range([margin.left, width - margin.right])

  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.pick)]) // set with dropdown (position, all)
    .nice()
    .range([bottom, margin.top])

  const yAxis = d3.axisLeft(yScale);

  useEffect(() => {
    d3.select(".x-axis-scatter")
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "14px")
      // Rotate the labels to make them easier to read.
      // .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");
    
    d3.select(".y-axis-scatter")
      .call(yAxis)
      .selectAll("text")
      .attr("font-size", "14px");
  }, [xAxis, yAxis])

  return (
    <div className="container">
      <svg className="viz-scatter" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        
        <g className="x-axis-scatter" transform={`translate(0,${bottom})`}></g>
        <g className="y-axis-scatter" transform={`translate(${margin.left},0)`}></g>
      </svg>
    </div>
  )
}

export default ScatterChart;