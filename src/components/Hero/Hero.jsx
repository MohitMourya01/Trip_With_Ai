import React from 'react'
import { Link } from 'react-router-dom'
import {ai_trip_planner_reddish_wallpaper, front, other} from './index.jsx'
function Hero() {
  return (
    <div className='sm:m-32 sm:mt-10 flex flex-col items-center justify-center lg:mx-52 gap-9 h-full mb-72 scroll-smooth '>
     <h1 className='font-extrabold 
   text-black text-[53px] '><span className=' text-[#e55326]'>Discover Your Next Adventure with AI:</span> Personalized Itineraris at Your Fingertips</h1>
     <p className='sm:text-[18px] font-sans lg:text-[22px] m-2 text-black'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
     <img src={front} alt="a" className='rounded-xl sm:h-[300px] lg:h-[529px] w-[980px]'/>
     <img src={other} alt="a" className='rounded-xl sm:h-[300px] lg:h-[529px] w-[980px]'/>
     <img src={ai_trip_planner_reddish_wallpaper} alt="a" className='rounded-xl sm:h-[300px] lg:h-[529px] w-[980px]'/>
    
     <Link to={'/create-trip'}>
     <button className='p-3 bg-black text-white font-bold rounded-md'>Get Started, It's Free</button>
     </Link>
     </div>
  )
}

export default Hero