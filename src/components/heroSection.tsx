import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Container, Grid, Typography } from "@mui/material";
import HeroSectionSignature from "../assets/images/heroSectionSignature.svg";
import { useTheme } from "@mui/material/styles";
import { gsap } from "gsap-trial";
import { DrawSVGPlugin } from "gsap-trial/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);


const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    heroSection: {
      minHeight: "80vh",
      backgroundImage:`url('${HeroSectionSignature}')`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      [theme.breakpoints.down('sm')]: {
        backgroundPosition: "top",
      }
    },
    h1: {
      backgroundImage:
        "linear-gradient(270deg, #01DBCD -16.3%, #0065FF 148.77%)",
      WebkitBackgroundClip: "text",
      color: "transparent",
      fontSize: "100px!important",
      textAlign: "end",
      marginRight: "80px!important",
      [theme.breakpoints.down('md')]: {
        fontSize: "60px!important",
        marginRight:"30px!important"
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: "35px!important",
        marginRight:"0px!important"
      }
    },
    h2: {
      color: "black",
      fontSize: "100px!important",
      textAlign: "start",
      lineHeight: "70px!important",
      marginLeft: "80px!important",
      [theme.breakpoints.down('md')]: {
        fontSize: "60px!important",
        marginLeft:"30px!important",
        lineHeight:"20px!important"
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: "35px!important",
        marginLeft:"0px!important",
        lineHeight:"20px!important"
      }
    },
    p1:{
        marginRight: "80px!important",
        marginTop:"80px!important",
        marginBottom:"30px!important",
        [theme.breakpoints.down('md')]: {
            marginRight:"0px!important",
            marginTop:"60px!important",
        }
    }
  };
});


const HeroSection = () => {
  const classes = useStyles();
  React.useEffect(() => {
    console.log(process.env.REACT_APP_API_KEY);
    
  }, [])
  

  return (
    <Box className={`${classes.heroSection}`}>

      <Container maxWidth="lg">
        <Typography className={`${classes.h1}`}>Start your heart's </Typography>
        <Typography className={`${classes.h2}`}>adventure today</Typography>
        <Grid container>
          <Grid item sm={6.5} xs={12}>
          </Grid>
          <Grid item sm={5.5} xs={12}>
            <Typography className={`${classes.p1}`}>
              At We Find Your Match, we're passionate about connecting hearts.
              Our mission is simple: create genuine connections in a welcoming,
              safe space. We believe love is about shared experiences, not just
              profiles. Join us to explore the possibilities of love and
              friendship.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
