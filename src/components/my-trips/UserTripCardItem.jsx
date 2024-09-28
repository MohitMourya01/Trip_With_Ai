import React,{useEffect, useState} from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import { Link } from 'react-router-dom'
function userTripCardItem({trip}) {
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
    <Link to={'/view-trip/'+trip?.id}>
    <div className='mt-4 hover:scale-105 transition-all hover:shadow-md p-2 rounded-md '>
    
     <img src={photoUrl} alt="" className=' object-cover rounded-xl h-[250px] w-[350px]' />
     <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
     <h2 className='text-sm text-gray-500 '>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget </h2>
    </div>
    </Link>
  )
}

export default userTripCardItem