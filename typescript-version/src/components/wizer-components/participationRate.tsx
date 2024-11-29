import React from 'react'

const ParticipationRate: React.FC = () => {
  // Mock data
  const data = [
    { label: 'Internal Employees', value: 50, color: '#3f5185' },
    { label: 'Indigenous Communities', value: 19, color: '#4dc9f0' },
    { label: 'External Regional Stakeholders', value: 31, color: '#7b69af' }
  ]

  // Total value for the chart
  const total = data.reduce((sum, segment) => sum + segment.value, 0)

  // Dimensions
  const centerX = 150
  const centerY = 150
  const radius = 100
  const innerRadius = 50 // Creates the "doughnut" effect

  // Function to calculate the SVG arc path
  const calculateArcPath = (startAngle: number, endAngle: number, radius: number) => {
    const startX = centerX + radius * Math.cos(startAngle)
    const startY = centerY + radius * Math.sin(startAngle)
    const endX = centerX + radius * Math.cos(endAngle)
    const endY = centerY + radius * Math.sin(endAngle)

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`
  }

  // Function to calculate the position for labels
  const calculateLabelPosition = (angle: number, radius: number) => {
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)

    return { x, y }
  }

  // Create segments
  let cumulativeAngle = -Math.PI / 2 // Start from the top (12 o'clock position)

  const segments = data.map(segment => {
    const startAngle = cumulativeAngle
    const angle = (segment.value / total) * 2 * Math.PI
    const endAngle = startAngle + angle

    cumulativeAngle = endAngle

    return {
      path:
        calculateArcPath(startAngle, endAngle, radius) +
        ` L ${centerX + innerRadius * Math.cos(endAngle)} ${
          centerY + innerRadius * Math.sin(endAngle)
        } A ${innerRadius} ${innerRadius} 0 ${endAngle - startAngle > Math.PI ? 1 : 0} 0 ${
          centerX + innerRadius * Math.cos(startAngle)
        } ${centerY + innerRadius * Math.sin(startAngle)} Z`,
      labelPosition: calculateLabelPosition(startAngle + angle / 2, radius + 30),
      color: segment.color,
      label: segment.label,
      value: segment.value
    }
  })

  return (
    <div className='p-6'>
      <h2 className='text-lg font-bold mb-4'>Participation Rate</h2>
      <div className='flex justify-center'>
        <svg width='300' height='300'>
          {/* Doughnut Segments */}
          {segments.map((segment, index) => (
            <path key={index} d={segment.path} fill={segment.color} stroke='#fff' strokeWidth='2' />
          ))}

          {/* Labels */}
          {segments.map((segment, index) => {
            const { x, y } = segment.labelPosition

            return (
              <g key={index}>
                <line x1={x} y1={y} x2={x > centerX ? x + 20 : x - 20} y2={y} stroke='#000' strokeWidth='1' />
                <text
                  x={x > centerX ? x + 25 : x - 25}
                  y={y}
                  fontSize='12'
                  textAnchor={x > centerX ? 'start' : 'end'}
                  alignmentBaseline='middle'
                >
                  {segment.value}% {segment.label}
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
