import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <h1>Kitaab.com</h1>
      <button onClick={()=>setToken(' ')} className='bg-gray-600 text-white px-4 py-1 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
