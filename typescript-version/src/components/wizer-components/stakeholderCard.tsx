import React from 'react'

const StakeholderCards: React.FC = () => {
  // Mock data for stakeholders
  const stakeholders = [
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
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-6'>Stakeholder Cards</h2>
      <div className='grid grid-cols-5 gap-4'>
        {stakeholders.map((stakeholder, index) => (
          <div key={index} className='bg-[#d7d2e7] p-4 flex flex-col items-center justify-center'>
            {stakeholder.image ? (
              <>
                {/* Profile Section */}
                <div className='flex gap-1 mb-8 w-full'>
                  <div
                    style={{
                      backgroundImage: `url(${stakeholder.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                    className='w-10 h-10 rounded-full border-[2px] border-black'
                  />
                  <div className='flex flex-col justify-center'>
                    <p className='font-bold'>{stakeholder.name}</p>
                    <p className='text-[8px] text-gray-600'>{stakeholder.title}</p>
                  </div>
                </div>

                {/* Circular Progress Section */}
                <div className='relative flex justify-center items-center w-20 h-20 mb-2'>
                  <svg className='w-full h-full' viewBox='0 0 36 36'>
                    <circle cx='18' cy='18' r='16' fill='none' stroke='#bcbcbb' strokeWidth='3' />
                    <circle
                      cx='18'
                      cy='18'
                      r='16'
                      fill='white'
                      stroke='#68af92'
                      strokeWidth='3'
                      strokeDasharray={`${stakeholder.participation}, 100`}
                      strokeDashoffset='0'
                      transform='rotate(-90 18 18)'
                    />
                  </svg>
                  <div className='absolute flex items-center justify-center text-center text-lg font-bold text-gray-800'>
                    {stakeholder.participation}%
                  </div>
                </div>

                {/* Participation Label */}
                <p className='text-sm text-gray-600'>Participation</p>
              </>
            ) : (
              <p className='text-lg font-bold'>Employee Cards</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StakeholderCards
