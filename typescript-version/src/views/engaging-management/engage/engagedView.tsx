'use client'
import React, { useState } from 'react'

import TabSelector from '@/components/wizer-components/tapSelector'
import StackedBarChart from '@/components/wizer-components/stackedBarChart'
import ParticipationRate from '@/components/wizer-components/participationRate'

type TabKeys =
  | 'Decision Profiles'
  | 'Participation Metrics'
  | 'Responsiveness'
  | 'Inclusivity'
  | 'Top Engagement Questions'

type EngagedViewProps = {
  participationRateData: {
    label: string
    value: number
    color: string
  }[]
  stackedBarData: {
    group: string
    values: number[]
    total: number
  }[]
}

const EngagedView = (props: EngagedViewProps) => {
  const [selectedTab, setSelectedTab] = useState<TabKeys>('Decision Profiles')

  return (
    <>
      <TabSelector
        options={[
          'Decision Profiles',
          'Participation Metrics',
          'Responsiveness',
          'Inclusivity',
          'Top Engagement Questions'
        ]}
        onSelect={tab => setSelectedTab(tab as TabKeys)} // Cast the tab to TabKeys
      />
      {selectedTab == 'Participation Metrics' && (
        <div>
          <div className='flex'>
            <div className='w-[50%] border-[#d7d2e7] border-r-black border-[1px] flex flex-col justify-between'>
              <StackedBarChart data={props.stackedBarData} />
              <div className='bg-[#d7d2e7] px-6 h-[70px] flex items-center'>
                <p className='text-black '>
                  <strong>INSIGHTS</strong> Of the (
                  {props.stackedBarData.reduce((sum, e) => sum + e.values.reduce((sum, _) => sum + _), 0)}) questions
                  asked...(ML generated copy here)
                </p>
              </div>
            </div>
            <div className='w-[50%] border-[#d7d2e7] border-[1px]  flex flex-col justify-between'>
              <ParticipationRate data={props.participationRateData} />
              <div className='bg-[#d7d2e7] px-6 h-[70px] flex items-center'>
                <p className='text-black '>
                  <strong>INSIGHTS</strong> The percentage of people that participated was 64% (
                  {props.participationRateData.reduce((sum, e) => sum + e.value, 0)} people). Of those{' '}
                  {props.participationRateData.reduce((sum, e) => sum + e.value, 0)} people... (ML generated copy here)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedTab != 'Participation Metrics' && (
        <div className='h-[100px] w-full text-center pt-10 border-[1px] border-[#d7d2e7]'>
          We are working on it! Please select <strong>Participation Metrics</strong> instead
        </div>
      )}
    </>
  )
}

export default EngagedView
