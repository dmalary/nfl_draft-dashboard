/* eslint-disable react/prop-types */

import { useEffect, useState, useMemo } from "react";
import * as d3 from 'd3';
import { Delaunay } from "d3";

import Tooltip from "../components/Tooltip";
// import ChartLegend from '../components/ChartLegend';

const margin = {
  top: 20,
  bottom: 20,
  left: 50,
  right: 25,
}

const ScatterChart = ({ width, height, data }) => {
  // console.log('data', data)
  const [interactData, setInteractData] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const bottom = height - margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain([1999, 2024]) // set with dropdown (years, round)
    .range([margin.left, width - margin.right])

  const tickValues = d3.range(Math.ceil(1999 / 3) * 3, 2024, 3);

  const xAxis = d3
    .axisBottom(xScale)
    .tickValues(tickValues)
    .tickFormat(year => d3.timeFormat('%Y')(new Date(year, 0, 1)));
    // .tickSizeOuter(0);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.pick)])
    .nice()
    .range([bottom, margin.top])

  const yAxis = d3.axisLeft(yScale);

  const color = d3
    .scaleOrdinal(["#58b5e1", "#245a62", "#73eca3", "#333a9e", "#ff98cc", "#c02a85", "#1fa562", "#c9dd87", "#6a10a6", "#8fec2f", "#891c1a", "#da9f63", "#096013", "#f87945", "#5d3e47", "#ec102f", "#869764", "#7d9af7", "#ae73fb", "#edcbde", "#d62df6", "#f4d403", "#85540d"])
    .domain(data.map((d) => d.position));

  const keys = [... new Set(data.flatMap((d) => d.position))].filter(d => d != null);

  useEffect(() => {
    d3.select(".x-axis-scatter")
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "13px")
      .attr("text-anchor", "middle");
    
    d3.select(".y-axis-scatter")
      .call(yAxis)
      .selectAll("text")
      .attr("font-size", "13px");
  }, [xAxis, yAxis]);

  const delaunay = useMemo(() => {
    const formattedData = data.map((d) => [xScale(d.year), yScale(d.pick)]);
    return Delaunay.from(formattedData);
  }, [data]);

  const voronoi = useMemo(() => {
    return delaunay.voronoi([0, 0, width, height]);
  }, [delaunay, width, height]);

  return (
    <div className="container">
      {/* <ChartLegend data={data}/> */}
      <svg className="viz-scatter" width={width} height={height + height / 4} viewBox={`0 0 ${width} ${height - height / 8}`}>
        <g className="viz-legend">
          {/* LEGEND */}
          {keys.map((d, i) => {
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
                  fontSize={12}
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
        {/* CHART */}
        <g className="circles">
          {data.map((d, i) => (
            // console.log('d', d),
            d.pick !== null && d.pick !== "" &&
            <circle
              key={i}
              r={2}
              cx={xScale(d.year)}
              cy={yScale(d.pick)}
              opacity={1}
              stroke={color(data[i].position)}
              fill={color(data[i].position)}
              // fillOpacity={0.2}
              strokeWidth={1}
              // onMouseEnter={() => 
              //   setInteractData({ 
              //     xPos: xScale(d.year),
              //     yPos: yScale(d.pick),
              //     name: d.playerName,
              //   })
              // }
              // onMouseLeave={() => setInteractData(null)}
            />
          ))}
        </g>
        <g className="x-axis-scatter" transform={`translate(0,${bottom})`}></g>
        <g className="y-axis-scatter" transform={`translate(${margin.left},0)`}></g>

        {/* TOOLTIP 1 */}
        {/* <div
          style={{
            width: width - margin.right - margin.left,
            height: height - margin.top - margin.bottom,
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            marginLeft: margin.left,
            marginTop: margin.top,
          }}
        >
          <Tooltip interactData={interactData} />
        </div> */}

        {/* TOOLTIP 2 */}
        <g className="circles">
          {data.map((d, i) => (
            <path
              key={i}
              d={voronoi.renderCell(i)}
              stroke="grey"
              fill="transparent"
              opacity={0.1}
              onMouseOver={() => {
                setHoveredItem(i);
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

export default ScatterChart;