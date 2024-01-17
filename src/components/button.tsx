import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(() => {

  return({
    button:{
      backgroundColor:"#065BCE",
      borderRadius:"50.766px",
      padding:"17px 15px",
      color:"#ffffff",
      textAlign:'center',
      fontFamily:'Mori-bold!important',
      cursor:"pointer"
    },
    
  });
})
function Button(props:any) {
  const classes = useStyles();
  return (
    <Box onClick={()=>props.onClick()} sx={props.sx} className={`${classes.button}`}>
        {props.children}
    </Box>
  )
}

export default Button
