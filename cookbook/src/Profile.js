import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


function Profile() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("userToken");
		navigate("/login");
	};

	return (
		<div className="App">
		<h1>
		 Profile Page
		</h1>

		<Link to="/PostRecipe" style={{ textDecoration: "none" }}>
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
		 Post Food
		</Button>
		</Link>

		<Link to="/PostedRecipe" style={{ textDecoration: "none" }}>
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
		 Look at Food
                </Button>
		</Link>

		<Link to="/Messages" style={{ textDecoration: "none" }}>
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
		 Messages
		</Button>
		</Link>
	
		<Button 
		variant="contained" 
		sx={{
			borderRadius: "30px",
			padding: "10px 30px",
			background: "#727F91",
			"&:hover":{backgroundColor: "#ACB4BD"}
		   }}
		onClick={handleLogout}
		>
		 logout
		</Button>

		</div>
	);
}
export default Profile;
