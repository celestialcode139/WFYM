import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import {
  CallCreatorContextProvider,
  CallReceiverContextProvider,
} from "../context/SignalsContextProvider";
import { ToastContainer } from "react-toastify";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <CallCreatorContextProvider>
      <CallReceiverContextProvider>
        <Outlet />
        <ToastContainer />
      </CallReceiverContextProvider>
    </CallCreatorContextProvider>
  ) : (
    <Navigate to={"/"} />
  );
};

export default PrivateRoute;
