import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles } from "@mui/styles";
import { Box, Container, Grid, Typography } from "@mui/material";
import HeroSectionSignature from "../assets/images/heroSectionSignature.svg";
import { useTheme } from "@mui/material/styles";
import ChocolateIcon from "../assets/gifs/chocolate-bar.gif";
import GreatPyrenees from "../assets/gifs/great-pyrenees.gif";
import LoveYou from "../assets/gifs/i-love-you.gif";
const useStyles = makeStyles(() => {
    const theme = useTheme();
    return {
        heroSection: {
            minHeight: "80vh",
            backgroundImage: `url('${HeroSectionSignature}')`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            [theme.breakpoints.down("sm")]: {
                backgroundPosition: "top",
            },
        },
        h1: {
            backgroundImage: "linear-gradient(270deg, #01DBCD -16.3%, #0065FF 148.77%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: "100px!important",
            textAlign: "end",
            marginRight: "80px!important",
            [theme.breakpoints.down("md")]: {
                fontSize: "60px!important",
                marginRight: "30px!important",
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: "35px!important",
                marginRight: "0px!important",
            },
        },
        h2: {
            color: "black",
            fontSize: "100px!important",
            textAlign: "start",
            lineHeight: "70px!important",
            marginLeft: "80px!important",
            [theme.breakpoints.down("md")]: {
                fontSize: "60px!important",
                marginLeft: "30px!important",
                lineHeight: "20px!important",
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: "35px!important",
                marginLeft: "0px!important",
                lineHeight: "20px!important",
            },
        },
        p1: {
            marginRight: "80px!important",
            // marginTop: "80px!important",
            marginBottom: "30px!important",
            color: "#000000",
            [theme.breakpoints.down("md")]: {
                marginRight: "0px!important",
                marginTop: "60px!important",
            },
        },
    };
});
const HeroSection = () => {
    const classes = useStyles();
    return (_jsx(Box, { className: `${classes.heroSection}`, children: _jsxs(Container, { maxWidth: "lg", children: [_jsx(Typography, { className: `${classes.h1}`, children: "Start your heart's" }), _jsxs(Typography, { className: `${classes.h2}`, children: ["adventure today ", _jsx("img", { className: "mgif", src: ChocolateIcon })] }), _jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, sm: 6.5, xs: 12, children: _jsx("img", { className: "mgif", src: GreatPyrenees }) }), _jsxs(Grid, { item: true, sm: 5.5, xs: 12, children: [_jsx("img", { className: "mgif", src: LoveYou }), _jsx(Typography, { className: `${classes.p1}`, children: "At We Find Your Match, we're passionate about connecting hearts. Our mission is simple: create genuine connections in a welcoming, safe space. We believe love is about shared experiences, not just profiles. Join us to explore the possibilities of love and friendship." })] })] })] }) }));
};
export default HeroSection;
