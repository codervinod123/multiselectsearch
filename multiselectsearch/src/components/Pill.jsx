import React from 'react'

const Pill = ({name,image,onClick}) => {
  return (
    <div className='flex flex-row bg-gray-700 w-fit px-2 rounded-full gap-x-2 text-white'>
         <img className='h-[20px] w-[20px]' src={image} alt=""/>
         <p>{name}</p>
         <span onClick={onClick} className='cursor-pointer'>X</span>  
    </div>
  )
}

export default Pill
