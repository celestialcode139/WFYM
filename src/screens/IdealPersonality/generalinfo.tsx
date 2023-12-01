import { useState, useEffect } from "react";
import { Box, Container, TextField, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import HeaderApp from "../../components/header/AppHeader";
import Button from "../../components/buttonSm";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// import $ from "jquery";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    appheader: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      backgroundImage: `url(${AdminSignature})`,
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
    },
    pageContainer: {
      width: "100%",
      maxWidth: "500px",
    },
    TextFieldParent: {
      marginBottom: "20px",
    },
  };
});
function Generalinfo() {
  const classes = useStyles();
  const [body, setbody] = useState({
    desc: "",
    personality: [],
    occupation: "",
    religion: "",
    political_Party: "",
    childrens: "",
  });

  const personalityHandler = (e: any) => {
    console.log(e.target.value);
    setbody({ ...body, personality: e.target.value });
  };
  const religionHandler = (e: any) => {
    console.log(e.target.value);
    setbody({ ...body, religion: e.target.value });
  };
  return (
    <Box className={`${classes.appheader}`}>
      <Container maxWidth="xl">
        <HeaderApp sx={{ position: "relative", top: "15px" }} />
        <Box
          sx={{ marginTop: "30px", padding: "20px", position: "relative" }}
          className={`blurBg min100vh h-center`}
        >
          <Box
            className={`${classes.pageContainer}`}
            sx={{ marginTop: { md: "100px", sm: "60px", xs: "30px" } }}
          >
            <Box className={`${classes.TextFieldParent}`}>
              <TextField
                multiline
                rows={4}
                fullWidth
                sx={{
                  "& .css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "15px!important",
                  },
                }}
                label="Describe your ideal Match"
                value={body.desc}
                onChange={(e) => {
                  setbody({ ...body, desc: e.target.value });
                }}
              />
            </Box>
            <Box className={`${classes.TextFieldParent}`}>
              <TextField
                fullWidth
                select
                label="Personality"
                variant="outlined"
                SelectProps={{
                  multiple: true,
                  value: body.personality,
                  onChange: personalityHandler,
                }}
                sx={{
                  "& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "15px",
                  },
                  "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
                    color: "#065bce",
                  },
                  "& .css-bpeome-MuiSvgIcon-root-MuiSelect-icon": {
                    color: "#065bce",
                  },
                }}
              >
                <MenuItem value="principled">Principled</MenuItem>
                <MenuItem value="creative">Creative</MenuItem>
                <MenuItem value="caring">Caring</MenuItem>
              </TextField>
            </Box>
            <Box className={`${classes.TextFieldParent}`}>
              <TextField
                fullWidth
                sx={{
                  "& div": {
                    borderRadius: "15px!important",
                  },
                }}
                label="Occupation"
                value={body.occupation}
                onChange={(e) => {
                  setbody({ ...body, occupation: e.target.value });
                }}
              />
            </Box>
            <Box className={`${classes.TextFieldParent}`}>
              <TextField
                fullWidth
                select
                label="Religion"
                variant="outlined"
                SelectProps={{
                  multiple: false,
                  value: body.religion,
                  onChange: religionHandler,
                }}
                sx={{
                  "& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "15px",
                  },
                  "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
                    color: "#065bce",
                  },
                  "& .css-bpeome-MuiSvgIcon-root-MuiSelect-icon": {
                    color: "#065bce",
                  },
                }}
              >
                <MenuItem value="principled">Principled</MenuItem>
                <MenuItem value="creative">Creative</MenuItem>
                <MenuItem value="caring">Caring</MenuItem>
              </TextField>
            </Box>   
            <Box className={`${classes.TextFieldParent}`}>
              <TextField
                fullWidth
                sx={{
                  "& div": {
                    borderRadius: "15px!important",
                  },
                }}
                label="Political Party"
                value={body.political_Party}
                onChange={(e) => {
                  setbody({ ...body, political_Party: e.target.value });
                }}
              />
            </Box>
            <Box className={`${classes.TextFieldParent}`}>
              <TextField
                fullWidth
                sx={{
                  "& div": {
                    borderRadius: "15px!important",
                  },
                }}
                label="Children's"
                value={body.childrens}
                onChange={(e) => {
                  setbody({ ...body, childrens: e.target.value });
                }}
              />
            </Box>
            <Box className={`${classes.TextFieldParent}`}>
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="start"
                    control={<Switch color="primary" />}
                    label="Plan for children"
                  />
                </FormGroup>
              </FormControl>
            </Box>
            <Button
              sx={{
                maxWidth: "200px",
                margin: "0 auto",
                marginTop: { md: "80", sm: "50px", xs: "30px" },
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Container>   
    </Box>
  );
}

export default Generalinfo;
