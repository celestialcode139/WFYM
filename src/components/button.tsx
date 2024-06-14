import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BouncingBallsLoading from "./BouncingBallsLoading";

const useStyles = makeStyles(() => {
  return {
    button: {
      backgroundColor: "#065BCE",
      borderRadius: "50.766px",
      padding: "17px 15px",
      color: "#ffffff",
      textAlign: "center",
      fontFamily: "Mori-bold!important",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.1s",
      "&:active": {
        transform: "scale(0.95)",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "0 0 0 3px rgba(6, 91, 206, 0.5)",
      },
    },
  };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Button(props: any) {
  const classes = useStyles();
  return (
    <Box
      onClick={() =>
        props.Disabled || props.Loading ? null : props?.onClick && props?.onClick()
      }
      sx={[
        props.sx,
        {
          backgroundColor: props.Disabled
            ? "gray"
            : props?.sx?.backgroundColor
            ? props?.sx?.backgroundColor
            : "#065BCE",
        },
      ]}
      className={`${classes.button}`}
    >
      {props.Loading ? <BouncingBallsLoading /> : props.children}
    </Box>
  );
}

export default Button;
