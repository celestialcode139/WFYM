import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import profileScreen2 from "./screens/Profile/ProfileScreen2.tsx";
import profileScreen3 from "./screens/Profile/ProfileScreen3.tsx";
import profileScreen4 from "./screens/Profile/ProfileScreen4.tsx";
import profileScreen5 from "./screens/Profile/ProfileScreen5.tsx";
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
ReactDOM.createRoot(document.getElementById("root")).render(
// <React.StrictMode>
_jsx(AlertProvider, { template: AlertTemplate, ...options, children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", Component: LandingPage }), _jsx(Route, { path: "/signup", Component: Signup }), _jsx(Route, { path: "/signup-form", Component: SignupForm }), _jsx(Route, { path: "/otp", Component: OTP }), _jsx(Route, { path: "/signup-profile", Component: SignupProfile }), _jsx(Route, { path: "/gender", Component: Gender }), _jsx(Route, { path: "/signin", Component: SigninForm }), _jsx(Route, { path: "/forgetpass", Component: ForgetPassForm }), _jsx(Route, { path: "/otpresetpassword", Component: OTPResetPass }), _jsx(Route, { path: "/interests", Component: Interests }), _jsx(Route, { path: "/SetNewPassword", Component: SetNewPass }), _jsxs(Route, { path: "/", Component: PrivateRoute, children: [_jsx(Route, { path: "/dashboard", Component: Dashboard }), _jsx(Route, { path: "buy-matches", Component: BuyMatches }), _jsx(Route, { path: "paypal", Component: Paypal }), _jsx(Route, { path: "chat/:myId/:matchId", Component: Chat }), _jsx(Route, { path: "video-call/:myId/:matchId", Component: VideoCall })] }), _jsxs(Route, { path: "/ideal-personality", children: [_jsx(Route, { path: "general-info", Component: ProfileGeneralinfo }), _jsx(Route, { path: "looking-for", Component: GenderSelectionIdealPerson }), _jsx(Route, { path: "looks", Component: MaleLooks }), _jsx(Route, { path: "race", Component: Race })] }), _jsx(Route, { path: "/dash", Component: DashLayout, children: _jsx(Route, { path: "view-matchprofile/:id", Component: ViewProfile }) }), _jsxs(Route, { path: "/profile", Component: PLayout, children: [_jsx(Route, { path: "page-1", Component: profileScreen1 }), _jsx(Route, { path: "page-2", Component: profileScreen2 }), _jsx(Route, { path: "page-3", Component: profileScreen3 }), _jsx(Route, { path: "page-4", Component: profileScreen4 }), _jsx(Route, { path: "page-5", Component: profileScreen5 }), _jsx(Route, { path: "change-password", Component: ChangePassword }), _jsx(Route, { path: "media", Component: Media })] }), _jsxs(Route, { path: "/admin", Component: AdminLayout, children: [_jsx(Route, { path: "dashboard", Component: Admin_Dashboard }), _jsx(Route, { path: "all-users", Component: AllUsers }), _jsx(Route, { path: "match-requests", Component: MatchRequests }), _jsx(Route, { path: "team", Component: TeamMembers }), _jsx(Route, { path: "subscriptions", Component: Matches })] })] }) }) })
// </React.StrictMode>
);
