import * as React from "react";
import { Box, Typography } from "@mui/material";
import ViewVideoDiloag from "./viewVideoDiloag";

export default function MediaCover(props: any) {
  const [DiloagOpen, setDiloagOpen] = React.useState(false);

  const handleCloseDiloag = () => {
    console.log("Closing....");
    setTimeout(() => {
      setDiloagOpen(false);
    },);
  };
  const handleOpenDiloag = () => {
    setDiloagOpen(true);
  };

  return (
    <Box
      onClick={() => {
        handleOpenDiloag();
      }}
    >
      <video className="video220" autoPlay loop muted style={{borderRadius:"15px"}}>
        <source src={props.src} type="video/mp4" style={{borderRadius:"15px"}} />
      </video>
      <ViewVideoDiloag
        key={DiloagOpen}
        src={props.src}
        handleClose={handleCloseDiloag}
        open={DiloagOpen}
      />
    </Box>
  );
}
