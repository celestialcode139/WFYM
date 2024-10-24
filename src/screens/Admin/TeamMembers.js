import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import AdminSignature from "../../assets/images/adminSignature.svg";
import BorderedBG from "../../assets/images/borderedBG.png";
import MUIDataTable from "mui-datatables";
import Avatar from "../../assets/icons/image1.png";
import GeneralHelper from "../../Helpers/GeneralHelper";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import ViewProfileIcon from "../../assets/icons/ViewIcon.png";
const columns = ["Name", "Image", "Email", "Gender", "Role", "Action"];
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
            display: "flex"
        },
        SubscriptionBadge: {
            border: "1px solid #065BCE",
            width: 100,
            height: 25,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            borderRadius: 20
        },
        SubscriptionText: {
            fontSize: 15,
            fontWeight: "400",
            color: "#065BCE"
        }
    };
});
function TeamMembers() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [Token, setToken] = useState("");
    const [Loading, setLoading] = useState(false);
    const [matches, setmatches] = useState([]);
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
        if (result.status == 1) {
            setToken(String(result.data));
        }
    };
    const GetAllMatches = () => {
        console.log(Loading);
        setLoading(true);
        APIHelper.CallApi(config.Endpoints.Match.GetMatches, {}, "?use_auth_user_id=true&is_discard=false", Token).then((result) => {
            if (result.status == "success") {
                console.log("Matches:", result.data);
                setmatches(result.data);
                // setmatchStatus(result.data[0]?.status ?? "");
                setLoading(false);
            }
            else {
                setLoading(false);
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const handleViewProfile = (e) => {
        navigate(`/dash/view-matchprofile/${e}`);
    };
    useEffect(() => {
        if (Token != "") {
            GetAllMatches();
        }
        else {
            featchToken();
        }
    }, [Token]);
    const tableData = useMemo(() => {
        return matches.map((val) => {
            return [
                _jsx(Box, { className: `${classes.Parent}`, children: "Joe James" }),
                _jsx(Box, { className: `${classes.Parent}`, children: _jsx(Box, { className: `${classes.avatarImage}`, component: "img", src: Avatar }) }),
                _jsx(Box, { className: `${classes.Parent}`, children: "joe.james@gmail.com" }),
                _jsx(Box, { className: `${classes.Parent}`, children: "Male" }),
                _jsx(Box, { className: `${classes.Parent}`, children: "Admin" }),
                _jsx(Box, { className: `${classes.Parent}`, children: _jsx(Box, { className: `${classes.ViewIcon}`, onClick: () => { handleViewProfile(val?.user_id?._id); }, children: _jsx("img", { src: ViewProfileIcon, style: { width: 20, height: 20, objectFit: "cover" } }) }) }),
            ];
        });
    }, [matches]);
    return (_jsx(_Fragment, { children: _jsx(MUIDataTable, { title: "Team", data: tableData, columns: columns, options: {
                filterType: "checkbox"
            } }) }));
}
export default TeamMembers;
