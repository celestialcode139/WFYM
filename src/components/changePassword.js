import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
// import $ from "jquery";
const useStyles = makeStyles(() => {
    return {
        appheader: {
            backgroundColor: "#ffffff",
            minHeight: "100vh",
            backgroundImage: `url(${AdminSignature})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
        },
        TextFieldParent: {
            marginBottom: "20px",
        },
    };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChangePassword(props) {
    const classes = useStyles();
    const [body, setbody] = useState({
        // current_password: "",
        password: "",
        repassword: "",
    });
    useEffect(() => {
        props.OnChange(body);
    }, [body, props]);
    return (_jsxs(Box, { children: [_jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, sx: {
                        "& div": {
                            borderRadius: "15px!important",
                        },
                    }, label: "Password", value: body.password, onChange: (e) => {
                        setbody({ ...body, password: e.target.value });
                    } }) }), _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, sx: {
                        "& div": {
                            borderRadius: "15px!important",
                        },
                    }, label: "Confirm Password", value: body.repassword, onChange: (e) => {
                        setbody({ ...body, repassword: e.target.value });
                    } }) })] }));
}
export default ChangePassword;
