import React, { useEffect, useState } from 'react'
import Backgound from '../component/Backgound'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'


function Home() {
  let heroData=[
    {text1:"30% OFF Limited Offer",text2:"Style that"},
    {text1:"Discover the Best of Bold Fashion",text2:"Limited Time Only!"},
    {text1:"Explore Our Best Collection ",text2:"Shop Now!"},
    {text1:"Choose your Perfect Fasion Fit",text2:"Now on Sale!"}
  ]

  let [heroCount,setHeroCount] = useState(0)

  useEffect(()=>{
    let interval = setInterval(()=>{
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
    },3000);
    return () => clearInterval(interval)
  },[])
  
  return (
    <div className='overflow-x-hidden relative top-[70px]'>
      <div className='w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-br from-[#0a0a0a] via-[#1a0a0f] to-[#3d1a24]'
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1c0a14 25%, #3d1224 50%, #b76e79 75%, #e8a598 100%)'
        }}
      >

        <Backgound heroCount={heroCount}/>
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />

      </div>
      <Product/>
      <OurPolicy/>
      <NewLetterBox/>
      <Footer/>
    </div>
  )
}

export default Home