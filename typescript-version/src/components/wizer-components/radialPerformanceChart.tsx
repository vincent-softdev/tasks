import React from 'react'

import { calculateArcPath, calculateLabelPosition, splitText } from '@/utils/chartUtils'
import { calculateBaseCirclePath } from '@/utils/radialChartUtils'

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

  // Keep track of the cumulative angle
  let cumulativeAngle = -Math.PI / 2 // Random initial start angle

  const segments = data.map(segment => {
    const startAngle = cumulativeAngle
    const angle = (segment.percentage / totalPercentage) * 2 * Math.PI
    const endAngle = startAngle + angle
    const midAngle = startAngle + angle / 2 // Midpoint angle for labels and lines

    // Update cumulative angle for the next segment
    cumulativeAngle = endAngle

    // Generate arc path with segment's radius
    const arcPath = calculateArcPath(startAngle, endAngle, segment.radius, chartCenter, chartCenter)

    return {
      path:
        segment.percentage === totalPercentage
          ? `
        M ${chartCenter} ${chartCenter - segment.radius}
        A ${segment.radius} ${segment.radius} 0 1 1 ${chartCenter} ${chartCenter + segment.radius}
        A ${segment.radius} ${segment.radius} 0 1 1 ${chartCenter} ${chartCenter - segment.radius}
        Z
      `
          : `
        M ${arcPath.startX} ${arcPath.startY}
        A ${segment.radius} ${segment.radius} 0 ${arcPath.largeArcFlag} 1 ${arcPath.endX} ${arcPath.endY}`,
      labelPosition: calculateLabelPosition(midAngle, segment.radius + 40, chartCenter, chartCenter),
      linePosition: calculateLabelPosition(midAngle, segment.radius, chartCenter, chartCenter),
      basePath: calculateBaseCirclePath(segment.radius, chartCenter), // Base circle path
      color: segment.color,
      label: segment.label,
      percentage: segment.percentage,
      votes: segment.votes
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
        {segments.map((segment, index) => {
          return <path key={`segment-${index}`} d={segment.path} stroke={segment.color} strokeWidth='8' fill='none' />
        })}

        {/* Center Dot */}
        <circle cx={chartCenter} cy={chartCenter} r='8' fill='#000' />

        {/* Labels and Connecting Lines */}
        {segments.map((segment, index) => {
          const { x: labelX, y: labelY } = segment.labelPosition
          const { x: lineX, y: lineY } = segment.linePosition
          const labelLines = splitText(segment.label, 10)

          return (
            <g key={`label-${index}`}>
              {/* Connecting Line */}
              <line x1={lineX} y1={lineY} x2={labelX} y2={labelY} stroke='#000' strokeWidth='1' />

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
