import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useEffect } from "react";
import ViewProfile from "./viewProfile";

export default function AssignMatchDiloag(props: any) {
  const [SelectedMatch, setSelectedMatch] = React.useState("");
  const [Matches, setMatches] = React.useState([
    
  ]);

  const handleChange = (event: any) => {
    console.log("Setting ",event.target.value);
    
    setSelectedMatch(event.target.value);
  };
  useEffect(() => {
    console.log("Matches ",props.Matches);
    
    setMatches(props.Matches)
  }, [props])
  
  return (
    <Dialog onClose={props.handleClose} open={props.open}  maxWidth={false} maxHeight={false}>
      <DialogTitle>Assign Match</DialogTitle>
      <Box
        sx={{
          // minWidth: window.innerWidth,
          paddingRight: "30px",
          paddingLeft: "30px",
          paddingBottom: "20px",
        }}
      >
        <FormControl  style={{width:"200px",marginBottom:"50px"}}>
          <InputLabel id="demo-simple-select-label">Select Match</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={SelectedMatch}
            label="Matches"
            onChange={handleChange}
          >
            {Matches.map((item)=>(
                <MenuItem key={item.first_name} value={item._id}>{item.first_name}</MenuItem>

            ))}
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
        {
          SelectedMatch != "" &&
        <ViewProfile Id={SelectedMatch}/>
        }
      </Box>
    </Dialog>
  );
}
