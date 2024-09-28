import React, { useEffect, useState } from 'react'
import { FiSend } from "react-icons/fi";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi.jsx';
import { Link } from 'react-router-dom';

function InfoSection({trip}) {
  
  const [photoUrl, setPhotoUrl] = useState()

  useEffect(() => {
    trip&&GetPlacePhoto()
  }, [trip])
   
  const GetPlacePhoto= async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      // console.log(resp.data.places[0].photos[3].name)

      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
      setPhotoUrl(PhotoUrl)
    })
  }

  return (
    <div>
        <img src={photoUrl} alt="No Image Found." className='h-[350px] w-full object-cover rounded-md' />
        <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
         <h2 className='font-bold text-2xl'>
           {trip?.userSelection?.location.label}
        </h2>
        <div className='flex gap-2'> <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-xs md:text-md '>🗓️ {trip.userSelection?.noOfDays} Day</h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-xs md:text-md'>💸 {trip.userSelection?.budget} Budget </h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-xs md:text-md'>🥂 No. Of Traveler {trip.userSelection?.traveler} </h2></div>
        </div>
        <Link to={'https://www.google.com/maps/search/?api=1&query='+trip?.userSelection?.location.label} target='_blank'>
        <button   className='p-2 rounded-md bg-black text-white font-bold mt-7 px-3 '> <FiSend /></button>
        </Link>
        </div>
    </div>
  )
}

export default InfoSection