'use client'
import React, { useState } from 'react'

import type { IStatsViewCardProps, IStatsViewProps } from '@/types/engagementTypes'
import TabSelector from '@/components/wizer-components/tapSelector'
import StatsViewCard from '@/components/wizer-components/statsViewCard'

type TabKeys = 'All' | 'Year' | 'Quarter' | 'Month'

const StatsView = (props: Record<TabKeys, IStatsViewProps>) => {
  const [selectedTab, setSelectedTab] = useState<TabKeys>('Month')

  // Stats data
  const statsData: IStatsViewCardProps[] = [
    {
      title: 'QUESTIONS',
      data: `${props[selectedTab].questionsAsked}`,
      explaination: 'questions asked'
    },
    {
      title: 'PARTICIPATION RATE',
      data: `${props[selectedTab].participationRate}`,
      explaination: '% of People Engaged',
      hints: `This is the percentage of people who engaged this ${selectedTab}`
    },
    {
      title: 'RECOMMENDATIONS',
      data: `${props[selectedTab].recommendations}`,
      explaination: 'number of recommendations',
      hints: `This is total recommendations this ${selectedTab}`
    }
  ]

  return (
    <>
      <TabSelector
        options={['All', 'Year', 'Quarter', 'Month']}
        onSelect={tab => setSelectedTab(tab as TabKeys)} // Cast the tab to TabKeys
      />
      <div className='flex justify-around mt-6'>
        {statsData.map((e, idx) => {
          return <StatsViewCard key={idx} {...e} />
        })}
      </div>
    </>
  )
}

export default StatsView
