import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useEffect } from "react";
import ViewProfile from "./viewProfile";
import Button from "../../components/buttonSm";
import crossIcon from "../../assets/icons/crossIcon.png";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import GeneralHelper from "../../Helpers/GeneralHelper";
import Alert from "../../Helpers/Alert";
import { ToastContainer } from "react-toastify";
export default function AssignMatchDiloag(props) {
    const [SelectedMatch, setSelectedMatch] = React.useState("");
    const [Matches, setMatches] = React.useState([]);
    const [AssignMatchLoading, setAssignMatchLoading] = React.useState(false);
    const handleChange = (event) => {
        console.log("Setting ", event.target.value);
        setSelectedMatch(event.target.value);
    };
    // const handleAssignMatch = () =>{
    //   setAssignMatchLoading(true)
    // }
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
        if (result.status == 1) {
            if (SelectedMatch == undefined || SelectedMatch == "") {
                console.log("Selected Match ", SelectedMatch);
                Alert.notify("No Matches Available!", 3000);
            }
            else {
                console.log(String(SelectedMatch));
                handleAssignMatch(String(result.data));
            }
        }
    };
    const handleAssignMatch = (Token) => {
        setAssignMatchLoading(true);
        const body = {
            result_user_id: SelectedMatch,
            match_req_id: props.MatchRequestId,
            user_subscription_id: props.RequesterSubscriptionId,
        };
        console.log("Body To Send In Assign Matches ", body);
        APIHelper.CallApi(config.Endpoints.Match.AssignMatches, body, null, Token).then((result) => {
            if (result.status == "success") {
                Alert.notify("Match Assigned Successfully!", 3000);
                setAssignMatchLoading(false);
                props.handleClose();
            }
            else {
                setAssignMatchLoading(false);
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    useEffect(() => {
        const FilterAvailableMatches = props.Matches.filter((item) => item?._id != props.RequesterId);
        setMatches(FilterAvailableMatches);
        if (FilterAvailableMatches[0]?._id != undefined) {
            setSelectedMatch(FilterAvailableMatches[0]?._id);
        }
    }, [props]);
    return (_jsxs(Dialog, { onClose: props.handleClose, open: props.open, maxWidth: false, children: [_jsx(Box, { sx: {
                    height: "30px!important",
                    width: "30px!important",
                    borderRadius: "15px",
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                    cursor: "pointer",
                    zIndex: 99,
                }, onClick: () => {
                    props.handleClose();
                }, children: _jsx(Box, { component: "img", className: "hover", src: crossIcon, sx: { width: "20px", objectFit: "contain" } }) }), _jsxs(Box, { sx: {
                    // minWidth: window.innerWidth,
                    paddingRight: "30px",
                    paddingLeft: "30px",
                    paddingBottom: "20px",
                    paddingTop: "20px",
                    borderColor: "red",
                    borderWidth: "5px",
                }, children: [_jsxs(Box, { sx: { flexDirection: "row", display: "flex" }, children: [_jsxs(FormControl, { style: { width: "200px", marginBottom: "50px" }, children: [_jsx(InputLabel, { id: "demo-simple-select-label", children: "Select Match" }), _jsx(Select, { labelId: "demo-simple-select-label", id: "demo-simple-select", value: SelectedMatch, label: "Matches", onChange: handleChange, style: { border: "2px solid red" }, children: Matches.map((item) => (_jsxs(MenuItem, { value: item._id, children: [item.first_name, item.last_name] }, item.first_name))) })] }), _jsx(Box, { children: _jsx(Button, { Loading: AssignMatchLoading, onClick: () => {
                                        featchToken();
                                    }, sx: { width: "300px", marginLeft: "20px" }, children: "Assign Match" }) })] }), SelectedMatch != "" && (_jsx(ViewProfile, { MatchRequestId: props.MatchRequestId, RequesterSubscriptionId: props.RequesterSubscriptionId, Id: SelectedMatch }))] }), _jsx(ToastContainer, {})] }));
}
