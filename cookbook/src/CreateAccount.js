import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig.js' ;
import { Button, Container, TextField, Typography, Grid, input } from '@mui/material';

export default function CreateAccount() {
	const [email, setEmail] = useState(''); // Email
	const [password, setPassword] = useState(''); // Password
	const navigate = useNavigate(); 
	const [error, setError] = useState('');

	const handleCreateAccount = async (event) => {
		event.preventDefault();

	setError('');
	try { 
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		console.log("User created:", userCredential.user);
		navigate('/Profile');
	} catch (err) {
		setError(err.message);
	}
	};

	return (
		<div className="App">
		<Container 
		style={{ 
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100vh'
		}}
		>
		<Typography variant="h4" gutterBottom>
		Create your Online Cookbook Account
		</Typography>
		<form onSubmit={handleCreateAccount} style={{ width: '100%', maxWidth: '400px' }}>
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
		        type="tel"
		        variant="outlined"
		        fullWidth
		        margin="normal"
	                value={password}
       	                onChange={(e) => setPassword(e.target.value)}
			required
		/>
		<Grid container spacing={2} justifyContent="space-between">
		<Grid item xs={6}>
		<Typography variant="body2" style={{ marginTop: '10px' }}>
		Sign in instead{' '}
		<Link to="/Login" style={{ textDecoration: 'underline', color: 'blue' }}>
		 login
                </Link>
		</Typography>
		</Grid>
		<Grid item xs={6} container justifyContent="flex-end">
		<Button variant="contained" color="primary" type="submit">
		 Next
		</Button>
		</Grid>
		</Grid>
		</form>
		</Container>
		</div>
	);
}

//export default CreateAccount;
