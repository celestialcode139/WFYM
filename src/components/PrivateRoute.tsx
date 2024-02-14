import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import GeneralHelper from "../Helpers/GeneralHelper";
import { Navigate } from "react-router-dom";

export interface TokenResponse {
  status: number;
  data?: string;
  message?: string;
}
const PrivateRoute = () => {
  const [Token, setToken] = useState("");
  const featchToken = async () => {
    const result: TokenResponse = await GeneralHelper.retrieveData("Token");
    if (result.status == 1 && result.data) {
      setToken(result.data);
    } else {
      setToken("null");
    }
  };
  useEffect(() => {
    if (Token != "") {
      null;
    } else {
      featchToken();
    }
    console.log(Token);
  }, [Token]);
  return Token != undefined && Token != "null" ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default PrivateRoute;
