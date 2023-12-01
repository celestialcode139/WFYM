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
import Race from "./screens/IdealPersonality/race.tsx";

import ProfileLayout from "./screens/Profile/Layout.tsx";
import Admin_Dashboard from "./screens/Admin/dashboard.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
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
        <Route path="/SetNewPassword" Component={SetNewPass} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/interests" Component={Interests} />
        <Route path="/ideal-personality/race" Component={Race} />
      </Routes>
      <Routes>
        <Route path="/profile/layout" Component={ProfileLayout} />
      </Routes>
      <Routes>
        <Route path="admin-dashboard" Component={Admin_Dashboard} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
