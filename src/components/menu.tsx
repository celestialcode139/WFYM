import * as React from "react";
import { Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

export default function BasicMenu(props: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box onClick={handleClick} className="v-center hover">
        {props.children}
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuList sx={{ width: "200px" }}>
          <Link style={{color:"black"}} to={{ pathname: "/buy-matches" }}>
            <MenuItem>
              <ListItemText>Buy Matches</ListItemText>
            </MenuItem>
          </Link>
          <Link style={{color:"black"}} to={{ pathname: "/profile/page-1" }}>
            <MenuItem>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
          </Link>
          <Link style={{color:"black"}} to={{ pathname: "/ideal-personality/race" }}>
            <MenuItem>
              <ListItemText>Ideal Personality</ListItemText>
            </MenuItem>
          </Link>
          <Link style={{color:"black"}} to={{ pathname: "/change-pass" }}>
            <MenuItem>
              <ListItemText>Change password</ListItemText>
            </MenuItem>
          </Link>
          <MenuItem>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
