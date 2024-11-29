// MUI Imports
import Grid from '@mui/material/Grid'

import StatsView from '@/views/engaging-management/stats/statsView'
import type { IStatsViewProps, TabKeys } from '@/types/engagementTypes'
import EngagedView from '@/views/engaging-management/engage/engagedView'

const WizerTaskPage = () => {
  // Mock data for each tab
  const data: Record<TabKeys, IStatsViewProps> = {
    All: { questionsAsked: 200, participationRate: '50%', recommendations: 120 },
    Year: { questionsAsked: 180, participationRate: '55%', recommendations: 100 },
    Quarter: { questionsAsked: 60, participationRate: '60%', recommendations: 50 },
    Month: { questionsAsked: 48, participationRate: '64%', recommendations: 24 }
  }

  return (
    <Grid container rowSpacing={3}>
      {/* Top header */}
      <Grid item xs={12} className='flex justify-between mb-10'>
        <h2 className='text-[#5f4c9f]'>Your People</h2>
        <button className='px-10 py-2 bg-[#5f4c9f] text-white text-[12px]'>BACK</button>
      </Grid>

      {/* Overview header */}
      <Grid item xs={12}>
        <h3>An Overview of Primary Metrics for Stakeholder Engagement</h3>
      </Grid>

      {/* Tab Selector and Stats View */}
      <Grid item xs={12} className='mb-12'>
        <StatsView {...data} />
      </Grid>

      {/* Tab Selector and Stats View */}
      <Grid item xs={12}>
        <EngagedView />
      </Grid>
    </Grid>
  )
}

export default WizerTaskPage
