import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useEffect } from "react";
import ViewProfile from "./viewProfile";
import Button from "../../components/buttonSm";
import crossIcon from "../../assets/icons/crossIcon.png";


export default function AssignMatchDiloag(props: any) {
  const [SelectedMatch, setSelectedMatch] = React.useState("");
  const [Matches, setMatches] = React.useState([]);

  const handleChange = (event: any) => {
    console.log("Setting ", event.target.value);

    setSelectedMatch(event.target.value);
  };
  useEffect(() => {
    setMatches(props.Matches);
    setSelectedMatch(props.Matches[0]?._id)
  }, [props]);

  return (
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
          sx={{ width: "20px", objectFit: "contain" }}
        ></Box>
      </Box>
      {/* <DialogTitle>Assign Match</DialogTitle> */}
      <Box
        sx={{
          // minWidth: window.innerWidth,
          paddingRight: "30px",
          paddingLeft: "30px",
          paddingBottom: "20px",
          paddingTop:"20px"
        }}
      >
        <Box sx={{ flexDirection: "row", display: "flex" }}>
          <FormControl style={{ width: "200px", marginBottom: "50px" }}>
            <InputLabel id="demo-simple-select-label">Select Match</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={SelectedMatch}
              label="Matches"
              onChange={handleChange}
            >
              {Matches.map((item) => (
                <MenuItem key={item.first_name} value={item._id}>
                  {item.first_name}
                </MenuItem>
              ))}
              {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
          <Box>
            <Button sx={{ width: "300px", marginLeft: "20px" }}>
              Assign Match
            </Button>
          </Box>
        </Box>
        {SelectedMatch != "" && (
          <ViewProfile
            MatchRequestId={props.MatchRequestId}
            RequesterSubscriptionId={props.RequesterSubscriptionId}
            Id={SelectedMatch}
          />
        )}
      </Box>
    </Dialog>
  );
}
