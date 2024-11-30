import Tippy from '@tippyjs/react'

import type { IStatsViewCardProps } from '@/types/engagementTypes'
import 'tippy.js/dist/tippy.css' // Optional for default styles

const StatsViewCard = (props: IStatsViewCardProps) => {
  return (
    <div className='text-center'>
      <p className='font-extrabold mb-3'>{props.title}</p>
      <h2 className='text-4xl font-extrabold'>{props.data}</h2>
      <div className='w-[200px] mt-2'>
        {props.explaination}{' '}
        {props.hints && (
          <Tippy content={props.hints} placement='top' arrow={true}>
            <div className='cursor-pointer font-bold bg-[#d9d9d9] pt-[2px] w-8 h-8 rounded-full text-[20px] inline-block'>
              i
            </div>
          </Tippy>
        )}
      </div>
    </div>
  )
}

export default StatsViewCard
