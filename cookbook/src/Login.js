import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig.js';

function Login() {
	 const [email, setEmail] = useState('');
         const [password, setPassword] = useState('');
	 const [error, setError] = useState('');
	 const navigate = useNavigate();

	 const handleLogin = async (event) => {
		 event.preventDefault();
		 setError('');
		 try { 
			 const userCredential = await signInWithEmailAndPassword(auth, email, password);
			 console.log('User signed in', userCredential);
			 navigate('/Profile');
		 } catch (err)
		 {
			 setError(err.message);
		 }
	 };

	        return (
			<div className="App">
			<h1>
			hello Login Page
			</h1>
			<Typography variant="h4" gutterBottom>
	                 Login to Your Account
			</Typography>
			<form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px' }}>

			<TextField
			label="Email"
	          	variant="outlined"
			fullWidth
		  	margin="normal"
			value={email}
			onChange={(e) => setEmail(e.target.value)} // Update username state
			required
			/>

			<TextField
			label="Password"
	          	type="password"
			variant="outlined"
			fullWidth
			margin="normal"
	          	value={password}
			onChange={(e) => setPassword(e.target.value)} // Update password state
			required
		        />

			<Button variant="contained" color="primary" type="submit">
			 Login
	                </Button>
			</form>
			</div>
		);
}
export default Login;
