import React from 'react'

import {
  calculateArcPath,
  calculateBaseCirclePath,
  splitText,
  calculateMidpoint,
  calculateStraightLineCoordinates
} from '@/utils/radialChartUtils'

type RadialPerformanceChartProps = {
  data: {
    label: string
    percentage: number
    votes: string
    color: string
    radius: number
  }[]
}

const RadialPerformanceChart = (props: RadialPerformanceChartProps) => {
  const chartCenter = 150 // Center of the chart
  const chartSize = 350 // Total chart width/height

  let cumulativeAngle = (-Math.PI * Math.random()) / 2 // Random initial start angle

  return (
    <div className='relative flex-1'>
      <svg width={chartSize} height={chartSize}>
        {/* Draw base circles */}
        {props.data.map((segment, index) => (
          <path
            key={`base-${index}`}
            d={calculateBaseCirclePath(segment.radius, chartCenter)}
            stroke='#e0e0e0' // Light gray for the base circle
            strokeWidth='1'
            fill='none'
          />
        ))}
        {/* Draw each segment */}

        {props.data.map((segment, index) => {
          const arcPath = calculateArcPath(segment.radius, segment.percentage, chartCenter, cumulativeAngle)

          cumulativeAngle += (segment.percentage / 100) * 2 * Math.PI // Update cumulative angle for the next segment

          return <path key={index} d={arcPath} stroke={segment.color} strokeWidth='8' fill='none' />
        })}
        {/* Center Dot */}
        <circle cx={chartCenter} cy={chartCenter} r='8' fill='#000' />
        {/* Labels */}
        {props.data.map((segment, index) => {
          const midpoint = calculateMidpoint(segment.radius, segment.percentage, chartCenter)

          const labelX =
            chartCenter + (segment.radius + 40) * Math.cos(-Math.PI / 2 + (segment.percentage / 100) * Math.PI)

          const labelY =
            chartCenter + (segment.radius + 40) * Math.sin(-Math.PI / 2 + (segment.percentage / 100) * Math.PI)

          const { x2, y2 } = calculateStraightLineCoordinates(midpoint.x, midpoint.y, labelX, labelY)
          const labelLines = splitText(segment.label, 10)

          return (
            <g key={index}>
              {/* Connecting Line */}
              <line x1={midpoint.x} y1={midpoint.y} x2={x2} y2={y2} stroke='#000' strokeWidth='1' />

              {/* Label Text */}
              <text
                x={labelX}
                y={labelY}
                fontSize='12'
                textAnchor={labelX > chartCenter ? 'start' : 'end'}
                alignmentBaseline='middle'
                className='font-bold'
              >
                {labelLines.map((line, i) => (
                  <tspan key={i} x={labelX} dy={i === 0 ? '' : '1.2em'}>
                    {line}
                  </tspan>
                ))}
                ({segment.percentage}%)
              </text>

              {/* Votes Text */}
              <text
                x={labelX}
                y={labelY + labelLines.length * 14}
                fontSize='10'
                textAnchor={labelX > chartCenter ? 'start' : 'end'}
                alignmentBaseline='middle'
                fill='#555'
              >
                {segment.votes} people voted
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default RadialPerformanceChart
