import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Typography, Grid } from '@mui/material';

export default function CreateAccount() {
	const [name, setName] = useState(''); // Name
	const [lastname, setLastName] = useState(''); // LastName
	const [email, setEmail] = useState(''); // Email
	const [password, setPassword] = useState(''); // Password
	const [confirmpassword, setConfirmPassword] = useState(''); // ConfirmPassword
	const navigate = useNavigate(); 

	const handleCreateAccount = async (event) => {
		event.preventDefault();
	if (password !== confirmpassword)
		{
			alert("Passwords do not match");
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
		<Grid container spacing={2}>
		<Grid item xs={6}>
		<TextField
			
			label="Name"
		        type="text"
	                variant="outlined"
        	        fullWidth
	                margin="normal"
	                value={name}
	                onChange={(e) => setName(e.target.value)}
		 />
		</Grid>
	        <Grid item xs={6}>
		<TextField
			label="Lastname"
	                type="text"
			variant="outlined"
	                fullWidth
			margin="normal"
			value={lastname}
			onChange={(e) => setLastName(e.target.value)}
                 />
		</Grid>
		</Grid>
		<TextField
			label="Email"
		        type="email"
		        variant="outlined"
		        fullWidth
		        margin="normal"
	     	        value={email}
		        onChange={(e) => setEmail(e.target.value)}
		/>
		<Grid container spacing={2}>
		<Grid item xs={6}>
		<TextField
		        label="Password"
		        type="tel"
		        variant="outlined"
		        fullWidth
		        margin="normal"
	                value={password}
       	                onChange={(e) => setPassword(e.target.value)}
		/>
		</Grid>
		<Grid item xs={6}>
		<TextField
			label="Confirm Password"
			type="tel"
	                variant="outlined"	
			fullWidth
			margin="normal"
			value={confirmpassword}
	                onChange={(e) => setConfirmPassword(e.target.value)}
		/>
		</Grid>
		</Grid>
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
		<Link to="/Profile" style={{ textDecoration: 'none' }}>
		<Button variant="contained" color="primary" type="submit">
		 Next
		</Button>
		</Link>
		</Grid>
		</Grid>
		</form>
		</Container>
		</div>
	);
}

//export default CreateAccount;
