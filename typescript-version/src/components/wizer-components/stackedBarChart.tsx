import React, { useRef, useState, useEffect } from 'react'

const StackedBarChart: React.FC = () => {
  // Mock data
  const data = [
    {
      group: 'Internal employees',
      values: [5, 3, 3, 2],
      total: 13
    },
    {
      group: 'Indigenous communities',
      values: [7, 6, 5, 2],
      total: 20
    },
    {
      group: 'External regional stakeholders',
      values: [4, 5, 4, 2],
      total: 15
    }
  ]

  // Colors for each type of question
  const colors = ['#4dc9f0', '#7b69af', '#3edaa6', '#505db0']

  // Chart dimensions
  const baseWidth = 700 // Base width for scale = 1.0
  const chartHeight = data.length * 50 + 50 // Fixed height
  const maxTotal = 22 // Max X-axis value
  const tickInterval = 5 // Interval for X-axis labels

  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1.0) // Default scale = 1.0

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const newScale = width >= 1024 ? 1.0 : width / 1024 // Scale down for smaller screens

        setScale(newScale)
      }
    }

    // Initial update
    updateScale()

    // Update on window resize
    window.addEventListener('resize', updateScale)

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', updateScale)
    }
  }, [])

  const scaledWidth = baseWidth * scale

  return (
    <div className='p-6 relative' ref={containerRef}>
      <h2 className='text-lg font-bold mb-[100px]'>Engagement at a Glance</h2>
      {/* Y-axis title */}
      <div className='flex flex-col absolute gap-4 text-end max-w-[170px]'>
        <text fontSize='14' fill='#555' textAnchor='middle' alignmentBaseline='middle'>
          GROUPS
        </text>
        {/* Y-axis labels */}
        <div className='flex flex-col gap-[14px]'>
          {data.map(d => (
            <text
              key={d.group}
              fontSize='12' // Text size is constant
              fill='#555'
              textAnchor='end'
              alignmentBaseline='middle'
            >
              {d.group}
            </text>
          ))}
        </div>
      </div>

      <svg width={scaledWidth + 100} className='mt-5 ml-[64px]' height={chartHeight + 10}>
        {/* Bars */}
        {data.map((d, i) => {
          let xOffset = 120 // Starting X position for the bar (adjusted for spacing)

          return (
            <g key={d.group}>
              {d.values.map((value, j) => {
                const barWidth = (value / maxTotal) * scaledWidth // Scale only the width

                const rect = (
                  <rect
                    key={j}
                    x={xOffset}
                    y={i * 50 + 20}
                    width={barWidth}
                    height={20} // Height is constant
                    fill={colors[j]}
                  />
                )

                xOffset += barWidth // Adjust X position for the next segment

                return rect
              })}
              {/* Total number at the end of the bar */}
              <text x={xOffset + 5} y={i * 50 + 35} fontSize='12' fill='#555' alignmentBaseline='middle'>
                {d.total}
              </text>
            </g>
          )
        })}

        {/* X-axis */}
        <line x1={120} y1={chartHeight - 20} x2={scaledWidth + 120} y2={chartHeight - 20} stroke='#000' />
        {/* X-axis ticks and labels */}
        {Array.from({ length: Math.ceil(maxTotal / tickInterval) + 1 }, (_, i) => {
          const value = i * tickInterval // Tick value (0, 5, 10, 15, 20)
          const xPosition = 120 + (value / maxTotal) * scaledWidth

          return (
            <g key={i}>
              <line x1={xPosition} y1={chartHeight - 20} x2={xPosition} y2={chartHeight - 15} stroke='#000' />
              <text
                x={xPosition}
                y={chartHeight - 5}
                fontSize='12' // Text size is constant
                fill='#555'
                textAnchor='middle'
              >
                {value}
              </text>
            </g>
          )
        })}

        {/* Y-axis */}
        <line x1={120} y1={0} x2={120} y2={chartHeight - 20} stroke='#000' />
      </svg>

      {/* Legend */}
      <div className='mt-4 flex absolute top-0 right-0 flex-col'>
        {colors.map((color, i) => (
          <div key={i} className='flex items-center ml-4 gap-2 justify-between'>
            <span className='ml-2 text-sm'>Type of Question</span>
            <div
              style={{
                backgroundColor: color,
                width: '15px', // Fixed size
                height: '15px' // Fixed size
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className='text-center'>
        <p className='font-semibold'>NUMBER OF QUESTIONS ASKED ({data.reduce((sum, d) => sum + d.total, 0)})</p>
      </div>
    </div>
  )
}

export default StackedBarChart
