import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import LogoWhite from "../../assets/logo/logo-w.png";
import Hamburger from "../../assets/icons/hamburger.svg";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const pages = [
  { label: "Home", url: "/home" },
  { label: "About", url: "/about" },
  { label: "Log in", url: "/login" },
];
const useStyles = makeStyles(() => {

  return {
    button: {
      "&:focus": {
        outline: "unset",
      },
      padding: "0px!important",
      minWidth: "unset!important",
      borderRadius: "50%!important",
      marginLeft: "10px!important",
    },
    hamburger: {
      width: 50,
    },
    loginBtn: {
      borderRadius: "54.07px !important",
      border: "0.82px solid black!important",
      padding: "12px 24px!important",
      color: "#000000!important",
      "&:focus": {
        outline: "unset",
      },
    },
  };
});

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const classes = useStyles();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "unset",
        paddingTop: "20px",
        paddingBottom: { xs: "20px", sm: "10px" },
        backgroundColor: "unset",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={LogoWhite}
            sx={{ width: { xs: "100px", sm: "200px" } }}
          ></Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Link to={{pathname: "/signup"}} className={`${classes.loginBtn}`}>
              
                Log in
              
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "flex" } }}>
            <Button
              className={`${classes.button}`}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <Box
                component="img"
                className={`${classes.hamburger}`}
                src={Hamburger}
              ></Box>
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: "block",
                borderRadius: 50,
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
