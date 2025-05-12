import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import app from './firebaseConfig';
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

		<Grid container spacing={2} alignItems="center">

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

		{/*Title of website*/}
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

		{/*Website description*/}
		<h5
		style={{
			marginBottom: "30px",
			color: "#555555",
			textAlign: "center",
		      }}
		>
		 This is an Online Cookbook where you can add your recipes and share them with people that you know.
		</h5>

		<Grid container spacing={2} justifyContent="center">

		{/*Signup Button*/}
		<Grid item>
		<Link to="/CreateAccount" style={{ textDecoration: "none" }}>
		<Button 
		variant="contained" 
		sx={{ 
			borderRadius: "30px",
			padding: "10px 30px",
			background: "#455763",
			"&:hover":{backgroundColor: "#D3DADC"}
		   }}
		type="submit"
		>
		 Signup
		</Button>
		</Link>
		</Grid>

		{/*Login Button*/}
		<Grid item>
		<Link to="/Login" style={{ textDecoration: "none" }}>
		<Button
		variant="contained"
		sx={{
			borderRadius: "30px",
			padding: "10px 30px",
			background: "#455763",
			"&:hover":{backgroundColor: "#D3DADC"}
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

		{/*IMAGE on right side */}
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
