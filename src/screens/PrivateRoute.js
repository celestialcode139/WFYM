import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ children }) {
    const [IsAuthenticated] = React.useState(true);
    return IsAuthenticated === true ? _jsx(_Fragment, { children: children }) : _jsx(Navigate, { to: "/" });
    //   return <Box>PrivateRoute</Box>;
}
