import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import dislike from "../assets/images/dislike.svg";
import like from "../assets/images/like.svg";
import Fav from "../assets/icons/fav.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MediaHelper from "../Helpers/MediaHelper";
const useStyles = makeStyles(() => {
    return {
        MatchContainer: {
            backgroundSize: "cover",
            minHeight: "200px",
            borderRadius: "15px",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
        },
        likeDislikeImg: {
            width: "23px",
        },
        likeDislikeComtainer: {
            position: "absolute",
            bottom: "0px",
            backgroundColor: "#00000021",
            backdropFilter: "blur(5px)",
        },
        borderLeft: {
            borderLeft: "0.5px solid #ffffff75",
        },
        borderRight: {
            borderRight: "0.5px solid #ffffff75",
        },
        name: {
            color: "white",
            position: "absolute",
            bottom: "45px",
            left: "10px",
            fontFamily: "Mori-bold!important",
            fontSize: "16px",
            mixBlendMode: "difference"
        },
    };
});
function MatchCards(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [Favourite, setFavourite] = useState(props.is_fav);
    const [Discard, setDiscard] = useState(props.is_discard);
    const [profileImage, setProfileImage] = useState("");
    const getImageURL = async (img) => {
        let imgurl = await MediaHelper.GetImage(img);
        setProfileImage(imgurl);
    };
    useEffect(() => {
        setFavourite(props.is_fav);
        getImageURL(props.img);
    }, [props.is_fav]);
    return (_jsxs(Box, { onClick: () => navigate(`/dash/view-matchprofile/${props._id}`), className: `${classes.MatchContainer}`, sx: { backgroundImage: `url(${profileImage})`, backgroundSize: "cover", backgroundPosition: "center" }, children: [_jsxs(Typography, { className: `${classes.name}`, children: [props.name, ", ", props.age] }), _jsxs(Grid, { container: true, className: `${classes.likeDislikeComtainer}`, children: [_jsx(Grid, { item: true, xs: 6, sx: { padding: "9px" }, className: `h-center v-center ${classes.borderRight}`, onClick: () => {
                            setDiscard(!Discard);
                            props.FavDecline({
                                _id: props.request_id,
                                is_fav: Favourite,
                                is_discard: !Discard,
                            });
                        }, children: _jsx(Box, { component: "img", className: `${classes.likeDislikeImg}`, src: dislike }) }), _jsx(Grid, { item: true, xs: 6, sx: { padding: "9px" }, className: `h-center v-center ${classes.borderLeft}`, onClick: () => {
                            setFavourite(!Favourite);
                            props.FavDecline({
                                _id: props.request_id,
                                is_fav: !Favourite,
                                is_discard: Discard,
                            });
                        }, children: _jsx(Box, { component: "img", className: `${classes.likeDislikeImg}`, src: Favourite ? Fav : like }) })] })] }));
}
export default MatchCards;
