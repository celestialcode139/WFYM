import { useState, useEffect } from "react";
import { Box, TextField, MenuItem, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import AdminSignature from "../assets/images/adminSignature.svg";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RangeSlider from "./RangeSlider";
import APIHelper from "../Helpers/APIHelper";
import config from "../../config";
import GeneralHelper from "../Helpers/GeneralHelper";
import { debounce } from "lodash";

// import $ from "jquery";

const useStyles = makeStyles(() => {
	return {
		appheader: {
			backgroundColor: "#ffffff",
			minHeight: "100vh",
			backgroundImage: `url(${AdminSignature})`,
			backgroundSize: "100%",
			backgroundRepeat: "no-repeat",
		},
		TextFieldParent: {
			// marginBottom: "20px",
		},
	};
});
const politicalPartyOptions = [
  { value: "Conservative" },
  { value: "Liberal" },
  { value: "Moderate" },
  { value: "Other" },
];
function Generalinfo(props: any) {
	const classes = useStyles();
	const [AllReligion, setAllReligion] = useState([]);

	const [body, setbody] = useState({
		minAge: props.body.minAge,
		maxAge: props.body.maxAge,
		description: props.body.description,
		religion: props.body.religion,
		political_Party: props.body.political_Party,
		beforeChildren: props.body.beforeChildren,
		location: props.body.location,
	});
	// Getting Profile
	const GetReligion = () => {
		APIHelper.CallApi(
			config.Endpoints.Init.GetMetaData,
			{},
			"religion",
			props.Token
		).then((result: any) => {
			if (result.status == "success") {
				handleSort(result.data);
				console.log("Religions ", result.data);
			} else {
				console.log(result.message);
				GeneralHelper.ShowToast(String(result.message));
			}
		});
	};
	const handleSort = (ArrayToSort: any) => {
		const sortedArray = [...ArrayToSort].sort((a, b) =>
			a.value.localeCompare(b.value)
		);
		console.log("sortedArray ", sortedArray);
		setAllReligion(sortedArray);
	};
	// Other Functions
	const handleAgeSelection = debounce((MinAge, MaxAge) => {
		console.log("Setting MinAge ", MinAge);

		setbody({ ...body, minAge: MinAge, maxAge: MaxAge });
	}, 1500);

	const religionHandler = (e: any) => {
		setbody({ ...body, religion: e.target.value });
	};
	useEffect(() => {
		console.log("On Change Body ", body);
		props.onChange(body);
	}, [body]);

	useEffect(() => {
		GetReligion();
	}, []);

	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item sm={12}>
					<Box sx={{ marginBottom: "30px" }}>
						<RangeSlider
							title="Age"
							DefaultValue={[body.minAge, body.maxAge]}
							handleChange={([min, max]: Array<number>) =>
								handleAgeSelection(min, max)
							}
						/>
					</Box>
				</Grid>

				<Grid item sm={6}>
					<Box className={`${classes.TextFieldParent}`}>
						<TextField
							fullWidth
							select
							label="Religion"
							variant="outlined"
							SelectProps={{
								multiple: false,
								value: body.religion,
								onChange: religionHandler,
							}}
							sx={{
								"& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root":
									{
										borderRadius: "15px",
									},
								"& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon":
									{
										color: "#065bce",
									},
								"& .css-bpeome-MuiSvgIcon-root-MuiSelect-icon":
									{
										color: "#065bce",
									},
							}}
						>
							{AllReligion.map((item, i) => (
								<MenuItem key={i} value={item.value}>
									{item.value}
								</MenuItem>
							))}
						</TextField>
					</Box>
				</Grid>
				<Grid item md={6}>
					<Box className={`${classes.TextFieldParent}`}>
						<TextField
							fullWidth
							sx={{
								"& div": {
									borderRadius: "15px!important",
								},
							}}
							label="City"
							value={body.location}
							onChange={(e) => {
								setbody({ ...body, location: e.target.value });
							}}
						/>
					</Box>
				</Grid>
				<Grid item md={6}>
					<Box className={`${classes.TextFieldParent}`}>
						<TextField
							fullWidth
							select
							label={`Political Party`}
							variant="outlined"
							SelectProps={{
								multiple: false,
								value: body.political_Party,
								onChange: (e: any) =>
									setbody({
										...body,
										political_Party: e.target.value,
									}),
							}}
							sx={{
								"& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root":
									{
										borderRadius: "15px",
									},
								"& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon":
									{
										color: "#065bce",
									},
								"& .css-bpeome-MuiSvgIcon-root-MuiSelect-icon":
									{
										color: "#065bce",
									},
							}}
						>
							{politicalPartyOptions.map((item, i) => (
								<MenuItem key={i} value={item.value}>
									{item.value}
								</MenuItem>
							))}
						</TextField>
					</Box>
				</Grid>
				{body.beforeChildren !== 0 && (
					<Grid item md={6}>
						<Box className={`${classes.TextFieldParent}`}>
							<TextField
								fullWidth
								sx={{
									"& div": {
										borderRadius: "15px!important",
									},
								}}
								label="Children"
								value={body.beforeChildren}
								type="number"
								onChange={(e) => {
									setbody({
										...body,
										beforeChildren: parseInt(
											e.target.value
										),
									});
								}}
							/>
						</Box>
					</Grid>
				)}

				<Grid item md={6}>
					<Box className={`${classes.TextFieldParent}`}>
						<FormControl component="fieldset">
							<FormGroup aria-label="position" row>
								<FormControlLabel
									value="start"
									style={{ color: "#000000" }}
									control={
										<Switch
											checked={body.beforeChildren}
											color="primary"
											onChange={(e) =>
												setbody({
													...body,
													beforeChildren:
														e.target.checked == true
															? 1
															: 0,
												})
											}
										/>
									}
									label="Children"
								/>
							</FormGroup>
						</FormControl>
					</Box>
				</Grid>
				<Grid item md={12}>
					<Box className={`${classes.TextFieldParent}`}>
						<TextField
							sx={{
								width: "100%",
								"& div": {
									borderRadius: "12px!important",
									width: "100%",
								},
							}}
							type="text"
							label="Description"
							multiline
							rows={4}
							value={body.description}
							onChange={(e: any) =>
								setbody({
									...body,
									description: e.target.value,
								})
							}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Generalinfo;
