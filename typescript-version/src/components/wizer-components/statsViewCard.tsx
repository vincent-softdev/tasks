import type { IStatsViewCardProps } from '@/types/engagementTypes'

const StatsViewCard = (props: IStatsViewCardProps) => {
  return (
    <div className='text-center'>
      <p className='font-extrabold mb-3'>{props.title}</p>
      <h2 className='text-4xl font-extrabold'>{props.data}</h2>
      <div className='w-[200px] mt-2'>
        <p className='text-gray-600'>{props.explaination}</p>
        {props.hints && <p>Hints</p>}
      </div>
    </div>
  )
}

export default StatsViewCard
