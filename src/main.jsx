import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'

import CreateTrip from './create-trip/CreateTrip.jsx'
import Header from './components/Header/Header.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]/ViewTrip.jsx'
import MyTrips from './components/my-trips/MyTrips.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  },
  {
    path:'/view-trip/:tripId',
    element:<ViewTrip />
  },
  {
    path: '/my-trips',
    element: <MyTrips />
  }

])
// or 
// const router1 = createBrowserRouter(
//   createRoutesFromElements(
//   <Route path = '/' element={<App />} />
//   )
// )

createRoot(document.getElementById('root')).render(

  
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID} >
    <Header/>
    
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  
  ,
)
