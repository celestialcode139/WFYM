import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import FHourglass from "../assets/images/looks/female/hourglass.png";
import FInvertedTriangle from "../assets/images/looks/female/inverted_triangle.png";
import FRectangle from "../assets/images/looks/female/rectangle.png";
import FRound from "../assets/images/looks/female/round.png";
import FTriangle from "../assets/images/looks/female/triangle.png";
import MHourglass from "../assets/images/looks/male/hourglass.png";
import MInvertedTriangle from "../assets/images/looks/male/inverted_triangle.png";
import MRectangle from "../assets/images/looks/male/rectangle.png";
import MRound from "../assets/images/looks/male/round.png";
import MTriangle from "../assets/images/looks/male/triangle.png";
import Selected from "../assets/images/looks/selected.png";
// import $ from "jquery";
const femaleLooks = [
    { title: "Hourglass", value: "hourglass", image: FHourglass },
    {
        title: "Inverted Triangle",
        value: "inverted_triangle",
        image: FInvertedTriangle,
    },
    { title: "Rectangle", value: "rectangle", image: FRectangle },
    { title: "Round", value: "round", image: FRound },
    { title: "Triangle", value: "triangle", image: FTriangle },
];
const maleLooks = [
    { title: "Hourglass", value: "hourglass", image: MHourglass },
    {
        title: "Inverted Triangle",
        value: "inverted_triangle",
        image: MInvertedTriangle,
    },
    { title: "Rectangle", value: "rectangle", image: MRectangle },
    { title: "Round", value: "round", image: MRound },
    { title: "Pear", value: "pear", image: MTriangle },
];
const useStyles = makeStyles(() => {
    return {
        looks: {},
        active: {
            backgroundImage: `url('${Selected}')`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundColor: "white",
            borderRadius: "13px",
            boxShadow: "0px 0px 10px #0000000a",
        },
    };
});
const gender = [femaleLooks, maleLooks];
function Looks(props) {
    const classes = useStyles();
    const [active, setactive] = useState(props.look);
    return (_jsx(Box, { className: `${classes.looks}`, children: _jsx(Grid, { container: true, spacing: 0, children: gender[props.gender == "female" ? 0 : 1].map((gender, i) => (_jsxs(Grid, { item: true, lg: 2.4, children: [_jsx(Box, { sx: { width: "100%", maxHeight: "300px" }, onClick: () => {
                            setactive(gender.value);
                            props.onChange(gender.value);
                        }, className: `${active == gender.value ? classes.active : null}`, component: "img", src: gender.image }), _jsx(Typography, { sx: { textAlign: "center", marginTop: "20px", color: "#000000" }, children: gender.title })] }, i))) }) }));
}
export default Looks;
