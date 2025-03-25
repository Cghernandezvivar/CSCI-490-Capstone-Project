import React, { useState, useEffect } from 'react';
import { Button, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function Messages() {
	const [accounts, setAccounts] = useState([]);
	const navigate = useNavigate();

	 useEffect(() => {
		 const fetchAccounts = async () => {
			 try {
				 const querySnapshot = await getDocs(collection(db, "users"));
				 const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
				 setAccounts(users);
			 } catch (error) {
				 console.error("Error fetching users:", error);
			 }
		 };
		 fetchAccounts();
	 }, []); 
	const handleUserClick = (userId) => {
		navigate(`/MessageRoom/${userId}`);
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
		 Messages
		</Typography>

		<Typography variant="h4" gutterBottom>
		 Users
		</Typography>

		{accounts.map((account, index) => (
			<Typography
			key={account.id} 
			style={{ 
				cursor: "pointer", 
				color: "blue", 
				textDecoration: "none",
				margin: "5px 0"
			      }}
			onClick={() => handleUserClick(account.id)}
			>
			{account.name}
			</Typography>
		))}
		


		<Link to="/Profile" style={{ textDecoration: "none" }}>
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
		 Profile
		</Button>
		</Link>

		</Container>
		</div>
		);
}
export default Messages;
