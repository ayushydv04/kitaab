import React from 'react'
import { RiExchangeFundsFill } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { BiSupport } from "react-icons/bi";
{/* <SiTicktick /> */}
{/* <BiSupport /> */}

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center p-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
        <div>
            <RiExchangeFundsFill size={"2.5em"} className='w-12 m-auto mb-5' />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer hassle free exchange policy</p>
        </div>
      
        <div>
            <SiTicktick size={"2.5em"} className='w-12 m-auto mb-5' />
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-gray-400'>We provide 7 days free return policy</p>
        </div>
      
        <div>
            <BiSupport size={"2.5em"} className='w-12 m-auto mb-5' />
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-400'>We provide 24/7 customer support</p>
        </div>

    </div>
  )
}

export default OurPolicy
