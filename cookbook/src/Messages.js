import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, styled } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function Messages() {
	const [accounts, setAccounts] = useState([]); // Accounts
	const navigate = useNavigate();
	const auth = getAuth();
	const currentUser = auth.currentUser;

	 useEffect(() => {
		 const fetchAccounts = async () => {
			 try {
				 const querySnapshot = await getDocs(collection(db, "users"));
				 const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
				 const filteredUsers = users.filter(user => user.id !== currentUser?.uid);
	
				 setAccounts(filteredUsers)
			 } catch (error) {
				 console.error("Error fetching users:", error);
			 }
		 };
		 fetchAccounts();
	 }, [currentUser]); 
	const handleUserClick = (userId) => {
		navigate(`/MessageRoom/${userId}`);
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
		Messages
		</h1>
		
		<Container 
		style={{ 
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-start",
			alignItems: "center",
			height: "100vh",
			paddingTop: "20px"
		      }}
		>
		
		{accounts.map((account, index) => (
			<Typography
			key={account.id}
			style={{
				cursor: "pointer",
				borderRadius: "30px",
				padding: "10px 30px",
				background: "#455763",
				color: "#fff",
				textDecoration: "none",
				margin: "5px 0",
				maxWidth: "200px",
				textAlign: "center"
			}}
			onClick={() => handleUserClick(account.id)}
			>
			{account.name}
			</Typography>
		))}

		<TopRightButton 
		variant="contained" 
		component={Link} 
		to="/Profile" 
		startIcon={<HomeIcon />}
		>
		 Profile
		</TopRightButton>

		</Container>		
		</div>
		);
}
export default Messages;
