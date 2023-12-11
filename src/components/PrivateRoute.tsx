import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import GeneralHelper from "../Helpers/GeneralHelper";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
const PrivateRoute = () => {
  const [Token, setToken] = useState("");

  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1) {
      setToken(result.data);
    }
  };
  useEffect(() => {
    if (Token != "") {
    } else {
      featchToken();
    }
    console.log(Token);
  }, [Token]);
  return Token != undefined ? (
    <div>
      <Outlet />
    </div>
  ) : null;
};

export default PrivateRoute;
