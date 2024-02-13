import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, TextField, MenuItem, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RangeSlider from "./RangeSlider";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import GeneralHelper from "../Helpers/GeneralHelper";
import { debounce } from "lodash";
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
function Generalinfo(props) {
    const classes = useStyles();
    const [AllReligion, setAllReligion] = useState([]);
    const [body, setbody] = useState({
        minAge: props.body.minAge,
        maxAge: props.body.maxAge,
        description: props.body.description,
        religion: props.body.religion,
        political_Party: props.body.political_Party,
        beforeChildren: props.body.beforeChildren,
        location: props.body.location,
    });
    // Getting Profile
    const GetReligion = () => {
        APIHelper.CallApi(config.Endpoints.Init.GetMetaData, {}, "religion", props.Token).then((result) => {
            if (result.status == "success") {
                handleSort(result.data);
                console.log("Religions ", result.data);
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const handleSort = (ArrayToSort) => {
        const sortedArray = [...ArrayToSort].sort((a, b) => a.value.localeCompare(b.value));
        console.log("sortedArray ", sortedArray);
        setAllReligion(sortedArray);
    };
    // Other Functions
    const handleAgeSelection = debounce((MinAge, MaxAge) => {
        console.log("Setting MinAge ", MinAge);
        setbody({ ...body, minAge: MinAge, maxAge: MaxAge });
    }, 1500);
    const religionHandler = (e) => {
        setbody({ ...body, religion: e.target.value });
    };
    useEffect(() => {
        console.log("On Change Body ", body);
        props.onChange(body);
    }, [body]);
    useEffect(() => {
        GetReligion();
    }, []);
    return (_jsx(Box, { children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, md: 12, children: _jsx(Box, { sx: { marginBottom: "30px" }, children: _jsx(RangeSlider, { title: "Age", DefaultValue: [body.minAge, body.maxAge], handleChange: ([min, max]) => handleAgeSelection(min, max) }) }) }), _jsx(Grid, { item: true, md: 12, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, select: true, label: "Religion", variant: "outlined", SelectProps: {
                                multiple: false,
                                value: body.religion,
                                onChange: religionHandler,
                            }, sx: {
                                "& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
                                    borderRadius: "15px",
                                },
                                "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
                                    color: "#065bce",
                                },
                                "& .css-bpeome-MuiSvgIcon-root-MuiSelect-icon": {
                                    color: "#065bce",
                                },
                            }, children: AllReligion.map((item, i) => (_jsx(MenuItem, { value: item.value, children: item.value }, i))) }) }) }), _jsx(Grid, { item: true, md: 12, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, sx: {
                                "& div": {
                                    borderRadius: "15px!important",
                                },
                            }, label: "Location", value: body.location, onChange: (e) => {
                                setbody({ ...body, location: e.target.value });
                            } }) }) }), _jsx(Grid, { item: true, md: 12, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, sx: {
                                "& div": {
                                    borderRadius: "15px!important",
                                },
                            }, label: "Political Party", value: body.political_Party, onChange: (e) => {
                                setbody({ ...body, political_Party: e.target.value });
                            } }) }) }), _jsx(Grid, { item: true, md: 12, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { sx: {
                                width: "100%",
                                "& div": {
                                    borderRadius: "12px!important",
                                    width: "100%",
                                },
                            }, type: "text", label: "Description", multiline: true, rows: 4, value: body.description, onChange: (e) => setbody({ ...body, description: e.target.value }) }) }) }), _jsx(Grid, { item: true, md: 12, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(FormControl, { component: "fieldset", children: _jsx(FormGroup, { "aria-label": "position", row: true, children: _jsx(FormControlLabel, { value: "start", style: { color: "#000000" }, control: _jsx(Switch, { checked: body.beforeChildren, color: "primary", onChange: (e) => setbody({
                                            ...body,
                                            beforeChildren: e.target.checked == true ? 1 : 0,
                                        }) }), label: "Already have children" }) }) }) }) }), body.beforeChildren !== 0 && (_jsx(Grid, { item: true, md: 12, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, sx: {
                                "& div": {
                                    borderRadius: "15px!important",
                                },
                            }, label: "Children's", value: String(body.beforeChildren), onChange: (e) => {
                                setbody({ ...body, beforeChildren: parseInt(e.target.value) });
                            } }) }) }))] }) }));
}
export default Generalinfo;
