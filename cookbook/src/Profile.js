import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Typography } from '@mui/material';


function Profile() {

	return (
		<div className="App">
		<h1>
		hello Profile Page
		</h1>

		<Link to="/PostRecipe" style={{ textDecoration: 'none' }}>
		<Button variant="contained" color="primary" type="submit">
		 Post Food
		</Button>
		</Link>

		<Link to="/PostedRecipe" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" type="submit">
		Look at Food
                </Button>
		</Link>

		</div>
	);
}
export default Profile;
