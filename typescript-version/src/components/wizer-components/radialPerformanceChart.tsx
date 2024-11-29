import React from 'react'

const RadialPerformanceChart: React.FC = () => {
  // Mock data for radial chart
  const data = [
    { label: 'Admin', percentage: 33, votes: '1/3', color: '#4dc9f0', radius: 70 },
    { label: 'Accounting', percentage: 50, votes: '1/2', color: '#68af92', radius: 55 },
    { label: 'Design', percentage: 100, votes: '1/1', color: '#a07ffc', radius: 40 },
    { label: 'Customer Service', percentage: 60, votes: '3/5', color: '#ffd420', radius: 85 },
    { label: 'Sales', percentage: 87.5, votes: '7/8', color: '#fc8dca', radius: 100 }
  ]

  const chartCenter = 150 // Center of the chart
  const chartSize = 350 // Total chart width/height

  // Calculate the arc path for each segment
  const calculateArcPath = (radius: number, percentage: number) => {
    if (percentage === 100) {
      // Handle full circle separately
      return `
        M ${chartCenter} ${chartCenter - radius}
        A ${radius} ${radius} 0 1 1 ${chartCenter} ${chartCenter + radius}
        A ${radius} ${radius} 0 1 1 ${chartCenter} ${chartCenter - radius}
      `
    }

    const startAngle = Math.random() * 2 * Math.PI // Start from top
    const endAngle = startAngle + (percentage / 100) * 2 * Math.PI // Calculate end angle
    const largeArcFlag = percentage > 50 ? 1 : 0

    const startX = chartCenter + radius * Math.cos(startAngle)
    const startY = chartCenter + radius * Math.sin(startAngle)
    const endX = chartCenter + radius * Math.cos(endAngle)
    const endY = chartCenter + radius * Math.sin(endAngle)

    return `
      M ${startX} ${startY}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
    `
  }

  // Calculate the full circle base path
  const calculateBaseCirclePath = (radius: number) => {
    return `
      M ${chartCenter} ${chartCenter - radius}
      A ${radius} ${radius} 0 1 1 ${chartCenter} ${chartCenter + radius}
      A ${radius} ${radius} 0 1 1 ${chartCenter} ${chartCenter - radius}
    `
  }

  return (
    <div className='flex items-start gap-8 justify-between p-4'>
      {/* Left: Radial Chart */}
      <div className='relative'>
        <h2 className='text-lg font-bold mb-4'>Average Performance by Team</h2>
        <svg width={chartSize} height={chartSize}>
          {/* Draw base circles */}
          {data.map((segment, index) => (
            <path
              key={`base-${index}`}
              d={calculateBaseCirclePath(segment.radius)}
              stroke='#e0e0e0' // Light gray for the base circle
              strokeWidth='1'
              fill='none'
            />
          ))}
          {/* Draw each segment */}
          {data.map((segment, index) => (
            <path
              key={index}
              d={calculateArcPath(segment.radius, segment.percentage)}
              stroke={segment.color}
              strokeWidth='8'
              fill='none'
            />
          ))}

          {/* Center Dot */}
          <circle cx={chartCenter} cy={chartCenter} r='8' fill='#000' />

          {/* Labels */}
          {data.map((segment, index) => {
            const labelAngle = -Math.PI / 2 + (segment.percentage / 100) * Math.PI // Middle of arc

            const labelX = chartCenter + (segment.radius + 15) * Math.cos(labelAngle)
            const labelY = chartCenter + (segment.radius + 15) * Math.sin(labelAngle)

            return (
              <g key={index}>
                <line
                  x1={chartCenter + segment.radius * Math.cos(labelAngle)}
                  y1={chartCenter + segment.radius * Math.sin(labelAngle)}
                  x2={labelX}
                  y2={labelY}
                  stroke='#000'
                  strokeWidth='1'
                />
                <text
                  x={labelX}
                  y={labelY}
                  fontSize='12'
                  textAnchor={labelX > chartCenter ? 'start' : 'end'}
                  alignmentBaseline='middle'
                  className='font-bold'
                >
                  {segment.label} ({segment.percentage}%)
                </text>
                <text
                  x={labelX}
                  y={labelY + 12}
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

      {/* Right: Top Performers List */}
      <div className='flex flex-col'>
        <div className='mb-6'>
          <h3 className='text-md font-bold'>Correct Decisions Top Performers</h3>
          <ol className='list-decimal list-inside text-sm'>
            <li>xxx</li>
            <li>xxx</li>
            <li>xxx</li>
          </ol>
        </div>
        <div className='mb-6'>
          <h3 className='text-md font-bold'>Voter Participation Top Performers</h3>
          <ol className='list-decimal list-inside text-sm'>
            <li>xxx</li>
            <li>xxx</li>
            <li>xxx</li>
          </ol>
        </div>
        <div>
          <h3 className='text-md font-bold'>Low Participation Alert</h3>
          <ol className='list-decimal list-inside text-sm'>
            <li>xxx</li>
            <li>xxx</li>
            <li>xxx</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default RadialPerformanceChart
