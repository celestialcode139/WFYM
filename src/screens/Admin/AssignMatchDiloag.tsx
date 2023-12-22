import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';



export default function AssignMatchDiloag(props: any) {
    const [age, setAge] = React.useState('');

    const handleChange = (event: any) => {
        setAge(event.target.value);
    };
    return (
        <Dialog onClose={props.handleClose} open={props.open}>
            <DialogTitle>Assign Match</DialogTitle>
            <Box sx={{ minWidth: 120,paddingRight:30,paddingLeft:30,paddingBottom:20 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Dialog>
    );
}
