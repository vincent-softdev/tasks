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

const EngagedView = () => {
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
        <div className='flex'>
          <div className='w-[50%] pl-0 pr-8 border-[#d7d2e7] border-[1px]'>
            <StackedBarChart />
          </div>
          <div className='w-[50%] pl-0 pr-8 border-[#d7d2e7] border-[1px]'>
            <ParticipationRate />
          </div>
        </div>
      )}
      {selectedTab != 'Participation Metrics' && (
        <div>We are working on it! Please select Participation Metrics instead</div>
      )}
    </>
  )
}

export default EngagedView
