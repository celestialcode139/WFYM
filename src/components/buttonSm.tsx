import { Box,Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(() => {
  const theme = useTheme();

  return({
    button:{
      backgroundColor:"#065BCE",
      borderRadius:"50.766px",
      padding:"12px 15px",
      color:"#ffffff",
      textAlign:'center',
      fontFamily:'Mori-bold!important',
      fontSize:"14px",
      cursor:"pointer"
    },
    
  });
})
function Button(props:any) {
  const classes = useStyles();
  return (
    <Box onClick={()=>props.onClick()} sx={props.sx} className={`${classes.button} ${props.className}`}>
        {props.children}
    </Box>
  )
}

export default Button
