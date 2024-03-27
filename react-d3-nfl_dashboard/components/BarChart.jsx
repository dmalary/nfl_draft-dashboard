const barWidth = 60;

const barChart = ({ width, height, data }) => {
  return (
    <div className="container">
      <svg className="viz" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g className="bars">
          {data.map((d, i) => (
            <rect
              key={i}
              width={barWidth}
              height={d}
              x={i * (barWidth + 5)}
              y={height - d}
              fill="#6baed6"
            />
          ))}
        </g>
      </svg>
    </div>
  )
};

export default barChart;