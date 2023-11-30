import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
function valuetext(value: any) {
  return `${value}°C`;
}

const CustomRangeSlider = styled(Slider)(({ theme }) => ({
  color: "#065BCE",
  width: "100%",
  "& .css-eg0mwd-MuiSlider-thumb":{
    width:"30px",
    height:"30px",
    border:"3px solid #ffffff"
  }
}));
export default function RangeSlider(props:any) {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event: any, newValue: any) => {
    console.log("newValue:",newValue)
    setValue(newValue);
    props.handleChange(newValue);
  };

  return (
    <Box>
      <Box className={"space-between"} sx={{marginBottom:"15px"}}>
        <Typography className={`f-bold v-center`}>{props.title}</Typography>
        <Typography className={`f-14 v-center`}>{value[0]}-{value[1]}</Typography>
      </Box>
      <CustomRangeSlider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
