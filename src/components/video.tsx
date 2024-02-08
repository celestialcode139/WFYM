import * as React from "react";
import { Box } from "@mui/material";
import ViewVideoDiloag from "./viewVideoDiloag";
import MediaHelper from "../Helpers/MediaHelper";

export default function MediaCover(props: any) {
  const [DiloagOpen, setDiloagOpen] = React.useState(false);
  const [videosrc, setvideosrc] = React.useState<string>("");


  const handleCloseDiloag = () => {
    console.log("Closing....");
    setTimeout(() => {
      setDiloagOpen(false);
    },);
  };
  const handleOpenDiloag = () => {
    setDiloagOpen(true);
  };
  React.useEffect(() => {
    init();
  }, [props.src])

  const init = () => {
    MediaHelper.GetImage(props.src).then((e) => {
      setvideosrc(e)
    })
  }

  return (
    <Box
      onClick={() => {
        handleOpenDiloag();
      }}
    >
      <video key={videosrc} className="video220" autoPlay loop muted style={{ borderRadius: "15px" }}>
        <source src={videosrc} type="video/mp4" style={{ borderRadius: "15px" }} />
      </video>
      <ViewVideoDiloag
        key={DiloagOpen}
        src={videosrc}
        handleClose={handleCloseDiloag}
        open={DiloagOpen}
      />
    </Box>
  );
}
