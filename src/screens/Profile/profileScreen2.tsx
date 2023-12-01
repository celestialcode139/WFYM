import { Box, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import Button from "../../components/buttonSm";
import DatepickerSticky from "../../components/datepickerSticky";
import avatar from "../../assets/images/avatar.png";
import camera from "../../assets/icons/camera.svg";

// import $ from "jquery";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    imagePicker: {
      backgroundColor: "#075bce",
      padding: "8px",
      borderRadius: "50%",
      border: "2px solid white",
      position: "absolute",
      bottom: "-11px",
      right: "-11px",
      width: "20px",
      cursor: "pointer",
    },
    profileImage: {
      height: "120px",
      width: "120px",
      backgroundImage: `url(${avatar})`,
      backgroundSize: "contain",
      marginTop: "8px",
      borderRadius: "15px",
      position: "relative",
    },
  };
});
function profileScreen2() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid
        md={2}
        xs={12}
        item
        className="h-center"
        sx={{ marginBottom: { md: "0px", xs: "10px" } }}
      >
        <Box className={`${classes.profileImage}`}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={(e) => {
              console.log("Image : ", e.target.value);
            }}
          />
          <label htmlFor="raised-button-file">
            <Box
              className={`${classes.imagePicker}`}
              component="img"
              src={camera}
            ></Box>
          </label>
        </Box>
      </Grid>
      <Grid item md={5} xs={12}>
        <Grid container>
          <Grid item md={6} xs={12} sx={{ p: 1 }}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="First Name"
              value={null}
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item md={6} xs={12} sx={{ p: 1 }}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="Last Name"
              value={null}
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item md={6} xs={12} sx={{ p: 1 }}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="Email"
              value={null}
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item md={6} xs={12} sx={{ p: 1 }}>
            <DatepickerSticky>
              <Button
                sx={{
                  backgroundColor: "#EFFBFC",
                  color: "#323232",
                }}
              >
                Choose birthday date
              </Button>
            </DatepickerSticky>
          </Grid>
          <Grid item md={6} xs={12} sx={{ p: 1 }}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="Country"
              value={null}
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item md={6} xs={12} sx={{ p: 1 }}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="City"
              value={null}
              onChange={(e) => {}}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3} xs={12}>
        <Grid container>
          <Grid item xs={12} sx={{ p: 1 }}>
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
              value={null}
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item xs={12} sx={{ p: 1 }}>
            <TextField
              sx={{
                width: "100%",
                "& div": {
                  borderRadius: "12px!important",
                  width: "100%",
                },
              }}
              type="text"
              label="Address"
              value={null}
              onChange={(e) => {}}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default profileScreen2;
