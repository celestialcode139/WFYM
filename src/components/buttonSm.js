import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BouncingBallsLoading from "./BouncingBallsLoading";
const useStyles = makeStyles(() => {
    return {
        button: {
            backgroundColor: "#065BCE",
            borderRadius: "50.766px",
            padding: "12px 15px",
            color: "#ffffff",
            textAlign: "center",
            fontFamily: "Mori-bold!important",
            fontSize: "14px",
            cursor: "pointer",
        },
    };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Button(props) {
    const classes = useStyles();
    return (_jsx(Box, { onClick: () => props?.onClick(), sx: props?.sx, className: `${classes.button} ${props?.className}`, children: props.Loading == true ? (_jsx(BouncingBallsLoading, {})) : (
        // <CircularProgress size={24} style={{padding:0}} color="inherit" />
        props.children) }));
}
export default Button;
