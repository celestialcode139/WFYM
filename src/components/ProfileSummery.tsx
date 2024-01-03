import { Box, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import DoubleTic from "../assets/icons/doubleTic.svg";
import { useEffect } from "react";

const useStyles = makeStyles(() => {

  return {
    quickProfileContainer: {
      padding: "15px",
    },
    name: {
      color: "black",
    },
    pt20: {
      marginTop: "20px",
    },
    badge: {
      padding: "3px 6px",
      display: "inline-flex",
      border: "1px solid #075bce",
      borderRadius: "6px",
      fontSize: "12px",
      color: "#075bce",
      marginRight: "6px",
      marginBottom: "6px",
    },
    galleryImage: {
      width: "100%",
      borderRadius: "10px",
    },
  };
});
function ProfileSummery(props: any) {
  const classes = useStyles();

  useEffect(() => {
    console.log(props.data);
  }, []);

  const calculateAge = (birthDate: any) => {
    const birthDateObject: any = new Date(birthDate);
    const currentDate: any = new Date();
    const timeDifference = currentDate - birthDateObject;
    const age = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));

    return age;
  };

  useEffect(() => {
    console.log("SUMMERY : ",props.data);
    
  }, []);

  return (
    <Box className={`${classes.quickProfileContainer}`}>
      <Box>
        <Typography className={`f-22-bold mb-10 ${classes.name}`}>
          {`${props.data?.result_user_id?.first_name} ${props.data?.result_user_id?.last_name}`}
          , {calculateAge(props.data?.result_user_id?.dob)}
        </Typography>
        <Typography className={`p-12`}>
          {props.data?.result_user_id?.user_details?.profession}
        </Typography>
      </Box>
      <Box className={`${classes.pt20}`}>
        <Typography className={`f-15-bold mb-10`} sx={{color:"#000000"}}>Location</Typography>
        <Typography className={`p-12`}>
          {`${props.data?.result_user_id?.user_details?.location} ${props.data?.result_user_id?.user_details?.city}  ${props.data?.result_user_id?.user_details?.country}`}
        </Typography>
      </Box>
      <Box className={`${classes.pt20}`}>
        <Typography className={`f-15-bold mb-10`} sx={{color:"#000000"}}>About</Typography>
        <Typography className={`p-12`}>
          {props.data?.result_user_id?.user_details?.description}
        </Typography>
      </Box>
      <Box className={`${classes.pt20}`}>
        <Typography className={`f-15-bold mb-10`} sx={{ marginBottom: "10px", color:"#000000" }}>
          Interests
        </Typography>
        <Box>
          {props.data?.result_user_id?.user_details?.hobbies?.map(
            (hoby: any, i: number) => {
              return hoby ? (
                <Box className={`${classes.badge} v-center`} key={i}>
                  <Box component="img" src={DoubleTic}></Box> {hoby}
                </Box>
              ) : null;
            }
          )}
        </Box>
      </Box>
      <Box className={`${classes.pt20}`}>
        <Typography className={`f-15-bold mb-10`} sx={{color:"#000000"}}>Gallery</Typography>
        <Grid container spacing={1}>
          {props.data?.result_user_id?.user_details?.images?.map(
            (image: any, i: number) => (
              <Grid item xs={6} key={i}>
                <Box
                  component="img"
                  className={`${classes.galleryImage}`}
                  src={image}
                ></Box>
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default ProfileSummery;
