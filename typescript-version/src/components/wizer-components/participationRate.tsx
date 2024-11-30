import React from 'react'

import { calculateTotalValue, calculateArcPath, calculateLabelPosition, splitText } from '@/utils/chartUtils'

type ParticipationRateProps = {
  data: {
    label: string
    value: number
    color: string
  }[]
}

const ParticipationRate: React.FC<ParticipationRateProps> = ({ data }) => {
  // Total value for the chart
  const total = calculateTotalValue(data)

  // Dimensions
  const centerX = 200
  const centerY = 200
  const radius = 130
  const innerRadius = 80 // Creates the "doughnut" effect

  // Create segments
  let cumulativeAngle = -Math.PI / 2 // Start from the top (12 o'clock position)

  const segments = data.map(segment => {
    const startAngle = cumulativeAngle
    const angle = (segment.value / total) * 2 * Math.PI
    const endAngle = startAngle + angle
    const midAngle = startAngle + angle / 2 // Midpoint of the arc for labels and lines

    cumulativeAngle = endAngle

    const arcPath = calculateArcPath(startAngle, endAngle, radius, centerX, centerY)

    return {
      path:
        `M ${arcPath.startX} ${arcPath.startY} A ${radius} ${radius} 0 ${
          arcPath.largeArcFlag
        } 1 ${arcPath.endX} ${arcPath.endY}` +
        ` L ${centerX + innerRadius * Math.cos(endAngle)} ${
          centerY + innerRadius * Math.sin(endAngle)
        } A ${innerRadius} ${innerRadius} 0 ${
          endAngle - startAngle > Math.PI ? 1 : 0
        } 0 ${centerX + innerRadius * Math.cos(startAngle)} ${centerY + innerRadius * Math.sin(startAngle)} Z`,
      labelPosition: calculateLabelPosition(midAngle, radius + 30, centerX, centerY),
      linePosition: calculateLabelPosition(midAngle, radius, centerX, centerY),
      color: segment.color,
      label: segment.label,
      value: segment.value
    }
  })

  return (
    <div className='p-6'>
      <h2 className='text-lg font-bold mb-4'>Participation Rate</h2>
      <div className='flex justify-center'>
        <svg width='500' height='500' viewBox='-50 0 500 500'>
          {/* Doughnut Segments */}
          {segments.map((segment, index) => (
            <path key={index} d={segment.path} fill={segment.color} strokeWidth='2' />
          ))}

          {/* Labels */}
          {segments.map((segment, index) => {
            const { x } = segment.labelPosition
            const { x: lineX, y: lineY } = segment.linePosition
            const labelLines = splitText(segment.label, 10) // Split text into lines with max 10 characters

            return (
              <g key={index}>
                {/* Connecting Line */}
                <line
                  x1={lineX < centerX ? lineX + 20 : lineX - 20}
                  y1={lineY}
                  x2={x > centerX ? x + 20 : x - 20}
                  y2={lineY}
                  stroke='#000'
                  strokeWidth='1'
                />
                {/* Label Text */}
                <text
                  x={lineX < centerX ? lineX + 20 : lineX - 20}
                  y={lineY}
                  fontSize='12'
                  textAnchor={x > centerX ? 'start' : 'end'}
                  alignmentBaseline='middle'
                >
                  <tspan x={x > centerX ? x + 25 : x - 25} className='font-bold' dy='0'>
                    {segment.value}%
                  </tspan>
                  {labelLines.map((line, i) => (
                    <tspan key={i} x={x > centerX ? x + 25 : x - 25} dy='1.4em'>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            )
          })}

          {/* Center Label */}
          <text x={centerX} y={centerY - 10} fontSize='24' fontWeight='bold' textAnchor='middle'>
            {total}
          </text>
          <text x={centerX} y={centerY + 15} fontSize='12' textAnchor='middle' fill='#555'>
            Total People
          </text>
          <text x={centerX} y={centerY + 30} fontSize='12' textAnchor='middle' fill='#555'>
            Engaged
          </text>
        </svg>
      </div>
    </div>
  )
}

export default ParticipationRate
