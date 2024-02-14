import Dialog from "@mui/material/Dialog";
import crossIcon from "../assets/icons/crossIcon.png";
import { Box } from "@mui/material";

export default function ViewVideoDiloag(props: any) {
  return (
    <>
      <Dialog onClose={props.handleClose} open={props.open} maxWidth={false}>
        <Box
          sx={{
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
            zIndex: 99999999999,
          }}
          onClick={() => {
            props.handleClose();
          }}
        >
          <Box
            component="img"
            className="hover"
            src={crossIcon}
            sx={{ width: "10px", objectFit: "contain" }}
          ></Box>
        </Box>
        <video
          className="video220"
          autoPlay
          loop
          controls={true}
          style={{ height: window.innerHeight * 0.7 }}
        >
          <source src={props.src} type="video/mp4" />
        </video>
      </Dialog>
    </>
  );
}
