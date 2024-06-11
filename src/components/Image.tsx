import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MediaHelper from "../Helpers/MediaHelper";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function Image(props: any) {
    const [img, setimg] = useState<string>("0")
    console.log("here us to", props.fallbackSrc );
    
    useEffect(() => {
        if (props.src) {
            getSignedURL();
        } else if (props.fallbackSrc) {
            setimg(props.fallbackSrc);
        }
    }, [props.src, props.fallbackSrc]);

    const getSignedURL = async () => {
        const imageURL = await MediaHelper.GetImage(props.src);
        setimg(imageURL);
    }

    return (
        <>
            {
                img != "0" ?
                    <Box
                        component="img"
                        className={props.className}
                        src={img}
                        sx={props.sx}
                        loading="lazy"
                        onClick={props.onClick}
                    ></Box> :
                    <Skeleton animation="wave" variant="rounded" width={"100%"} height={120} />
            }


        </>
    )
}

export default Image
