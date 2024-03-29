/* eslint-disable react/prop-types */

import { useEffect } from "react";
import * as d3 from 'd3';

const margin = {
  top: 30,
  bottom: 70,
  left: 50,
  right: 25,
}

const BarChart = ({ width, height, data }) => {

  const barData = data.filter(d => d.year === 2005 && d.position === "DB" && d.position) // update with dropdown

  const bottom = height - margin.bottom;

  const xScale = d3
    .scaleBand()
    .domain(barData.map((d) => d.round)) // set with dropdown (years, round)
    .range([margin.left, width - margin.right])
    .padding(.1)

  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(barData, (d) => d.yearsPlayed)]) // set with dropdown (position, all)
    .nice()
    .range([bottom, margin.top])

  const yAxis = d3.axisLeft(yScale);

  useEffect(() => {
    d3.select(".x-axis-bar")
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "14px")
      // Rotate the labels to make them easier to read.
      // .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");
    
    d3.select(".y-axis-bar")
      .call(yAxis)
      .selectAll("text")
      .attr("font-size", "14px");
  }, [xAxis, yAxis])

  return (
    <div className="container">
      <svg className="viz" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g className="bars">
          {barData.map((d, i) => (
            <rect
              className={`rect-${i}`}
              key={d.key && d.key}
              width={xScale.bandwidth()}
              height={bottom - yScale(d.yearsPlayed)}
              x={xScale(d.round)}
              y={yScale(d.yearsPlayed)}
              fill="#6baed6"
            />
          ))}
        </g>
        <g className="x-axis-bar" transform={`translate(0,${bottom})`}></g>
        <g className="y-axis-bar" transform={`translate(${margin.left},0)`}></g>
      </svg>
    </div>
  )
};

export default BarChart;