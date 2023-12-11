import { Box, Typography, Container, Link, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import dislike from "../assets/images/dislike.svg";
import like from "../assets/images/like.svg";
import Fav from "../assets/icons/fav.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => {
  const theme = useTheme();

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
    },
  };
});
function MatchCards(props: any) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [Favourite, setFavourite] = useState(props.is_fav);
  const [Discard, setDiscard] = useState(props.is_discard);
  useEffect(() => {
    setFavourite(props.is_fav);
  }, [props.is_fav]);

  return (
    <Box
      onClick={() => navigate(`/dash/view-matchprofile/${props._id}`)}
      className={`${classes.MatchContainer}`}
      sx={{ backgroundImage: `url(${props.img})` }}
    >
      <Typography className={`${classes.name}`}>
        {props.name}, {props.age}
      </Typography>
      <Grid container className={`${classes.likeDislikeComtainer}`}>
        <Grid
          item
          xs={6}
          sx={{ padding: "9px" }}
          className={`h-center v-center ${classes.borderRight}`}
          onClick={() => {
            setDiscard(!Discard);
            props.FavDecline({
              _id:props.request_id,
              is_fav:Favourite,
              is_discard:!Discard,
            })
          }}
        >
          <Box
            component="img"
            className={`${classes.likeDislikeImg}`}
            src={dislike}
          ></Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ padding: "9px" }}
          className={`h-center v-center ${classes.borderLeft}`}
          onClick={() => {
            setFavourite(!Favourite);
            props.FavDecline({
              _id:props.request_id,
              is_fav:!Favourite,
              is_discard:Discard,
            })
          }}
        >
          <Box
            component="img"
            className={`${classes.likeDislikeImg}`}
            src={Favourite ? Fav : like}
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MatchCards;
