import { useState, useEffect, useMemo } from "react";
import { Box, Switch, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import BorderedBG from "../../assets/images/borderedBG.png";
import MUIDataTable from "mui-datatables";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import ViewProfileIcon from "../../assets/icons/ViewIcon.png";
import AssignMatchDiloag from "./AssignMatchDiloag";
import { debounce } from "lodash";
import { IMatchRequest, IUser, IUserSubscription } from "../../types";
import { useAuth } from "../../context/AuthContextProvider";
import Image from "../../components/Image";

const columns = [
  "Name",
  "Image",
  "Email",
  "Gender",
  "Subscription",
  "Matches Left",
  "Assign Match",
  "Mark As Completed",
];

const useStyles = makeStyles(() => {
  return {
    appheader: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      backgroundImage: `url(${AdminSignature})`,
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
    },
    logo: {
      width: "130px",
    },
    header: {
      //   paddingTop: "15px",
    },
    headerContainer: {
      backgroundColor: "#f9f9f9ed",
      padding: "10px 20px",
      backdropFilter: "blur(5px)",
      borderRadius: "10px",
    },
    profileImage: {
      height: "50px",
      width: "50px",
      borderRadius: "50%",
      border: "2px solid #01A0E6",
    },
    profileName: {
      fontSize: "16px!important",
      fontWeight: "bold!important",
    },
    profileLocation: {
      fontSize: "10px!important",
      lineHeight: "10px!important",
    },
    ProfileDropdown: {
      marginLeft: "5px",
      width: "20px",
    },
    BorderedBG: {
      backgroundImage: `url(${BorderedBG})`,
      borderRadius: "15px",
      backgroundSize: "100% 100%",
    },
    toggleBtn: {
      border: "1px solid #E8E6EA",
      display: "flex",
      padding: "8px",
      backgroundColor: "white",
      borderRadius: "10px",
      justifyContent: "space-between",
      cursor: "pointer",
    },
    activeToggleBtn: {
      backgroundColor: "#000000!important",
      boxShadow: "6px 7px 11px #00000057",
      border: "unset!important",
    },
    circleBadge: {
      height: "20px",
      width: "20px",
      display: "flex",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "12px",
      border: "1px solid #E8E6EA",
    },
    stickyContainer: {
      position: "sticky",
      top: "0px",
      zIndex: "999999",
      background: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "6px 7px 17px #00000017",
      padding: "10px",
    },
    prt200: {
      position: "relative",
      top: "150px",
    },
    avatarImage: {
      height: "50px",
      width: "50px",
      objectFit: "cover",
      borderRadius: "50%",
    },
    ViewIcon: {
      height: "40px",
      width: "40px",
      borderRadius: "50%",
      backgroundColor: "#065BCE",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      cursor: "pointer",
    },
    Parent: {
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
    SubscriptionBadge: {
      border: "1px solid #065BCE",
      width: 100,
      height: 25,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      borderRadius: 20,
    },
    SubscriptionText: {
      fontSize: 15,
      fontWeight: "400",
      color: "#065BCE",
    },
  };
});
function MatchRequests() {
  const { authToken } = useAuth();
  const classes = useStyles();
  const [DiloagOpen, setDiloagOpen] = useState(false);
  const [RequesterId, setRequesterId] = useState("");
  const [RequesterMatchRequestId, setRequesterMatchRequestId] = useState("");
  const [RequesterSubscriptionId, setRequesterSubscriptionId] = useState("");
  const [Loading, setLoading] = useState(false);
  const [matches, setmatches] = useState<IMatchRequest[]>([]);
  const [AllAvailableMatches, setAllAvailableMatches] = useState([]);

  const GetAllMatches = () => {
    console.log(Loading);
    setLoading(true);
    APIHelper.CallApi<IMatchRequest[]>(
      config.Endpoints.Match.GetAllMatches,
      {},
      "&execpt=completed",
      authToken
    ).then((result) => {
      if (result.status == "success") {
        if (result.data !== null && result.data !== undefined) {
          setmatches(result.data);
        }

        // setmatchStatus(result.data[0]?.status ?? "");
        setLoading(false);
      } else {
        setLoading(false);
        console.log(result.message);
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };
  // const handleViewProfile = (e: number) => {
  //   navigate(`/dash/view-matchprofile/${e}`);
  // };
  const handleOpenDiloag = (
    RequesterMatchRequestId: string,
    RequesterSubscriptionId: string,
    RequesterId: string
  ) => {
    setRequesterMatchRequestId(RequesterMatchRequestId);
    setRequesterSubscriptionId(RequesterSubscriptionId);
    setRequesterId(RequesterId);
    console.log("Setting RequesterId ", RequesterId);

    setDiloagOpen(true);
  };
  const handleCloseDiloag = () => {
    setDiloagOpen(false);
    setRequesterMatchRequestId("");
    GetAllMatches();
  };
  const handleMarkAsCompleted = debounce(
    (Completed: boolean, RequestId: string) => {
      if (Completed == true) {
        MarkAsCompleted(RequestId);
      }
    },
    1500
  );

  const MarkAsCompleted = (RequestId: string) => {
    APIHelper.CallApi(
      config.Endpoints.Match.MarkAsCompleted,
      { RequestId: RequestId },
      null,
      authToken
    ).then((result) => {
      if (result.status == "success") {
        GetAllMatches();
      } else {
        GeneralHelper.ShowToast(String(result.message));
      }
    });
  };

  useEffect(() => {
    GetAllMatches();
  }, []);

  useEffect(() => {
    if (matches.length != 0) {
      const pendingRecord = matches.filter(
        (record) => record.status != "completed"
      );
      const UsersName = pendingRecord.map(({ user_id }) => {
        if (typeof user_id !== "string") {
          return {
            first_name: user_id?.first_name || "",
            last_name: user_id?.last_name || "",
            _id: user_id?._id || "",
            SubscriptionId: user_id?.user_subscriptions || "",
          };
        }
      });
      if (UsersName.length > 0) {
        setAllAvailableMatches(UsersName);
      }
    }
  }, [matches]);

  const tableData = useMemo(() => {
    return matches.map((val) => {
      if (
        typeof val.user_id !== "string" &&
        typeof val?.user_id?.user_details !== "string" &&
        typeof val?.user_id?.user_subscriptions !== "string" &&
        typeof val?.user_id?.user_subscriptions?.subscription_id !== "string"
      ) {
        return [
          <Box className={`${classes.Parent}`}>
            {`${val?.user_id?.first_name} ${val?.user_id?.last_name}`}
          </Box>,
          <Box className={`${classes.Parent}`}>
            <Image
              className={`${classes.avatarImage}`}
              component="img"
              src={`${val?.user_id?.user_details?.images}`}
            />
          </Box>,
          <Box className={`${classes.Parent}`}>{`${val?.user_id?.email}`}</Box>,
          <Box className={`${classes.Parent}`}>
            {`${
              val?.user_id?.gender.charAt(0).toUpperCase() +
              val?.user_id?.gender.slice(1)
            }`}
          </Box>,
          <Box className={`${classes.Parent}`}>
            <Box className={`${classes.SubscriptionBadge}`}>
              <Typography className={`${classes.SubscriptionText}`}>
                {`${
                  val?.user_id?.user_subscriptions?.subscription_id?.title ==
                  undefined
                    ? "Don't have"
                    : val?.user_id?.user_subscriptions?.subscription_id?.title
                }`}
              </Typography>
            </Box>
          </Box>,
          <Box className={`${classes.Parent}`}>
            {`${
              val?.user_id?.user_subscriptions?.remaining_matches == undefined
                ? 0
                : val?.user_id?.user_subscriptions?.remaining_matches
            }`}
          </Box>,
          <Box className={`${classes.Parent}`}>
            <Box
              className={`${classes.ViewIcon}`}
              onClick={() => {
                handleOpenDiloag(
                  val._id,
                  (
                    (val.user_id as IUser)
                      .user_subscriptions as IUserSubscription
                  )._id,
                  (val.user_id as IUser)._id
                );
              }}
            >
              <img
                src={ViewProfileIcon}
                style={{ width: 20, height: 20, objectFit: "cover" }}
              />
            </Box>
          </Box>,
          <Box className={`${classes.Parent}`}>
            <Switch
              onChange={(e) => {
                handleMarkAsCompleted(e.target.checked, val._id);
              }}
            />
          </Box>,
        ];
      }
    });
  }, [matches]);

  return (
    <>
      <MUIDataTable
        title={"Match Requests"}
        data={tableData}
        columns={columns}
        options={{
          filterType: "checkbox",
        }}
      />
      <AssignMatchDiloag
        Matches={AllAvailableMatches}
        RequesterId={RequesterId}
        MatchRequestId={RequesterMatchRequestId}
        RequesterSubscriptionId={RequesterSubscriptionId}
        handleClose={handleCloseDiloag}
        open={DiloagOpen}
      />
    </>
  );
}

export default MatchRequests;
