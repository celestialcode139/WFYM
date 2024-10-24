import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./App.tsx";
import Signup from "./screens/Signup.tsx";
import SignupForm from "./screens/SignupForm.tsx";
import SigninForm from "./screens/SigninForm.tsx";
import ForgetPassForm from "./screens/ForgetPassForm.tsx";
import OTP from "./screens/OTP.tsx";
import OTPResetPass from "./screens/OTPResetPass.tsx";
import SetNewPass from "./screens/SetNewPass.tsx";
import SignupProfile from "./screens/signupProfile.tsx";
import Gender from "./screens/gender.tsx";
import Interests from "./screens/interests.tsx";
import Dashboard from "./screens/Dashboard.tsx";
import ViewProfile from "./screens/viewProfile.tsx";
import PLayout from "./screens/Profile/Layout.tsx";
import DashLayout from "./screens/Profile/DashLayout.tsx";
import Race from "./screens/IdealPersonality/race.tsx";
import MaleLooks from "./screens/IdealPersonality/maleLooks.tsx";
import GenderSelectionIdealPerson from "./screens/IdealPersonality/GenderSelectionIdealPerson.tsx";

import profileScreen1 from "./screens/Profile/profilep1.tsx";
import profileScreen2 from "./screens/Profile/profileScreen2.tsx";
import profileScreen3 from "./screens/Profile/profileScreen3.tsx";
import profileScreen4 from "./screens/Profile/profileScreen4.tsx";
import profileScreen5 from "./screens/Profile/profileScreen5.tsx";
import ProfileGeneralinfo from "./screens/Profile/generalinfo.tsx";
import ChangePassword from "./screens/changePassword.tsx";
import Media from "./screens/media.tsx";

import Admin_Dashboard from "./screens/Admin/dashboard.tsx";
import MatchRequests from "./screens/Admin/matchRequests.tsx";
import AdminLayout from "./screens/Admin/layout.tsx";
import BuyMatches from "./screens/BuyMatches.tsx";
import Paypal from "./screens/paypal.tsx";
import Chat from "./screens/chat.tsx";
import VideoCall from "./screens/videoCall.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import "./index.css";
import AllUsers from "./screens/Admin/AllUsers.tsx";
import TeamMembers from "./screens/Admin/TeamMembers.tsx";
import Matches from "./screens/Admin/Matches.tsx";

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/signup" Component={Signup} />
          <Route path="/signup-form" Component={SignupForm} />
          <Route path="/otp" Component={OTP} />
          <Route path="/signup-profile" Component={SignupProfile} />
          <Route path="/gender" Component={Gender} />
          <Route path="/signin" Component={SigninForm} />
          <Route path="/forgetpass" Component={ForgetPassForm} />
          <Route path="/otpresetpassword" Component={OTPResetPass} />
          <Route path="/interests" Component={Interests} />
          <Route path="/SetNewPassword" Component={SetNewPass} />
          <Route path="/" Component={PrivateRoute}>
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="buy-matches" Component={BuyMatches} />
            <Route path="paypal" Component={Paypal} />
            <Route path="chat/:myId/:matchId" Component={Chat} />
            <Route path="video-call/:myId/:matchId" Component={VideoCall} />
          </Route>
  
          <Route path="/ideal-personality">
            <Route path="general-info" Component={ProfileGeneralinfo} />
            <Route path="looking-for" Component={GenderSelectionIdealPerson} />
            <Route path="looks" Component={MaleLooks} />
            <Route path="race" Component={Race} />
          </Route>
      
          <Route path="/dash" Component={DashLayout}>
            <Route path="view-matchprofile/:id" Component={ViewProfile} />
          </Route>
       
          <Route path="/profile" Component={PLayout}>
            <Route path="page-1" Component={profileScreen1} />
            <Route path="page-2" Component={profileScreen2} />
            <Route path="page-3" Component={profileScreen3} />
            <Route path="page-4" Component={profileScreen4} />
            <Route path="page-5" Component={profileScreen5} />
            <Route path="change-password" Component={ChangePassword} />
            <Route path="media" Component={Media} />
          </Route>
       
          <Route path="/admin" Component={AdminLayout}>
            <Route path="dashboard" Component={Admin_Dashboard} />
            <Route path="all-users" Component={AllUsers} />
            <Route path="match-requests" Component={MatchRequests} />
            <Route path="team" Component={TeamMembers} />
            <Route path="subscriptions" Component={Matches} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  // </React.StrictMode>
);
