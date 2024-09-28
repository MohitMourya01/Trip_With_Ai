import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '@/service/FirebaseConfig';
import { getDoc,doc } from 'firebase/firestore';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection.jsx';
import Hotels from '../components/Hotels.jsx';
import PlacesToVisit from '../components/PlacesToVisit.jsx';
import Footer from '../components/Footer.jsx'
function ViewTrip() {

    const {tripId} = useParams();
    const [trip, setTrip] = useState([])
    useEffect(() => {
      tripId&&GetTripData();
    },[tripId])
  //  used to get trip information from firebase

    const GetTripData=async () => {
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef)
      
        if(docSnap.exists()){
           console.log("Document:", docSnap.data())
           setTrip(docSnap.data())
        }
        else{
          console.log("No Such Document");
          toast('No trip Found!');
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-14 xl:px-56'>
      {/* {information section} */}
      <InfoSection trip={trip} />
      {/* recommended hotel */}
       <Hotels trip={trip} />
      {/* daily plan */}
       <PlacesToVisit trip={trip} />
      {/* footer */}
      <Footer />
    </div>
  )
}

export default ViewTrip