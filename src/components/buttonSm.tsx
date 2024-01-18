import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BouncingBallsLoading from "./BouncingBallsLoading";

const useStyles = makeStyles(() => {
  return {
    button: {
      backgroundColor: "#065BCE",
      borderRadius: "50.766px",
      padding: "12px 15px",
      color: "#ffffff",
      textAlign: "center",
      fontFamily: "Mori-bold!important",
      fontSize: "14px",
      cursor: "pointer",
    },
  };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Button(props: any) {
  const classes = useStyles();
  return (
    <Box
      onClick={() => props?.onClick()}
      sx={props?.sx}
      className={`${classes.button} ${props?.className}`}
    >
      {/* {props.children} */}
      {props.Loading == true ? (
        <BouncingBallsLoading />
      ) : (
        // <CircularProgress size={24} style={{padding:0}} color="inherit" />
        props.children
      )}
    </Box>
  );
}

export default Button;
