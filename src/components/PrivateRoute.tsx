import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default PrivateRoute;
