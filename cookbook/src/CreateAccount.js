import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Typography, Grid } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebaseConfig.js' ;
import { doc, setDoc } from 'firebase/firestore';

export default function CreateAccount() {
	const [email, setEmail] = useState(""); // Email
	const [password, setPassword] = useState(""); // Password
	const [name, setName] = useState(""); // Name 
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleCreateAccount = async (event) => {
		event.preventDefault();
		setError("");

	try { 
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		console.log("User created:", userCredential.user);
		const userRef = doc(db, "users", userCredential.user.uid);

		await setDoc(userRef, {
			email: userCredential.user.email,
			uid: userCredential.user.uid,
			name: name,
			createdAt: new Date(),
		});

		console.log("User data added to Firestore");
		navigate("/Profile");

	} catch (err) {
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
		 Create your Online Cookbook Account
		</Typography>

		<form onSubmit={ handleCreateAccount } style={{ width: "100%", maxWidth: "400px" }}>

		<TextField
		label="Name"
		type="text"
		variant="outlined"
		fullWidth
		margin="normal"
		value={name}
		onChange={(e) => setName(e.target.value)}
		required 
		/>

		<TextField
		label="Email"
		type="email"
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

		<Typography variant="body2" style={{ margin: "10px" }}>
		 Use 6 or more numbers
		</Typography>

		<Grid container spacing={2} justifyContent="space-between">

		<Grid item xs={6}>
		<Typography variant="body2" style={{ marginTop: "10px" }}>
		 Sign in instead{' '}
		<Link to="/Login" style={{ textDecoration: "underline", color: "blue" }}>
		 login
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
		 Next
		</Button>
		</Grid>

		</Grid>
		</form>
		</Container>
		</div>
	);
}
