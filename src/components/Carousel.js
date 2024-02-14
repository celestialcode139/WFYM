import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { makeStyles } from "@mui/styles";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Image from "./Image";
const useStyles = makeStyles(() => {
    return {
        slider: {
            position: "sticky",
            top: "0px",
        },
        swipeContainer: {
            // padding: "0px 15px",
            height: "100%",
            display: "flex",
            alignItems: "end",
            position: "relative"
        },
        swipeImage: {
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover"
        },
        swipeContent: {
            zIndex: 999999,
            padding: "5px 15px"
        },
        name: {
            color: "white",
            mixBlendMode: "difference"
        },
        desg: {
            color: "white!important",
            mixBlendMode: "difference"
        },
    };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Carousel(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleIndexChanged = (index) => {
        setCurrentIndex(index.activeIndex);
    };
    useEffect(() => {
        props.currentIndex(currentIndex);
    }, [currentIndex, props]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const calculateAge = (birthDate) => {
        const birthDateObject = new Date(birthDate);
        const currentDate = new Date();
        const timeDifference = currentDate - birthDateObject;
        const age = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));
        return age;
    };
    useEffect(() => {
        console.log("props.data:", props?.data[currentIndex]?.result_user_id?.user_details.images);
    }, [props.data]);
    return (_jsx(Box, { className: `${classes.slider}`, sx: { paddingTop: "50px" }, children: _jsx(Swiper, { onSnapIndexChange: handleIndexChanged, effect: "cards", grabCursor: true, modules: [EffectCards], className: "mySwiper", children: props.data.map((val, i) => (_jsx(SwiperSlide, { children: _jsx(Box, { onClick: () => {
                        navigate(`/dash/view-matchprofile/${val?.result_user_id?._id}`);
                    }, className: "hw100 ofitt-cover bg-cover", children: _jsxs(Box, { className: `${classes.swipeContainer}`, children: [_jsxs(Box, { className: `${classes.swipeContent}`, children: [_jsxs(Typography, { className: `f-22-bold mb-10 ${classes.name}`, children: [`${val.result_user_id?.first_name} ${val.result_user_id?.last_name}`, ", ", calculateAge(val.result_user_id?.dob)] }), _jsx(Typography, { className: `p-12 ${classes.desg}`, children: val.result_user_id?.user_details?.profession })] }), _jsx(Image, { className: `${classes.swipeImage}`, src: val?.result_user_id?.user_details.images })] }) }) }, i))) }) }));
}
