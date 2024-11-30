import React from 'react'

import RadialPerformanceChart from '@/components/wizer-components/radialPerformanceChart'
import StakeholderCards from '@/components/wizer-components/stakeholderCard'

type PerformanceViewProps = {
  radialPerformanceChartData: {
    label: string
    percentage: number
    votes: string
    color: string
    radius: number
  }[]

  stakeholdersData: (
    | {
        name: string
        title: string
        participation: number
        image: string
      }
    | {
        name: string
        participation: null
        image: null
        title?: undefined
      }
  )[]
}

const PerformanceView = (props: PerformanceViewProps) => {
  const performanceList = () => {
    return (
      <div className='flex flex-col flex-1'>
        <div className='mb-6'>
          <h3 className='text-md font-normal'>
            <strong>Correct Decisions</strong> Top Performers
          </h3>
          <ol className='list-decimal list-inside text-sm'>
            <li>xxx</li>
            <li>xxx</li>
            <li>xxx</li>
          </ol>
        </div>
        <div className='mb-6'>
          <h3 className='text-md font-normal'>
            <strong>Voter Participation</strong> Top Performers
          </h3>
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
    )
  }

  return (
    <div className='items-start gap-8 p-4 border-[1px]'>
      <h2 className='text-lg mb-4'>Average Performance by Team</h2>
      <div className='mt-[14px] flex'>
        {/* Left: Radial Chart */}
        <RadialPerformanceChart data={props.radialPerformanceChartData} />
        {/* Right: Top Performers List */}
        {performanceList()}
      </div>
      <StakeholderCards data={props.stakeholdersData} />
    </div>
  )
}

export default PerformanceView
