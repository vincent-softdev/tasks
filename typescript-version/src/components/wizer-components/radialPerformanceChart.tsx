import React from 'react'

import { calculateArcPath, calculateLabelPosition, splitText } from '@/utils/chartUtils'
import { calculateBaseCirclePath, calculateStraightLineCoordinates } from '@/utils/radialChartUtils'

type RadialPerformanceChartProps = {
  data: {
    label: string
    percentage: number
    votes: string
    color: string
    radius: number // Each segment has its own radius
  }[]
}

const RadialPerformanceChart: React.FC<RadialPerformanceChartProps> = ({ data }) => {
  const chartCenter = 150 // Center of the chart
  const chartSize = 400 // Total chart width/height

  // Calculate total percentages for normalizing the arcs
  const totalPercentage = 100

  // Define label positions
  const labelPositions = [
    { x: chartCenter + 130, y: chartCenter - 50 }, // Top-left
    { x: chartCenter + 130, y: chartCenter + 50 }, // Bottom-left
    { x: chartCenter + 130, y: chartCenter + 10 }, // Bottom-left
    { x: chartCenter + 20, y: chartSize - 400 }, // Bottom-center left
    { x: chartCenter - 30, y: chartSize - 400 } // Bottom-center right
  ]

  let cumulativeAngle = -Math.PI / 2 // Start at the top of the circle

  const segments = data.map((segment, index) => {
    const startAngle = cumulativeAngle
    const angle = (segment.percentage / totalPercentage) * 2 * Math.PI
    const endAngle = startAngle + angle

    // Update cumulative angle for the next segment
    cumulativeAngle = endAngle

    let path

    // Handle the 100% case
    if (segment.percentage === 100) {
      path = `
        M ${chartCenter} ${chartCenter - segment.radius}
        A ${segment.radius} ${segment.radius} 0 1 1 ${chartCenter} ${chartCenter + segment.radius}
        A ${segment.radius} ${segment.radius} 0 1 1 ${chartCenter} ${chartCenter - segment.radius}
      `
    } else {
      const arcPath = calculateArcPath(startAngle, endAngle, segment.radius, chartCenter, chartCenter)

      path = `
        M ${arcPath.startX} ${arcPath.startY}
        A ${segment.radius} ${segment.radius} 0 ${arcPath.largeArcFlag} 1 ${arcPath.endX} ${arcPath.endY}
      `
    }

    return {
      path,
      labelPosition: labelPositions[index],
      color: segment.color,
      label: segment.label,
      percentage: segment.percentage,
      votes: segment.votes,
      connectionPoint: calculateLabelPosition(startAngle + angle / 2, segment.radius, chartCenter, chartCenter),
      basePath: calculateBaseCirclePath(segment.radius, chartCenter) // Base circle path
    }
  })

  return (
    <div className='relative flex-1 flex justify-center'>
      <svg width={chartSize} height={chartSize} overflow='visible'>
        {/* Draw base circles */}
        {segments.map((segment, index) => (
          <path
            key={`base-${index}`}
            d={segment.basePath}
            stroke='#e0e0e0' // Light gray for the base circle
            strokeWidth='1'
            fill='none'
          />
        ))}

        {/* Draw each segment */}
        {segments.map((segment, index) => (
          <path key={`segment-${index}`} d={segment.path} stroke={segment.color} strokeWidth='8' fill='none' />
        ))}

        {/* Center Dot */}
        <circle cx={chartCenter} cy={chartCenter} r='8' fill='#000' />

        {/* Labels and Connecting Lines */}
        {segments.map((segment, index) => {
          const { x: labelX, y: labelY } = segment.labelPosition
          const { x: connectionX, y: connectionY } = segment.connectionPoint
          const { x2, y2 } = calculateStraightLineCoordinates(connectionX, connectionY, labelX, labelY)
          const labelLines = splitText(segment.label, 10)

          return (
            <g key={`label-${index}`}>
              {/* Connecting Line */}
              <line
                x1={connectionX}
                y1={connectionY}
                x2={x2 < chartCenter + 100 ? x2 : x2 - 10}
                y2={y2 > chartCenter - 100 ? y2 : y2 + 40}
                stroke='#000'
                strokeWidth='1'
              />

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
                <tspan> ({segment.percentage}%)</tspan>
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
