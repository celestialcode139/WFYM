import { useEffect,useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import BorderedBG from "../../assets/images/borderedBG.png";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";
import AdminSigninForm from "./AdminSigninForm";
import GeneralHelper from "../../Helpers/GeneralHelper";
import TeamAppHeader from "../../components/header/TeamAppHeader";


// import $ from "jquery";

const columns = ["Name", "Image", "Email", "Gender", "Action"];

const options = {
  filterType: "checkbox",
};

const useStyles = makeStyles(() => {
  return {
    appheader: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      backgroundImage: `url(${AdminSignature})`,
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
    },
    logo: {
      width: "130px",
    },
    header: {
      //   paddingTop: "15px",
    },
    headerContainer: {
      backgroundColor: "#f9f9f9ed",
      padding: "10px 20px",
      backdropFilter: "blur(5px)",
      borderRadius: "10px",
    },
    profileImage: {
      height: "50px",
      width: "50px",
      borderRadius: "50%",
      border: "2px solid #01A0E6",
    },
    profileName: {
      fontSize: "16px!important",
      fontWeight: "bold!important",
    },
    profileLocation: {
      fontSize: "10px!important",
      lineHeight: "10px!important",
    },
    ProfileDropdown: {
      marginLeft: "5px",
      width: "20px",
    },
    BorderedBG: {
      backgroundImage: `url(${BorderedBG})`,
      borderRadius: "15px",
      backgroundSize: "100% 100%",
    },
    toggleBtn: {
      border: "1px solid #E8E6EA",
      display: "flex",
      padding: "8px",
      backgroundColor: "white",
      borderRadius: "10px",
      justifyContent: "space-between",
      cursor: "pointer",
    },
    activeToggleBtn: {
      backgroundColor: "#000000!important",
      boxShadow: "6px 7px 11px #00000057",
      border: "unset!important",
    },
    circleBadge: {
      height: "20px",
      width: "20px",
      display: "flex",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "12px",
      border: "1px solid #E8E6EA",
    },
    stickyContainer: {
      position: "sticky",
      top: "0px",
      zIndex: "999999",
      background: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "6px 7px 17px #00000017",
      padding: "10px",
    },
    prt200: {
      position: "relative",
      top: "150px",
    },
    avatarImage: {
      height: "50px",
      width: "50px",
      objectFit: "cover",
      borderRadius: "50%",
    },
  };
});
function Dashboard() {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;
  const [Loading, setLoading] = useState(false);
  const [LogedIn, setLogedIn] = useState(false);

  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1 && result.data != undefined) {
      setLogedIn(true)
      setLoading(false)
      // navigate("/admin/dashboard")
    }else{
      navigate("/admin")
      setLoading(false)
    }
  };

  useEffect(() => {
    console.log("PathName ",pathname);
    if (pathname == "/admin" || pathname == "/admin/dashboard" || pathname == "/admin/all-users" || pathname == "/admin/match-requests" || pathname == "/admin/match-requests" || pathname == "/admin/subscriptions") {
      featchToken()
    }
  }, [pathname])
  

  return (
    Loading == false&&
    LogedIn == true?
    <Box className={`${classes.appheader}`}>
      <Container maxWidth="xl">
        <TeamAppHeader sx={{ position: "relative", top: "15px" }} />
        <Grid container sx={{ marginTop: "20px" }} spacing={2}>
          <Grid
            item
            xs={12}
            md={3}
            lg={2.5}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box
              className={`blurBg h100 ${classes.BorderedBG}`}
              sx={{ minHeight: "400px" }}
            >
              <Sidebar route={pathname} />
            </Box>
          </Grid>
          <Grid item xs={12} md={9} lg={9.5}>
            <Box
              className={`blurBg h100 ${classes.BorderedBG}`}
              sx={{ minHeight: "400px" }}
            >
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    :
    <AdminSigninForm/>
  );
}

export default Dashboard;
