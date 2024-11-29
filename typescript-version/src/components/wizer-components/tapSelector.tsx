import React, { useState } from 'react'

interface TabSelectorProps {
  options: string[]
  onSelect: (option: string) => void
}

const TabSelector: React.FC<TabSelectorProps> = ({ options, onSelect }) => {
  const [selectedTab, setSelectedTab] = useState<string>(options[0])

  const handleTabClick = (option: string) => {
    setSelectedTab(option)
    onSelect(option)
  }

  return (
    <div className='flex bg-[#e9e9e9]'>
      {options.map(option => (
        <div
          key={option}
          onClick={() => handleTabClick(option)}
          style={{ boxShadow: selectedTab === option ? '0px 7px 3px -3px #c3c3c3' : '' }}
          className={`min-w-[150px] text-center px-5 border-r-[3px] border-[#f4f5fa] font-extrabold py-2 cursor-pointer transition-all duration-300 ${
            selectedTab === option
              ? 'bg-[#d7d2e7] text-black font-bold shadow-b-md'
              : 'bg-[#e9e9e9] text-gray-500 hover:bg-gray-200'
          }`}
        >
          {option}
        </div>
      ))}
    </div>
  )
}

export default TabSelector
