import React from 'react';
import app from "./firebaseConfig";
import { Link } from 'react-router-dom';
import { Grid, Button } from "@mui/material";
import logo from './Cover.jpeg';


function Home() {
	console.log("Firebase App Initialized:", app);

	return (
	 	<div 
		className="container" 
		style={{
			backgroundColor: "#C3CAD2",
			minHeight: "100vh",
			width: "100%",
			padding: "0",
			margin: "0",
		      }}
		>
		<Grid
		container
		spacing={2}
		alignItems="center"
		>

		{/*Left Side*/}
		<Grid
		item
		md={6}
		xs={12}
		style={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			textAlign: "center",
			height: "100vh",
			paddingBottom: "10vh",
		      }}
		>

		<h1
		style={{
		marginBottom: "20px",
		fontWeight: "bold",
		fontSize: "3.5rem",
		textAlign: "center",
		width: "100%",
		}}
		>
		Welcome to my Online Cookbook
		</h1>

		<h5
		style={{
			marginBottom: "30px",
			color: "#888A8E",
			textAlign: "center",
		      }}
		>
		This is an Online Cookbook
		</h5>

		<Grid container spacing={2} justifyContent="center">
		<Grid item>
		<Link to="/CreateAccount" style={{ textDecoration: 'none' }}>
		<Button 
		variant="contained" 
		sx={{ 
			borderRadius: "30px",
			padding: "10px 30px",
			background: "#727F91",
			"&:hover":{backgroundColor: "#ACB4BD"}
		   }}
		type="submit"
		>
		Signup
		</Button>
		</Link>
		</Grid>
		<Grid item>
		<Link to="/Login" style={{ textDecoration: 'none' }}>
		<Button
		variant="contained"
		sx={{
			borderRadius: "30px",
			padding: "10px 30px",
			background: "#727F91",
			"&:hover":{backgroundColor: "#ACB4BD"}
	           }}
		>
		Login
		</Button>
		 </Link>
		</Grid>
		</Grid>
		</Grid>

		{/*Right Side*/}
		<Grid
		item
		md={6}
		xs={12}
		style={{
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center",
			height: "100vh",
			overflow: "hidden"
		      }}
		>

		<img
		src={logo}
		alt="CoverPic"
		style={{
			height: "100vh",
			width: "100%",
			objectFit: "cover"
		      }}
		/>

		</Grid>
		</Grid>
		</div>
	);
}

export default Home;
