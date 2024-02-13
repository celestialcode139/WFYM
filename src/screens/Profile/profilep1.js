import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import "../../App.css";
import Button from "../../components/buttonSm";
import DatepickerSticky from "../../components/datepickerSticky";
import avatar from "../../assets/images/avatar.png";
import camera from "../../assets/icons/camera.svg";
import APIHelper from "../../Helpers/APIHelper";
import config from "../../../config";
import { useEffect, useState } from "react";
import GeneralHelper from "../../Helpers/GeneralHelper";
import MediaHelper from "../../Helpers/MediaHelper";
import moment from "moment";
import CircularProgress from "../../components/CircularProgress";
// import $ from "jquery";
const useStyles = makeStyles(() => {
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
            marginTop: "8px",
            borderRadius: "15px",
            position: "relative",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
        },
        cancelBtn: {
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "1px solid black",
        },
        delBtn: {
            backgroundColor: "#FF1414",
        },
        marginTop100: {
            marginTop: "80px",
        },
        imageCircularProgress: {
            background: "#055cce00",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    };
});
function ProfileP1() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [Token, setToken] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [DOB, setDOB] = useState("");
    const [Gender, setGender] = useState("");
    const [Country, setCountry] = useState("");
    const [City, setCity] = useState("");
    const [Address, setAddress] = useState("");
    const [Description, setDescription] = useState("");
    const [Loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState({ image_url: avatar, file_name: "" });
    const [progress, setprogress] = useState(0);
    // Getting Profile Details
    const featchToken = async () => {
        const result = await GeneralHelper.retrieveData("Token");
        if (result.status == 1) {
            setToken(String(result.data));
        }
    };
    const GetProfile = async (Token) => {
        APIHelper.CallApi(config.Endpoints.user.GetMyProfile, {}, null, Token).then(async (result) => {
            setLoading(false);
            if (result.status == "success") {
                setFirstName(result?.data?.first_name ? result.data.first_name : "");
                setLastName(result?.data?.last_name ? result.data.last_name : "");
                setEmail(result?.data?.email ? result.data.email : "");
                setGender(result?.data?.gender ? result.data.gender : "");
                setCountry(result?.data?.user_details?.country
                    ? String(result?.data?.user_details?.country)
                    : "");
                setAddress(result?.data?.user_details?.location
                    ? String(result?.data?.user_details?.location)
                    : "");
                setDescription(result?.data?.user_details?.description
                    ? result.data.user_details.description
                    : "");
                setCity(result?.data?.user_details?.city
                    ? result.data.user_details.city
                    : "");
                const fileURL = await MediaHelper.GetImage(result?.data?.user_details?.images);
                console.log("fileURL", fileURL);
                setProfileImage({ ...profileImage, image_url: fileURL, file_name: result?.data?.user_details?.images });
                if (result.data.dob) {
                    const DateOfBirth = moment.utc(result?.data?.dob);
                    setDOB(DateOfBirth.format("DD MMMM YYYY"));
                }
            }
            else {
                setLoading(false);
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    // Updating Profile Details
    const UpdateProfile = () => {
        setLoading(true);
        const data = {
            first_name: FirstName,
            last_name: LastName,
            user_name: `${FirstName} ${LastName}`,
            gender: Gender,
            dob: DOB,
        };
        APIHelper.CallApi(config.Endpoints.user.UpdateUserProfile, data, null, Token).then((result) => {
            setLoading(false);
            if (result.status == "success") {
                UpdateBio();
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const UpdateBio = () => {
        const data = {};
        if (Country) {
            data.country = Country;
        }
        if (Address) {
            data.location = Address;
        }
        if (Description) {
            data.description = Description;
        }
        if (City) {
            data.city = City;
        }
        if (profileImage.file_name) {
            data.images = profileImage.file_name;
        }
        APIHelper.CallApi(config.Endpoints.user.UpdateBio, data, null, Token).then((result) => {
            if (result.status == "success") {
                navigate("/profile/page-2");
            }
            else {
                console.log(result.message);
                GeneralHelper.ShowToast(String(result.message));
            }
        });
    };
    const handleNext = () => {
        UpdateProfile();
    };
    const handleDOBChange = (e) => {
        setDOB(String(e));
    };
    const onprogress = (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setprogress(progress);
    };
    // Other functions
    useEffect(() => {
        setLoading(true);
        if (Token != "") {
            GetProfile(Token);
        }
        else {
            featchToken();
        }
    }, [Token]);
    return (_jsxs(Grid, { container: true, children: [_jsx(Grid, { md: 2, xs: 12, item: true, className: "h-center", sx: { marginBottom: { md: "0px", xs: "10px" } }, children: !Loading ?
                    _jsxs(Box, { className: `${classes.profileImage}`, style: { backgroundImage: `url(${profileImage.image_url})`, }, children: [_jsx(Box, { className: `${classes.imageCircularProgress}`, children: _jsx(CircularProgress, { progress: progress }) }), _jsx("input", { 
                                // accept="image/*"
                                style: { display: "none" }, id: "raised-button-file", type: "file", onChange: async (e) => {
                                    MediaHelper.UploadImage(e.target.files, onprogress).then((resp) => {
                                        console.log("image upload resp:", resp);
                                        setProfileImage({ ...profileImage, image_url: resp[0].url, file_name: resp[0].file_name });
                                    });
                                } }), _jsx("label", { htmlFor: "raised-button-file", children: _jsx(Box, { className: `${classes.imagePicker}`, component: "img", src: camera }) })] })
                    : _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "90%", height: 120 }) }), !Loading ?
                _jsxs(_Fragment, { children: [_jsx(Grid, { item: true, md: 5, xs: 12, children: _jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, md: 6, xs: 12, sx: { p: 1 }, children: _jsx(TextField, { sx: {
                                                width: "100%",
                                                "& div": {
                                                    borderRadius: "12px!important",
                                                    width: "100%",
                                                },
                                            }, type: "text", label: "First Name", value: FirstName, onChange: (e) => setFirstName(e.target.value) }) }), _jsx(Grid, { item: true, md: 6, xs: 12, sx: { p: 1 }, children: _jsx(TextField, { sx: {
                                                width: "100%",
                                                "& div": {
                                                    borderRadius: "12px!important",
                                                    width: "100%",
                                                },
                                            }, type: "text", label: "Last Name", value: LastName, onChange: (e) => setLastName(e.target.value) }) }), _jsx(Grid, { item: true, md: 6, xs: 12, sx: { p: 1 }, children: _jsx(TextField, { sx: {
                                                width: "100%",
                                                "& div": {
                                                    borderRadius: "12px!important",
                                                    width: "100%",
                                                },
                                            }, type: "text", label: "Email", value: Email, onChange: (e) => setEmail(e.target.value) }) }), _jsx(Grid, { item: true, md: 6, xs: 12, sx: { p: 1 }, children: _jsx(DatepickerSticky, { Default: DOB, onChange: handleDOBChange, children: _jsx(Button, { onClick: () => { }, sx: {
                                                    backgroundColor: "#EFFBFC",
                                                    color: "#323232",
                                                }, children: DOB == ""
                                                    ? "Choose birthday date"
                                                    : moment(DOB).format("D MMM YYYY") }) }) }), _jsx(Grid, { item: true, md: 6, xs: 12, sx: { p: 1 }, children: _jsx(TextField, { sx: {
                                                width: "100%",
                                                "& div": {
                                                    borderRadius: "12px!important",
                                                    width: "100%",
                                                },
                                            }, type: "text", label: "Country", value: Country, onChange: (e) => setCountry(e.target.value) }) }), _jsx(Grid, { item: true, md: 6, xs: 12, sx: { p: 1 }, children: _jsx(TextField, { sx: {
                                                width: "100%",
                                                "& div": {
                                                    borderRadius: "12px!important",
                                                    width: "100%",
                                                },
                                            }, type: "text", label: "City", value: City, onChange: (e) => setCity(e.target.value) }) }), _jsx(Grid, { item: true, md: 6, xs: 12, sx: { p: 1, display: { md: "block", xs: "none" } }, children: _jsx(Button, { Loading: Loading, onClick: () => handleNext(), className: `${classes.marginTop100}`, children: "Save Changes" }) }), _jsx(Grid, { item: true, md: 6, xs: 12, sx: { p: 1, display: { md: "block", xs: "none" } }, children: _jsx(Button, { onClick: () => {
                                                navigate(-1);
                                            }, className: `${classes.cancelBtn} ${classes.marginTop100}`, children: "Cancel" }) })] }) }), _jsx(Grid, { item: true, md: 3, xs: 12, children: _jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, xs: 12, sx: { p: 1 }, children: _jsx(TextField, { sx: {
                                                width: "100%",
                                                "& div": {
                                                    borderRadius: "12px!important",
                                                    width: "100%",
                                                },
                                            }, type: "text", label: "Description", multiline: true, rows: 4, value: Description, onChange: (e) => setDescription(e.target.value) }) }), _jsx(Grid, { item: true, xs: 12, sx: { p: 1 }, children: _jsx(TextField, { sx: {
                                                width: "100%",
                                                "& div": {
                                                    borderRadius: "12px!important",
                                                    width: "100%",
                                                },
                                            }, type: "text", label: "Address", value: Address, onChange: (e) => setAddress(e.target.value) }) }), _jsx(Grid, { item: true, xs: 4, sx: { p: 1, display: { md: "block", xs: "none" } } }), _jsx(Grid, { item: true, md: 6, xs: 12, sx: { p: 1, display: { md: "none", xs: "block" } }, children: _jsx(Button, { Loading: Loading, onClick: () => handleNext(), children: "Save Changes" }) }), _jsx(Grid, { item: true, md: 6, xs: 12, sx: { p: 1, display: { md: "none", xs: "block" } }, children: _jsx(Button, { onClick: () => {
                                                navigate(-1);
                                            }, className: `${classes.cancelBtn}`, children: "Cancel" }) }), _jsx(Grid, { item: true, md: 8, xs: 12, sx: { p: 1 }, children: _jsx(Button, { className: `${classes.delBtn}`, sx: { marginTop: { md: "80px" } }, children: "Delete Account" }) })] }) })] })
                :
                    _jsx(_Fragment, { children: _jsx(Grid, { item: true, md: 10, children: _jsxs(Grid, { container: true, spacing: 1, children: [_jsx(Grid, { item: true, md: 4, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 50 }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 50 }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 50 }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 50 }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 50 }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 50 }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 50 }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 50 }) }), _jsx(Grid, { item: true, md: 4, children: _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 50 }) })] }) }) })] }));
}
export default ProfileP1;
