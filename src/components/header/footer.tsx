import { makeStyles } from "@mui/styles";
import { Box, Container, Grid, Typography } from "@mui/material";
import appstore from "../../assets/logo/appstore.svg";
import playstore from "../../assets/logo/playstore.svg";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    footer: {
      backgroundColor: "#ffffff!important",
      paddingTop: "100px!important",
      paddingBottom: "80px!important",
      [theme.breakpoints.down("md")]: {
        paddingTop: "50px!important", // Adjust the styles for screens with a width of 600px or larger
        paddingBottom: "30px!important", // Adjust the styles for screens with a width of 600px or larger
      },
    },
    footerItems: {
      lineHeight: "26px",
      color: "black",
    },
    downloadText: {
      fontSize: "45px!important",
      lineHeight: "50px!important",
    },
    downloadIcons: {
      width: "46%",
      maxWidth: "160px",
      marginTop: 20,
    },
  };
});

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={`${classes.footer}`}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={6} md={3.5}>
            <Box>
              <Typography className={`${classes.footerItems}`}>Home</Typography>
            </Box>
            <Box>
              <Typography className={`${classes.footerItems}`}>
                About
              </Typography>
            </Box>
            <Box>
              <Typography className={`${classes.footerItems}`}>
                Services
              </Typography>
            </Box>
            <Box>
              <Typography className={`${classes.footerItems}`}>
                Contact
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3.5}
            sx={{ marginTop: { xs: "20px", sm: "0px" } }}
          >
            <Box>
              <Typography className={`${classes.footerItems}`}>
                Facebook
              </Typography>
            </Box>
            <Box>
              <Typography className={`${classes.footerItems}`}>
                Instagram
              </Typography>
            </Box>
            <Box>
              <Typography className={`${classes.footerItems}`}>
                Snapchat
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            sx={{ marginTop: { xs: "20px", md: "0px" } }}
          >
            <Typography
              className={`${classes.footerItems} ${classes.downloadText}`}
            >
              Download{" "}
            </Typography>
            <Typography
              className={`${classes.footerItems} ${classes.downloadText}`}
            >
              for mobile{" "}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={appstore}
                className={`${classes.downloadIcons}`}
                sx={{ mr: 1 }}
              ></Box>
              <Box
                component="img"
                src={playstore}
                className={`${classes.downloadIcons}`}
                sx={{ ml: 1 }}
              ></Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: { xs: "30px", md: 0 } }}>
          <Grid item xs={12} sm={6} md={7}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Typography className={`${classes.footerItems}`}>
                Email
              </Typography>
            </Box>
            <Box>
              <Typography className={`${classes.footerItems}`}>
                info@WeFindYourMatch.com
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            sx={{ marginTop: { xs: "0px", md: "0px" } }}
          >
            <Box>
              <Typography
                className={`${classes.footerItems}`}
                sx={{ marginTop: { xs: "10px", md: "24px" } }}
              >
                © 2023 We Find Your Match
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
