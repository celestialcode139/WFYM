import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Box, TextField, MenuItem, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import GeneralHelper from "../Helpers/GeneralHelper";
import config from "../../config";
import APIHelper from "../Helpers/APIHelper";
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
    const religionHandler = (e) => {
        setbody({ ...body, religion: e.target.value });
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
    return (_jsx(Box, { children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, md: 4, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, sx: {
                                "& div": {
                                    borderRadius: "15px!important",
                                },
                            }, label: "Occupation", value: body.occupation, onChange: (e) => {
                                setbody({ ...body, occupation: e.target.value });
                            } }) }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, select: true, label: "Religion", variant: "outlined", SelectProps: {
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
                            }, children: AllReligion.map((item) => (_jsx(MenuItem, { value: item.value, children: item.value }))) }) }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, sx: {
                                "& div": {
                                    borderRadius: "15px!important",
                                },
                            }, label: "Political Party", value: body.political_Party, onChange: (e) => {
                                setbody({ ...body, political_Party: e.target.value });
                            } }) }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, sx: {
                                "& div": {
                                    borderRadius: "15px!important",
                                },
                            }, label: "Children's", value: body.childrens, onChange: (e) => {
                                setbody({ ...body, childrens: e.target.value });
                            } }) }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, sx: {
                                "& div": {
                                    borderRadius: "15px!important",
                                },
                            }, label: "Highest Degree", value: body.highestDegree, onChange: (e) => {
                                setbody({ ...body, highestDegree: e.target.value });
                            } }) }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, sx: {
                                "& div": {
                                    borderRadius: "15px!important",
                                },
                            }, label: "Deal Bracker", value: body.dealBracker, onChange: (e) => {
                                setbody({ ...body, dealBracker: e.target.value });
                            } }) }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, type: "number", sx: {
                                "& div": {
                                    borderRadius: "15px!important",
                                },
                            }, 
                            // type="number"
                            label: "Hight (ft)", value: body.height, onChange: (e) => {
                                setbody({ ...body, height: e.target.value });
                            } }) }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(TextField, { fullWidth: true, type: "number", sx: {
                                "& div": {
                                    borderRadius: "15px!important",
                                },
                            }, label: "Weight (kg)", value: body.weight, onChange: (e) => {
                                setbody({ ...body, weight: e.target.value });
                            } }) }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(FormControl, { component: "fieldset", children: _jsx(FormGroup, { "aria-label": "position", row: true, children: _jsx(FormControlLabel, { value: "start", style: { color: "#000000" }, control: _jsx(Switch, { checked: body.smookingHabit, color: "primary", onChange: (e) => setbody({ ...body, smookingHabit: e.target.checked }) }), label: "Smooking habits" }) }) }) }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Box, { className: `${classes.TextFieldParent}`, children: _jsx(FormControl, { component: "fieldset", children: _jsx(FormGroup, { "aria-label": "position", row: true, children: _jsx(FormControlLabel, { value: "start", style: { color: "#000000" }, control: _jsx(Switch, { checked: body.drinkingHabit, color: "primary", onChange: (e) => setbody({ ...body, drinkingHabit: e.target.checked }) }), label: "Drinking habits" }) }) }) }) })] }) }));
}
export default Generalinfo;
