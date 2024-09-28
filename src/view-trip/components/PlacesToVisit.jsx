import React from 'react'
import PlaceCardItem from './PlaceCardItem'
function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Places To Visit</h2>
        <div>
            {trip.tripData?.itinerary.map((item,index) => (
                <div>
                 <h2 className='font-bold text-lg underline mb-4'>Day {item.day}:-</h2>
                 <div className='grid grid-cols-2 gap-5 mb-3'>
                 {item.plan.map((place, index) => (
                    <div >
                        <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                        <PlaceCardItem place={place} />
                        
                        
                    </div>
                 ))}
                 </div>
                 </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit