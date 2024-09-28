import React, { useEffect } from 'react'
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { AI_PROMPT, SelectBudgetOptions,SelectTravelesList } from '../constants/Options.jsx';

import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { chatSession } from '../service/AiModel.jsx';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose
  // DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog"
import { logo } from '@/assets/index.jsx';
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/service/FirebaseConfig.jsx';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place,setPlace] = useState();
  const [formData, setFormData] = useState([])
  const [openDialog, setOpenDialog] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()
  const notify = () => {
    toast("Please fill all the Details")
  }

  const handleInputChange = (name, value) =>{
    if((name=='noOfDays' && value>5)){
        
        alert('Please enter Trip Days less than 6')
        
    }
     setFormData({
      ...formData,
      [name]: value
     })
  }

  useEffect(() => {
     console.log(formData)
  },[formData])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfiles(codeResp) ,
    onError:(error)=>console.log(error)
  })

  const OnGenerateTrip=async ()=>{
    
    const user = localStorage.getItem('user');
    if(!user){
      
      setOpenDialog(true);
      return;
    }

    if((formData?.noOfDays<=5) && (!formData?.location || !formData?.budget || !formData?.traveler) ){
      notify()
      return ;
    }
    setLoading(true)
    const FINAL_PROMPT=AI_PROMPT.replace('{location}',formData?.location?.label)
    .replace('{totalDays}',formData?.noOfDays)
    .replace('{traveler}',formData?.traveler)
    .replace('{budget}',formData?.budget)
    .replace('{totalDays}',formData?.noOfDays)
    //console.log(FINAL_PROMPT)

    const result=await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result);
    console.log(result?.response?.text())
    setLoading(false)
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip=async (TripData)=>{
       // Add a new document in collection
       setLoading(true)
       const user=JSON.parse(localStorage.getItem('user'));
       const docId=Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
       userSelection:formData,
       tripData:JSON.parse(TripData),
       userEmail:user?.email,
       id:docId
    });
    setLoading(false)
    navigate('/view-trip/'+docId)
  }

  const GetUserProfiles=(tokenInfo)=>{
     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
     headers:{
      Authorization: `Bearer ${tokenInfo?.access_token}`,
      Accept:`Application/json`
     }
  }).then((resp) => {
    localStorage.setItem('user',JSON.stringify(resp.data))
    console.log("yha se aa rha",resp)
    setOpenDialog((prev) => !prev)
    OnGenerateTrip()
  })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 lg:m-20 px-5 m-10'>
      <h2 className='font-bold text-3xl '>Tell us your travel preferences</h2>
     
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete  apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY} 
            selectProps={{
              place,
              onChange:(v) => {setPlace(v); handleInputChange('location',v)}
            }}
          />
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
        <input type="number" placeholder='Ex.3 ' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' onChange={(e) => handleInputChange('noOfDays',e.target.value)} />
      </div>

      <div className='mt-14'>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item,index) => {
             return <div key={index} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget==item.title&&'shadow-lg border-black '}`} onClick={() => (handleInputChange('budget',item.title))}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
          })}
        </div>
      </div>

      <div className='mt-14'>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item,index) => {
             return <div key={index} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler==item.people&& 'shadow-lg border-black'}`} onClick={() => handleInputChange('traveler',item.people)}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                <h2 className='text-sm text-gray-500'>{item.people}</h2>
              </div>
          })}
        </div>
      </div>

      <div className='flex justify-end'><button disabled={loading} className=' p-2 rounded-md bg-black text-white font-bold mt-10 px-3 ' onClick={OnGenerateTrip}>
      {loading?<AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />:'Generate Trip'}
      </button>
      <ToastContainer />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  {/* <DialogTrigger>Open</DialogTrigger> */}
  <DialogContent>
    <DialogHeader>
      {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
      <DialogClose asChild>
       
      </DialogClose>
      <DialogDescription>
        <img src={logo} alt="" height='40px' width='40px' /> 
        <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
        <p className=' text-gray-500'>Sign in to the App with Google Authentication securely</p>

        <button  onClick={login} className='p-2 rounded-md bg-black text-white font-bold mt-7 px-3 w-full '>

        <FcGoogle className='inline h-7 w-7 mr-1' />Sign In With Google </button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

      
    </div>
  )
}

export default CreateTrip