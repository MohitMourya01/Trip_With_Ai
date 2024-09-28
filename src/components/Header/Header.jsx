import React, { useEffect, useState } from 'react'
import { logo } from '../../assets'
import { googleLogout } from '@react-oauth/google'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose
  
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
// import { useNavigation } from 'react-router-dom';

function Header() {
   
  const [openDialog, setOpenDialog] = useState(false);
  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfiles(codeResp) ,
    onError:(error)=>console.log(error)
  })
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
   window.location.reload()
   //OnGenerateTrip()
 })
 }
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
     console.log(user)
  },[])
 
  return (
    <div className='p-3 shadow-sm flex justify-between items-center sticky top-0 scroll-smooth'>
       <div className='flex justify-center items-center '>
       <img src={logo} alt="logo" className=' w-14  h-14' /><h1 className='font-bold font-serif'>TRIP_WITH_AI</h1></div>
       {user?<div className='flex gap-3'><a href="/my-trips"><a href="/create-trip"><button className='font-bold border p-2 rounded-3xl'>+ Create Trip </button> </a><button className='font-bold border p-2 rounded-3xl'>My Trips </button> </a>
       
       <Popover>
       <PopoverTrigger> <img src={user?.picture} alt="" className='h-[35px] w-[35px] rounded-full mt-1' /></PopoverTrigger>
       <PopoverContent><h2 className=' cursor-pointer' onClick={() => { 
        localStorage.clear();
        window.location.reload();
        window.location.href = '/';
        googleLogout();
        }}> {'[->'} Logout </h2></PopoverContent>
       </Popover>
       </div>
 : <button onClick={() => setOpenDialog(true)} className=' p-2 rounded-md bg-black text-white font-bold'>Sign In</button>}
 <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  {/* <DialogTrigger>Open</DialogTrigger> */}
  <DialogContent>
    <DialogHeader>
      {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
      <DialogClose asChild>
        {/* <button aria-label="Close" className="absolute top-3 right-3 text-black font-bold">
          
        </button> */}
      </DialogClose>
      <DialogDescription>
        <img src={logo} alt="" height='40px' width='40px' />
        <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
        <p>Sign in to the App with Google Authentication securely</p>

        <button  onClick={login} className='p-2 rounded-md bg-black text-white font-bold mt-7 px-3 w-full '>

        <FcGoogle className='inline h-7 w-7 mr-1' />Sign In With Google </button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default Header