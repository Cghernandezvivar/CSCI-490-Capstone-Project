import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, styled, } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


function Profile() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("userToken");
		navigate("/login");
	};

	const TopRightButton = styled(Button)(
		{
			position: "absolute",
			top: "20px",
			right: "20px",
			borderRadius: "30px",
			padding: "10px 30px",
			backgroundColor: "#455763",
			color: "#fff",
			"&:hover": {backgroundColor: "#D3DADC",},
		}
	);
	 return (
		<div className="App">
		<h1>
		 PROFILE
		</h1>

		 <Box 
		 sx={{ 
			display: "flex", 
			justifyContent: "center", 
			gap: "20px", 
			marginTop: "20px"
		 }}
		 >
		{/*Button to Post Recipe*/}
		<Link to="/PostRecipe" style={{ textDecoration: "none" }}>
		<Button 
		variant="contained" 
		sx={{ 
			width: "400px",
			height: "400px",
			borderRadius: "20px", 
			padding: "0px",  
			backgroundImage: "url('/PostRecipePIC.jpg')",
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			color: "#fff",
			fontWeight: "bold",
			fontSize: "25px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			textAlign: "center",
			"&:hover":{opacity: 0.8} 
		    }} 
		type="submit"
		>
		 Post Food
		</Button>
		</Link>

		{/*Button to Look at food*/}
		<Link to="/PostedRecipe" style={{ textDecoration: "none" }}>
                <Button 
		variant="contained" 
		sx={{
			width: "400px",
			height: "400px",
			borderRadius: "20px",
			padding: "0px",
			backgroundImage: "url('/PostedRecipePIC.jpg')",
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			color: "#fff",
			fontWeight: "bold",
			fontSize: "25px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			textAlign: "center",
			"&:hover":{opacity: 0.8}
		   }}
		type="submit"
		>
		 Look at Food
                </Button>
		</Link>

		{/*Button to Messages*/}
		<Link to="/Messages" style={{ textDecoration: "none" }}>
		<Button 
		variant="contained" 
		sx={{
			width: "400px",
			height: "400px",
			borderRadius: "20px",
			padding: "0px",
			backgroundImage: "url('/MessagePIC.jpg')",
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			color: "#fff",
			fontWeight: "bold",
			fontSize: "25px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			textAlign: "center",
			"&:hover":{opacity: 0.8}
		   }}
		type="submit"
		>
		 Messages
		</Button>
		</Link>
		</Box>
	
		{/*Button to Logout*/}
		<TopRightButton
		variant="contained"
		component={Link}
		to="/"
		onClick={handleLogout}
		startIcon={<LogoutIcon />}
		>
		Logout
		</TopRightButton>
		
		</div>
	);
}
export default Profile;
