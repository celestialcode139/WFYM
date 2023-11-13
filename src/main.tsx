import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Signup from './screens/Signup.tsx'
import SignupForm from './screens/SignupForm.tsx'
import OTP from './screens/OTP.tsx'
import SignupProfile from './screens/signupProfile.tsx'
import Gender from './screens/gender.tsx'
import Interests from './screens/interests.tsx'
import Dashboard from './screens/Dashboard.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App/> */}
    {/* <Signup /> */}
    {/* <SignupForm /> */}
    {/* <OTP /> */}
    {/* <SignupProfile /> */}
    {/* <Gender/> */}
    {/* <Interests/> */}
    <Dashboard/>
  </React.StrictMode>,
)
