import { useState, useEffect } from "react";
import { Box, Container, TextField, MenuItem, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
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
    TextFieldParent: {
      // marginBottom: "20px",
    },
  };
});
function Generalinfo(props: any) {
  const classes = useStyles();
  const [body, setbody] = useState({
    description: props.body.description,
    religion: props.body.religion,
    political_Party: props.body.political_Party,
    beforeChildren: props.body.beforeChildren,
  });

  const religionHandler = (e: any) => {
    console.log(e.target.value);
    setbody({ ...body, religion: e.target.value });
  };
  useEffect(() => {
    console.log(props.body);
    
    props.onChange(body);
  }, [body]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box className={`${classes.TextFieldParent}`}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="Description"
              multiline
              rows={4}
              value={body.description}
              onChange={(e: any) =>
                setbody({ ...body, description: e.target.value })
              }
            />
          </Box>
        </Grid>
        <Grid item md={12}>
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
              <MenuItem value="Islam">Islam</MenuItem>
              <MenuItem value="Christianity">Christianity</MenuItem>
              <MenuItem value="Buddhism">Buddhism</MenuItem>
              <MenuItem value="Hinduism">Hinduism</MenuItem>
              <MenuItem value="Judaism">Judaism</MenuItem>
            </TextField>
          </Box>
        </Grid>
        <Grid item md={12}>
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
        </Grid>
        <Grid item md={12}>
          <Box className={`${classes.TextFieldParent}`}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start"
                  control={
                    <Switch
                      checked={body.beforeChildren}
                      color="primary"
                      onChange={(e) =>
                        setbody({
                          ...body,
                          beforeChildren: e.target.checked == true ? 1 : 0,
                        })
                      }
                    />
                  }
                  label="Already have children"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Generalinfo;
