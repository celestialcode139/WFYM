import * as React from "react";
import { Box } from "@mui/material";


export default function MediaCover(props:any) {
  return (
    <Box onClick={()=>{
        props.onClick();
    }}>
      <video
        className="video220"
        autoPlay
        loop
        muted
      >
        <source
          src={props.src}
          type="video/mp4"
        />
      </video>
    </Box>
  );
}
