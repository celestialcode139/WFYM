import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Dashboard from "../../assets/icons/dashboard.png";
import Users from "../../assets/icons/users.png";
import Match from "../../assets/icons/match.png";
import Logout from "../../assets/icons/logout.png";
import Subscription from "../../assets/icons/subscription.png";
import { useNavigate, useLocation } from "react-router-dom";
import GeneralHelper from "../../Helpers/GeneralHelper";



const useStyles = makeStyles(() => {
  return {
    icon: {
      width: "20px",
      marginRight: "10px",
      backgroundColor: "white",
      padding: "6px",
      borderRadius: "6px",
    },
    Text: {
      color:"black"
    }
  };
});
export default function Sidebar(props: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const [active, setactive] = useState(props.route);

  const handleSelectingPage = (e: number) => {
    setactive(e)
    if (e == 0) {
      navigate("/admin/dashboard")
    } else if (e == 1) {
      navigate("/admin/all-users")
    } else if (e == 2) {
      navigate("/admin/match-requests")
    } else if (e == 3) {
      navigate("/admin/team")
    }else if (e == 5) {
      navigate("/admin/subscriptions")
    }

  }

  useEffect(() => {
    const { pathname} = location;
    if (String(pathname).includes("admin/dashboard")) {
      handleSelectingPage(0)
    }else if(String(pathname).includes("admin/all-users")){
      handleSelectingPage(1)
    }else if(String(pathname).includes("admin/match-requests")){
      handleSelectingPage(2)
    }else if(String(pathname).includes("admin/subscriptions")){
      handleSelectingPage(5)
    }
    
    
  }, [])

  const Signout = () =>{
    GeneralHelper.ClearData("Token")
    GeneralHelper.ClearData("UserId")
    window.location.reload();

  }
  

  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton

              onClick={() => handleSelectingPage(0)}
              // onClick={() => setactive(0)}
              selected={active === 0}
            >
              <Box
                className={`${classes.icon}`}
                component="img"
                src={Dashboard}
              ></Box>
              <ListItemText className={`${classes.Text}`} primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleSelectingPage(1)}
              // onClick={() => setactive(1)}
              selected={active === 1}
            >
              <ListItemIcon>
                <Box
                  className={`${classes.icon}`}
                  component="img"
                  src={Users}
                ></Box>
              </ListItemIcon>
              <ListItemText className={`${classes.Text}`} primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleSelectingPage(2)}
              // onClick={() => setactive(2)}
              selected={active === 2}
            >
              <ListItemIcon>
                <Box
                  className={`${classes.icon}`}
                  component="img"
                  src={Match}
                ></Box>
              </ListItemIcon>
              <ListItemText className={`${classes.Text}`} primary="Match Requests" />
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleSelectingPage(3)}
              selected={active === 3}
            >
              <ListItemIcon>
                <Box
                  className={`${classes.icon}`}
                  component="img"
                  src={Team}
                ></Box>
              </ListItemIcon>
              <ListItemText className={`${classes.Text}`} primary="Team" />
            </ListItemButton>
          </ListItem> */}
          {/* <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleSelectingPage(4)}
              selected={active === 4}
            >
              <ListItemIcon>
                <Box
                  className={`${classes.icon}`}
                  component="img"
                  src={Role}
                ></Box>
              </ListItemIcon>
              <ListItemText className={`${classes.Text}`} primary="Role" />
            </ListItemButton>
          </ListItem> */}
        </List>
      </nav>
      <Divider />
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleSelectingPage(5)}
              selected={active === 5}
            >
              <ListItemIcon>
                <Box
                  className={`${classes.icon}`}
                  component="img"
                  src={Subscription}
                ></Box>
              </ListItemIcon>
              <ListItemText className={`${classes.Text}`} primary="Subscription" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => Signout()}
            >
              <ListItemIcon>
                <Box
                  className={`${classes.icon}`}
                  component="img"
                  src={Logout}
                ></Box>
              </ListItemIcon>
              <ListItemText className={`${classes.Text}`} primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
