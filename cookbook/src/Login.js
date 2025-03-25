import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig.js';

function Login() {
	 const [email, setEmail] = useState(""); // Email
         const [password, setPassword] = useState(""); // Password
	 const [error, setError] = useState("");
	 const navigate = useNavigate();

	 const handleLogin = async (event) => {
		 event.preventDefault();
		 setError("");
		 try { 
			 const userCredential = await signInWithEmailAndPassword(auth, email, password);
			 console.log("User signed in", userCredential);
			 navigate("/Profile");
		 } catch (err)
		 {
			 setError(err.message);
		 }
	 };

	        return (
			<div className="App">

			<Container 
			style={{ 
				display: "flex",
				flexDirection: "column",						
				justifyContent: "center",		
				alignItems: "center",
				height: "100vh"
			}}
			>

			<Typography variant="h4" gutterBottom>
	                 Login to Your Account
			</Typography>

			<form onSubmit={handleLogin} style={{ width: "100%", maxWidth: "400px" }}>

			<TextField
			label="Email"
	          	variant="outlined"
			fullWidth
		  	margin="normal"
			value={email}
			onChange={(e) => setEmail(e.target.value)} 
			required
			/>

			<TextField
			label="Password"
	          	type="password"
			variant="outlined"
			fullWidth
			margin="normal"
	          	value={password}
			onChange={(e) => setPassword(e.target.value)} 
			required
		        />

			{error && (
		        <Typography color="error" variant="body2" style={{ margin: "10px" }}>
				{error}
				</Typography>
			)}

			<Grid container spacing={2} justifyContent="space-between">

			<Grid item xs={6}>

			<Typography variant="body2" style={{ marginTop: "10px" }}>
			 Sign up instead{' '}
			<Link to="/CreateAccount" style={{ textDecoration: "underline", color: "blue" }}>
			 SignUp
			</Link>
			</Typography>
			</Grid>

			<Grid item xs={6} container justifyContent="flex-end">
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
			 Login
	                </Button>
			</Grid>

			</Grid>
			</form>
			</Container>
			</div>
		);
}
export default Login;
