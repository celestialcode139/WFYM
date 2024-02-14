import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import GeneralHelper from "../Helpers/GeneralHelper";
import { Navigate } from "react-router-dom";
const PrivateRoute = () => {
    const [Token, setToken] = useState("");
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
        if (result.status == 1 && result.data) {
            setToken(result.data);
        }
        else {
            setToken("null");
        }
    };
    useEffect(() => {
        if (Token != "") {
            null;
        }
        else {
            featchToken();
        }
        console.log(Token);
    }, [Token]);
    return Token != undefined && Token != "null" ? (_jsx("div", { children: _jsx(Outlet, {}) })) : (_jsx(Navigate, { to: "/" }));
};
export default PrivateRoute;
