import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full min-h-screen md:min-h-0 flex items-center justify-start flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-10 pb-16'>
      <div className='w-full text-center mt-16'>
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className='w-full m-auto text-[13px] md:text-[20px] px-4 text-blue-100'>
          Customer-Friendly Policies – Committed to Your Satisfaction & Safety.
        </p>
      </div>

      <div className='w-full flex items-center justify-center flex-wrap gap-10 px-6'>
        <div className='w-[400px] max-w-[90%] flex items-center justify-center flex-col gap-3 text-center'>
          <RiExchangeFundsLine className='w-8 h-8 md:w-14 md:h-14 text-[#90b9ff]' />
          <p className='font-semibold text-lg md:text-2xl text-[#a5e8f7]'>Easy Exchange Policy</p>
          <p className='font-semibold text-xs md:text-lg text-blue-50'>
            Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        <div className='w-[400px] max-w-[90%] flex items-center justify-center flex-col gap-3 text-center'>
          <TbRosetteDiscountCheckFilled className='w-8 h-8 md:w-14 md:h-14 text-[#90b9ff]' />
          <p className='font-semibold text-lg md:text-2xl text-[#a5e8f7]'>7 Days Return Policy</p>
          <p className='font-semibold text-xs md:text-lg text-blue-50'>
            Shop with Confidence – 7 Days Easy Return Guarantee.
          </p>
        </div>

        <div className='w-[400px] max-w-[90%] flex items-center justify-center flex-col gap-3 text-center'>
          <BiSupport className='w-8 h-8 md:w-14 md:h-14 text-[#90b9ff]' />
          <p className='font-semibold text-lg md:text-2xl text-[#a5e8f7]'>Best Customer Support</p>
          <p className='font-semibold text-xs md:text-lg text-blue-50'>
            Trusted Customer Support – Your Satisfaction Is Our Priority.
          </p>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy