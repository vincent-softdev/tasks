import { useState } from 'react'

import type { IStatsViewCardProps, IStatsViewProps, TabKeys } from '@/types/engagementTypes'
import TabSelector from '@/components/wizer-components/tapSelector'
import StatsViewCard from '@/components/wizer-components/statsViewCard'

type StatsViewProps = Record<TabKeys, IStatsViewProps> & {
  onTabChange: (tab: TabKeys) => void
}

const StatsView = (props: StatsViewProps) => {
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

  const handleTabChange = (tab: TabKeys) => {
    setSelectedTab(tab)
    props.onTabChange(tab) // Notify the parent component of the tab change
  }

  return (
    <>
      <TabSelector options={['All', 'Year', 'Quarter', 'Month']} onSelect={tab => handleTabChange(tab as TabKeys)} />
      <div className='flex justify-around mt-6'>
        {statsData.map((e, idx) => {
          return <StatsViewCard key={idx} {...e} />
        })}
      </div>
    </>
  )
}

export default StatsView
