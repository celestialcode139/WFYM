import React ,{ ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface PrivateRouteProps {
    children: ReactNode
}
export default function PrivateRoute({ children }:PrivateRouteProps) {
  const [IsAuthenticated] = React.useState(true);
  return IsAuthenticated === true ? <>{children}</> : <Navigate to={"/"} />;

  //   return <Box>PrivateRoute</Box>;
}
