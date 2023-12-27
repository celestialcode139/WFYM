import { useState, useEffect } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import matchicon1 from "../../assets/icons/matchicon1.svg";
import matchicon2 from "../../assets/icons/matchicon2.png";
import matchicon3 from "../../assets/icons/matchicon3.png";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
// import $ from "jquery";

const useStyles = makeStyles(() => {
  return {
    paymentCard: {
      backgroundColor: "#ffffff",
      padding: "20px 30px",
      borderRadius: "13px",
      boxShadow: "0px 0px 10px 0px #00000030!important",
      cursor: "pointer",
    },
    paymentCardSelected: {
      backgroundColor: "#065BCE",
      padding: "20px 30px",
      borderRadius: "13px",
      boxShadow: "0px 0px 10px 0px #00000030!important",
      cursor: "pointer",
    },
    paymentIcon: {
      width: "40px",
    },
    matchNumber: {
      fontSize: "35px!important",
      display: "flex",
      color: "white",
      alignItems: "end",
      marginBottom: "35px!important",
    },
    subscriptionAmount: {
      fontSize: "60px!important",
      color: "#ffffff",
      lineHeight: "1!important",
    },
    saveAmount: {
      color: "#ffffff",
    },
  };
});
function Matches() {
  const classes = useStyles();
  const [subscriptions, setsubscriptions] = useState<any>([]);
  const [Token, setToken] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("40");

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const featchToken = async () => {
    const result: any = await GeneralHelper.retrieveData("Token");
    if (result.status == 1) {
      setToken(String(result.data));
    }
  };
  const GetSubscription = () => {
    APIHelper.CallApi(
      config.Endpoints.Subscription.GetAll,
      {},
      null,
      Token
    ).then((result: any) => {
      if (result.status == "success") {
        console.log(result.data);
        setsubscriptions(result?.data);
      } else {
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };

  // Other functions
  useEffect(() => {
    if (Token != "") {
      GetSubscription();
    } else {
      featchToken();
    }
    fetchUserId();
  }, [Token]);

  const fetchUserId = async () => {
    const result: any = await GeneralHelper.retrieveData("UserId");
    if (result.status == 1) {
      // setuserId(String(result.data));
    }
  };

  return (
    <Box sx={{ padding: "100px" }}>
      <Grid container spacing={1}>
        {subscriptions.map((subscription: any, i: number) => {
          let matchicon = [matchicon1, matchicon2, matchicon3];
          return (
            <Grid item md={4} xs={12} key={i}>
              <Box
                className={`${
                  i == 1 ? classes.paymentCardSelected : classes.paymentCard
                }`}
              >
                <Box
                  className={`${classes.paymentIcon}`}
                  component="img"
                  src={matchicon[i]}
                ></Box>
                <Typography
                  className={`${classes.matchNumber}`}
                  sx={{ color: i == 1 ? "#ffffff" : "#9B9B9B" }}
                >
                  {subscription.matches_per_months}
                  <Typography>matches</Typography>
                </Typography>
                <Typography
                  className={`${classes.saveAmount}`}
                  sx={{ color: i == 1 ? "#ffffff" : "#9B9B9B" }}
                ></Typography>
                <Box>
                <TextField id="filled-basic" label="Filled" variant="filled" />
                  {isEditing ? (
                    <TextField
                    value={text}
                    onChange={()=>{}}
                    InputLabelProps={{ shrink: false }} // Remove the label
                    InputProps={{ style: {borderBottom: 'none'} }}
                  />
                  ) : (
                    <Typography
                      className={`${classes.subscriptionAmount}`}
                      sx={{ color: i == 1 ? "#ffffff" : "#9B9B9B" }}
                      onDoubleClick={()=>{handleDoubleClick()}}
                    >
                      {text}
                    </Typography>
                  )}
                </Box>
                {/* <Typography
                  className={`${classes.subscriptionAmount}`}
                  sx={{ color: i == 1 ? "#ffffff" : "#9B9B9B" }}
                >
                  ${subscription.amount}
                </Typography> */}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Matches;
