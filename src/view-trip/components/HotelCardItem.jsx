import React,{useEffect, useState} from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import { Link } from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";

function HotelCardItem({hotel}) {
 
    const [photoUrl, setPhotoUrl] = useState()

  useEffect(() => {
    hotel&&GetPlacePhoto()
  }, [hotel])
   
  const GetPlacePhoto= async()=>{
    const data={
      textQuery:hotel?.hotelName
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      // console.log(resp.data.places[0].photos[3].name)

      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
      setPhotoUrl(PhotoUrl)
    })
  }

  return (

        <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+','+hotel?.hotelAddress} target='_blank'><div className=' hover:scale-110 transition-all cursor-pointer border flex flex-col items-center p-2 rounded-lg bg-gray-50 mt-7 '>
                    <img src={photoUrl} alt="No Image Found." className='rounded-xl h-[180px] w-full object-cover'/>
                    <div className='my-3 flex flex-col gap-2'>
                        <h2 className='font-medium'>{hotel.hotelName}</h2>
                        <h2 className='text-xs text-gray-500'><CiLocationOn className=' text-black' />
                        {hotel.hotelAddress}</h2>
                        <h2 className='text-sm'>💰 {hotel.price}</h2>
                        <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
                    </div>
                    
                </div>
                </Link>
    
  )
}

export default HotelCardItem