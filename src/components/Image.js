import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MediaHelper from "../Helpers/MediaHelper";
import Skeleton from '@mui/material/Skeleton';
function Image(props) {
    const [img, setimg] = useState("0");
    useEffect(() => {
        getSignedURL();
    }, [props.src]);
    const getSignedURL = async () => {
        let imageURL = await MediaHelper.GetImage(props.src);
        setimg(imageURL);
    };
    return (_jsx(_Fragment, { children: img != "0" ?
            _jsx(Box, { component: "img", className: props.className, src: img, sx: props.sx, loading: "lazy" }) :
            _jsx(Skeleton, { animation: "wave", variant: "rounded", width: "100%", height: 120 }) }));
}
export default Image;
