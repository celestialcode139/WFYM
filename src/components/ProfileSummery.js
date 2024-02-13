import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import DoubleTic from "../assets/icons/doubleTic.svg";
import { useEffect } from "react";
import Image from "../components/Image";
const useStyles = makeStyles(() => {
    return {
        quickProfileContainer: {
            padding: "15px",
        },
        name: {
            color: "black",
        },
        pt20: {
            marginTop: "20px",
        },
        badge: {
            padding: "3px 6px",
            display: "inline-flex",
            border: "1px solid #075bce",
            borderRadius: "6px",
            fontSize: "12px",
            color: "#075bce",
            marginRight: "6px",
            marginBottom: "6px",
        },
        galleryImage: {
            width: "100%",
            borderRadius: "10px",
        },
    };
});
function ProfileSummery(props) {
    const classes = useStyles();
    useEffect(() => {
        console.log(props?.data?.result_user_id?.media_id?.gallery);
    }, [props.data]);
    const calculateAge = (birthDate) => {
        const birthDateObject = new Date(birthDate);
        const currentDate = new Date();
        const timeDifference = currentDate - birthDateObject;
        const age = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));
        return age;
    };
    useEffect(() => {
        console.log("SUMMERY : ", props.data);
    }, [props.data]);
    return (_jsxs(Box, { className: `${classes.quickProfileContainer}`, children: [_jsxs(Box, { children: [_jsxs(Typography, { className: `f-22-bold mb-10 ${classes.name}`, children: [`${props.data?.result_user_id?.first_name} ${props.data?.result_user_id?.last_name}`, ", ", calculateAge(props.data?.result_user_id?.dob)] }), _jsx(Typography, { className: `p-12`, children: props.data?.result_user_id?.user_details?.profession })] }), _jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, sx: { color: "#000000" }, children: "Location" }), _jsx(Typography, { className: `p-12`, children: `${props.data?.result_user_id?.user_details?.location} ${props.data?.result_user_id?.user_details?.city}  ${props.data?.result_user_id?.user_details?.country}` })] }), _jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, sx: { color: "#000000" }, children: "About" }), _jsx(Typography, { className: `p-12`, children: props.data?.result_user_id?.user_details?.description })] }), _jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, sx: { marginBottom: "10px", color: "#000000" }, children: "Interests" }), _jsx(Box, { children: props.data?.result_user_id?.user_details?.hobbies?.map((hoby, i) => {
                            return hoby ? (_jsxs(Box, { className: `${classes.badge} v-center`, children: [_jsx(Box, { component: "img", src: DoubleTic }), " ", hoby] }, i)) : null;
                        }) })] }), _jsxs(Box, { className: `${classes.pt20}`, children: [_jsx(Typography, { className: `f-15-bold mb-10`, sx: { color: "#000000" }, children: "Gallery" }), _jsx(Grid, { container: true, spacing: 1, children: props?.data?.result_user_id?.media_id?.gallery?.map((image, i) => (_jsx(Grid, { item: true, xs: 6, children: _jsx(Image, { className: `${classes.galleryImage}`, src: image }) }, i))) })] })] }));
}
export default ProfileSummery;
