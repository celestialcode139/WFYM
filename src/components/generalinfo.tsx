/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Box, TextField, MenuItem, Grid, InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
import GeneralHelper from "../Helpers/GeneralHelper";
import config from "../../config";
import APIHelper from "../Helpers/APIHelper";
import { useAuth } from "../context/AuthContextProvider";
import { errorFieldsKeys } from "../types";

// import $ from "jquery";

const useStyles = makeStyles(() => {
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
  const { errorState, setErrorState } = useAuth();
  const [AllReligion, setAllReligion] = useState([]);
  const DrinkingOptions = [
    { value: "Yes" },
    { value: "Sometimes" },
    { value: "No" },
    { value: "Prefer not to say" },
  ];
  const ChildrenOptions = [
    { value: "Don’t have children" },
    { value: "Have children" },
    { value: "Prefer not to say" },
  ];
  const politicalPartyOptions = [
    { value: "Conservative" },
    { value: "Liberal" },
    { value: "Moderate" },
    { value: "Other" },
  ];
  const [body, setbody] = useState({
    occupation: "",
    religion: "principled",
    political_Party: "",
    childrens: "",
    planForChildren: false,
    smookingHabit: "Prefer not to say",
    drinkingHabit: "Prefer not to say",
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
        handleSort(result.data);
        console.log("Religions ", result.data);
      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };
  const handleSort = (ArrayToSort: any) => {
    const sortedArray: any = [...ArrayToSort].sort((a, b) =>
      a.value.localeCompare(b.value)
    );
    console.log("sortedArray ", sortedArray);
    setAllReligion(sortedArray);
  };
  const handleUpdateOccupation = (value) => {
    const UpdatedErrorState = errorState.filter(
      (item) => item !== "profession"
    );
    setErrorState(UpdatedErrorState);
    setbody({
      ...body,
      occupation: value,
    });
  };
  const handleUpdateReligion = (value) => {
    const UpdatedErrorState = errorState.filter((item) => item !== "religion");
    setErrorState(UpdatedErrorState);
    setbody({
      ...body,
      religion: value.target.value,
    });
  };
  const handleUpdatePoliticalParty = (value) => {
    const UpdatedErrorState = errorState.filter(
      (item) => item !== "political_party"
    );
    setErrorState(UpdatedErrorState);
    setbody({
      ...body,
      political_Party: value,
    });
  };
  const handleUpdateChildrens = (value) => {
    const UpdatedErrorState = errorState.filter(
      (item) => item !== "children_before"
    );
    setErrorState(UpdatedErrorState);
    setbody({
      ...body,
      childrens: value,
    });
  };
  const handleUpdateHighestDegree = (value) => {
    const UpdatedErrorState = errorState.filter(
      (item) => item !== "highest_degree"
    );
    setErrorState(UpdatedErrorState);
    setbody({
      ...body,
      highestDegree: value,
    });
  };
  const handleUpdateDealBracker = (value) => {
    const UpdatedErrorState = errorState.filter(
      (item) => item !== "deal_breaker"
    );
    setErrorState(UpdatedErrorState);
    setbody({
      ...body,
      dealBracker: value,
    });
  };
  const handleUpdateHeight = (value) => {
    const UpdatedErrorState = errorState.filter((item) => item !== "height");
    setErrorState(UpdatedErrorState);
    setbody({
      ...body,
      height: value,
    });
  };
  const handleUpdateWeight = (value) => {
    const UpdatedErrorState = errorState.filter((item) => item !== "weight");
    setErrorState(UpdatedErrorState);
    setbody({
      ...body,
      weight: value,
    });
  };
  const handleUpdateSmokingHabit = (value) => {
    const UpdatedErrorState = errorState.filter((item) => item !== "smoking");
    setErrorState(UpdatedErrorState);
    setbody({
      ...body,
      smookingHabit: value,
    });
  };
  const handleUpdateDrinkingHabit = (value) => {
    const UpdatedErrorState = errorState.filter(
      (item) => item !== "drink_habits"
    );
    setErrorState(UpdatedErrorState);
    setbody({
      ...body,
      drinkingHabit: value,
    });
  };
  useEffect(() => {
    props.onChange(body);
  }, [body, props]);

  useEffect(() => {
    GetReligion();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("Body ", body);
  }, [body]);

  return (
    <Box>
      <Grid container spacing={2}>
        {/* <Grid item md={6}>
          <Box className={`${classes.TextFieldParent}`}>
            <CustomeHeightPicker />
          </Box>
        </Grid> */}
        {/* <Grid item md={12}>
          <Box className={`${classes.TextFieldParent}`}>
            <CustomeWeightPicker />
          </Box>
        </Grid> */}
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
              error={errorState.includes(errorFieldsKeys.profile.profession)}
              onChange={(e) => {
                handleUpdateOccupation(e.target.value);
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
              error={errorState.includes(errorFieldsKeys.profile.religion)}
              SelectProps={{
                multiple: false,
                value: body.religion,
                onChange: handleUpdateReligion,
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
              {AllReligion.map((item: any) => (
                <MenuItem value={item.value}>{item.value}</MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box className={`${classes.TextFieldParent}`}>
            <TextField
              fullWidth
              select
              label={`Political Party`}
              variant="outlined"
              error={errorState.includes(
                errorFieldsKeys.profile.political_party
              )}
              SelectProps={{
                multiple: false,
                value: body.political_Party,
                onChange: (e: any) =>
                  handleUpdatePoliticalParty(e.target.value),
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
              {politicalPartyOptions.map((item, i) => (
                <MenuItem key={i} value={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box className={`${classes.TextFieldParent}`}>
            <TextField
              fullWidth
              select
              label={`Children`}
              variant="outlined"
              error={errorState.includes(
                errorFieldsKeys.profile.children_before
              )}
              SelectProps={{
                multiple: false,
                value: body.childrens,
                onChange: (e: any) => handleUpdateChildrens(e.target.value),
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
              {ChildrenOptions.map((item, i) => (
                <MenuItem key={i} value={item.value}>
                  {item.value}
                </MenuItem>
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
              label="Highest Degree"
              value={body.highestDegree}
              error={errorState.includes(
                errorFieldsKeys.profile.highest_degree
              )}
              onChange={(e) => {
                handleUpdateHighestDegree(e.target.value);
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
              label="Dealbreaker"
              value={body.dealBracker}
              error={errorState.includes(errorFieldsKeys.profile.deal_breaker)}
              onChange={(e) => {
                handleUpdateDealBracker(e.target.value);
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
              error={errorState.includes(errorFieldsKeys.profile.height)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">inch</InputAdornment>
                ),
              }}
              label="Hight"
              value={body.height}
              onChange={(e) => {
                handleUpdateHeight(e.target.value);
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
              error={errorState.includes(errorFieldsKeys.profile.weight)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">lbs</InputAdornment>
                ),
              }}
              label="Weight"
              value={body.weight}
              onChange={(e) => {
                handleUpdateWeight(e.target.value);
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
            <TextField
              fullWidth
              select
              label={`Smoking habits`}
              variant="outlined"
              error={errorState.includes(
                errorFieldsKeys.profile.smoking_habits
              )}
              SelectProps={{
                multiple: false,
                value: body.smookingHabit,
                onChange: (e: any) => handleUpdateSmokingHabit(e.target.value),
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
              {DrinkingOptions.map((item, i) => (
                <MenuItem key={i} value={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box className={`${classes.TextFieldParent}`}>
            <TextField
              fullWidth
              select
              label={`Drinking habits`}
              variant="outlined"
              error={errorState.includes(errorFieldsKeys.profile.drink_habits)}
              SelectProps={{
                multiple: false,
                value: body.drinkingHabit,
                onChange: (e: any) => handleUpdateDrinkingHabit(e.target.value),
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
              {DrinkingOptions.map((item, i) => (
                <MenuItem key={i} value={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Generalinfo;
