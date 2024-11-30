// MUI Imports
import Grid from '@mui/material/Grid'

import StatsView from '@/views/engaging-management/stats/statsView'
import type { IStatsViewProps, TabKeys } from '@/types/engagementTypes'
import EngagedView from '@/views/engaging-management/engage/engagedView'
import PerformanceView from '@/views/engaging-management/performance/performanceView'

const WizerTaskPage = () => {
  // Mock data for each tab
  const data: Record<TabKeys, IStatsViewProps> = {
    All: { questionsAsked: 200, participationRate: '50%', recommendations: 120 },
    Year: { questionsAsked: 180, participationRate: '55%', recommendations: 100 },
    Quarter: { questionsAsked: 60, participationRate: '60%', recommendations: 50 },
    Month: { questionsAsked: 48, participationRate: '64%', recommendations: 24 }
  }

  const participationRateData = [
    { label: 'Internal Employees', value: 50, color: '#3f5185' },
    { label: 'Indigenous Communities', value: 19, color: '#4dc9f0' },
    { label: 'External Regional Stakeholders', value: 31, color: '#7b69af' }
  ]

  const stackedBarData = [
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

  const radialPerformanceChartData = [
    { label: 'Admin', percentage: 33, votes: '1/3', color: '#4dc9f0', radius: 70 },
    { label: 'Accounting', percentage: 50, votes: '1/2', color: '#68af92', radius: 55 },
    { label: 'Design', percentage: 100, votes: '1/1', color: '#a07ffc', radius: 40 },
    { label: 'Customer Service', percentage: 60, votes: '3/5', color: '#ffd420', radius: 85 },
    { label: 'Sales', percentage: 87.5, votes: '7/8', color: '#fc8dca', radius: 100 }
  ]

  const stakeholdersData = [
    {
      name: 'Talia Franco',
      title: 'Designer, Marketing Team',
      participation: 75,
      image:
        'https://imgs.search.brave.com/49ogd4rOP14ONhT6mrJ7zWxdIklksiQ-C_veJs54ha4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTM4/NzA5MzYyL3Bob3Rv/L3BvcnRyYWl0LW9m/LWEtZ2lybC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VVFH/WHBlaUxySTc4bk8x/QjlwZVVuMEQwZkNT/UnJtLUo4eG9oTVdH/Mkxtcz0' // Replace with actual profile image URLs
    },
    { name: 'Employee Card', participation: null, image: null },
    { name: 'Employee Card', participation: null, image: null },
    { name: 'Employee Card', participation: null, image: null },
    { name: 'Employee Card', participation: null, image: null }
  ]

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
        <EngagedView participationRateData={participationRateData} stackedBarData={stackedBarData} />
      </Grid>
      <Grid item xs={12}>
        <PerformanceView radialPerformanceChartData={radialPerformanceChartData} stakeholdersData={stakeholdersData} />
      </Grid>
    </Grid>
  )
}

export default WizerTaskPage
