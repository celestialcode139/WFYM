import { useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Dashboard from "../../assets/icons/dashboard.png";
import Users from "../../assets/icons/users.png";
import Match from "../../assets/icons/match.png";
import Team from "../../assets/icons/team.png";
import Role from "../../assets/icons/role.png";
import Logout from "../../assets/icons/logout.png";
import Subscription from "../../assets/icons/subscription.png";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    icon: {
      width: "20px",
      marginRight: "10px",
      backgroundColor: "white",
      padding: "6px",
      borderRadius: "6px",
    },
  };
});
export default function Sidebar() {
  const classes = useStyles();
  const [active, setactive] = useState(0)

  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>setactive(0)} selected={active===0}>
              <Box
                className={`${classes.icon}`}
                component="img"
                src={Dashboard}
              ></Box>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>setactive(1)} selected={active===1}>
              <ListItemIcon>
                <Box
                  className={`${classes.icon}`}
                  component="img"
                  src={Users}
                ></Box>
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>setactive(2)} selected={active===2}>
              <ListItemIcon>
                <Box
                  className={`${classes.icon}`}
                  component="img"
                  src={Match}
                ></Box>
              </ListItemIcon>
              <ListItemText primary="Match Requests" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>setactive(3)} selected={active===3}>
              <ListItemIcon>
                <Box
                  className={`${classes.icon}`}
                  component="img"
                  src={Team}
                ></Box>
              </ListItemIcon>
              <ListItemText primary="Team" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>setactive(4)} selected={active===4}>
              <ListItemIcon>
                <Box
                  className={`${classes.icon}`}
                  component="img"
                  src={Role}
                ></Box>
              </ListItemIcon>
              <ListItemText primary="Role" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>setactive(5)} selected={active===5}>
              <ListItemIcon>
                <Box
                  className={`${classes.icon}`}
                  component="img"
                  src={Subscription}
                ></Box>
              </ListItemIcon>
              <ListItemText primary="Subscription" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>setactive(6)} selected={active===6}>
              <ListItemIcon>
                <Box
                  className={`${classes.icon}`}
                  component="img"
                  src={Logout}
                ></Box>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
