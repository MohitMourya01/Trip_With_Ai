import { collection,query, where, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom'
import { db } from '@/service/FirebaseConfig'
import UserTripCardItem from './userTripCardItem'


function MyTrips() {
    const navigation = useNavigation()
    const [userTrip, setUserTrips] = useState([])
    useEffect(()=>{
        GetUserTrips()
    },[])
    const GetUserTrips=async ()=>{
        
        const user=JSON.parse(localStorage.getItem('user'))
        
        if(!user){
            navigation('/')
            return;
        }
        setUserTrips([])
        const q=query(collection(db,'AITrips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) =>{
            // console.log(doc.id, doc.data())
            setUserTrips(prev=>[...prev,doc.data()])
        });
       
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 lg:m-20 px-5 m-10'>
       <h2 className='font-bold text-3xl'>My Trips</h2>
       <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
        {userTrip?.length>0?userTrip.map((trip,index)=>(
            <UserTripCardItem trip={trip} key={index} />
        )) : [1,2,3,4,5,6].map((item, index) => ( <div key={index} className='h-[200px] w-full bg-slate-300 animate-pulse rounded-xl mt-4'></div> ))}
       </div>
    </div>
  )
}

export default MyTrips