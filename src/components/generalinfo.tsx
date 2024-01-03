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
import GeneralHelper from "../Helpers/GeneralHelper";
import config from "../../config";
import APIHelper from "../Helpers/APIHelper";

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
  const [AllReligion, setAllReligion] = useState([]);
  const [body, setbody] = useState({
    occupation: "",
    religion: "principled",
    political_Party: "",
    childrens: "",
    planForChildren: false,
    smookingHabit: false,
    drinkingHabit: false,
    dealBracker: "",
    height: "",
    weight: "",
    highestDegree: "",
  });

  const GetReligion = () => {
    APIHelper.CallApi(
      config.Endpoints.Init.GetMetaData,
      {},
      "religion",
      props.Token
    ).then((result: any) => {
      if (result.status == "success") {
        handleSort(result.data)
        console.log("Religions ", result.data);
      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };
  const handleSort = (ArrayToSort: any) => {
    const sortedArray = [...ArrayToSort].sort((a, b) =>
      a.value.localeCompare(b.value)
    );
    console.log("sortedArray ", sortedArray);
    setAllReligion(sortedArray);

  };
  const religionHandler = (e: any) => {
    setbody({ ...body, religion: e.target.value });
  };
  useEffect(() => {
    props.onChange(body);
  }, [body]);

  useEffect(() => {
    GetReligion()
    setbody({
      ...body,
      occupation: props.body.occupation,
      religion: props.body.religion,
      political_Party: props.body.political_Party,
      childrens: props.body.childrens,
      // planForChildren: props.body.planForChildren,
      smookingHabit: props.body.smookingHabit,
      drinkingHabit: props.body.drinkingHabit,
      dealBracker: props.body.dealBracker,
      height: props.body.height,
      weight: props.body.weight,
      highestDegree: props.body.highestDegree,
    });
  }, []);

  useEffect(() => {
    console.log("Body ",body);
    
  }, [body])
  

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={4}>
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
        </Grid>
        <Grid item md={4}>
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
              {
                AllReligion.map((item,i)=>(
                  <MenuItem value={item.value}>{item.value}</MenuItem>
                ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item md={4}>
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
        <Grid item md={4}>
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
        </Grid>
        <Grid item md={4}>
          <Box className={`${classes.TextFieldParent}`}>
            <TextField
              fullWidth
              sx={{
                "& div": {
                  borderRadius: "15px!important",
                },
              }}
              label="Highest Degree"
              value={body.highestDegree}
              onChange={(e) => {
                setbody({ ...body, highestDegree: e.target.value });
              }}
            />
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box className={`${classes.TextFieldParent}`}>
            <TextField
              fullWidth
              sx={{
                "& div": {
                  borderRadius: "15px!important",
                },
              }}
              label="Deal Bracker"
              value={body.dealBracker}
              onChange={(e) => {
                setbody({ ...body, dealBracker: e.target.value });
              }}
            />
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box className={`${classes.TextFieldParent}`}>
            <TextField
              fullWidth
              type="number"
              sx={{
                "& div": {
                  borderRadius: "15px!important",
                },
              }}
              // type="number"
              label="Hight (ft)"
              value={body.height}
              onChange={(e) => {
                setbody({ ...body, height: (e.target.value) });
              }}
            />
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box className={`${classes.TextFieldParent}`}>
            <TextField
              fullWidth
              type="number"
              sx={{
                "& div": {
                  borderRadius: "15px!important",
                },
              }}
              label="Weight (kg)"
              value={body.weight}
              
              onChange={(e) => {
                setbody({ ...body, weight: e.target.value });
              }}
            />
          </Box>
        </Grid>

        {/* <Grid item md={4}>
          <Box className={`${classes.TextFieldParent}`}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start"
                  style={{color:"#000000"}}
                  control={
                    <Switch
                      checked={body.planForChildren}
                      color="primary"
                      onChange={(e) =>
                        setbody({ ...body, planForChildren: e.target.checked })
                      }
                    />
                  }
                  label="Plan for children"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Grid> */}
        <Grid item md={4}>
          <Box className={`${classes.TextFieldParent}`}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start"
                  style={{color:"#000000"}}
                  control={
                    <Switch
                      checked={body.smookingHabit}
                      color="primary"
                      onChange={(e) =>
                        setbody({ ...body, smookingHabit: e.target.checked })
                      }
                    />
                  }
                  label="Smooking habits"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box className={`${classes.TextFieldParent}`}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start"
                  style={{color:"#000000"}}
                  control={
                    <Switch
                      checked={body.drinkingHabit}
                      color="primary"
                      onChange={(e) =>
                        setbody({ ...body, drinkingHabit: e.target.checked })
                      }
                    />
                  }
                  label="Drinking habits"
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
