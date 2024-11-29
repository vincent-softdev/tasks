'use client'
import React, { useState } from 'react'

import TabSelector from '@/components/wizer-components/tapSelector'

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
      {selectedTab == 'Participation Metrics' && <div>Hello</div>}
      {selectedTab != 'Participation Metrics' && (
        <div>We are working on it! Please select Participation Metrics instead</div>
      )}
    </>
  )
}

export default EngagedView
