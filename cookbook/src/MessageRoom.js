import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, styled } from '@mui/material'; 
import { useParams, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { db } from './firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore'; 

function MessageRoom() {
	const { userId } = useParams();
	const [user, setUser] = useState(null); // User
	const [message, setMessage] = useState(""); // Message
	const [messages, setMessages] = useState([]); // Messages
	const auth = getAuth(); // Auth
	const currentUser = auth.currentUser; // Current User

	useEffect(() => {

		const fetchUser = async () => {
			try { 	
				const querySnapshot = await getDocs(collection(db, "users"));
				const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
				const selectedUser = users.find(u => u.id === userId);
				setUser(selectedUser);
			    } catch (error) {
					console.error("Error fetching user:", error);
		            }
		};
		fetchUser();
	}, [userId]);
	
	useEffect(() => {

		if(!currentUser?.uid || !userId) {
			return;
		}
		const messagesRef = collection(db, "messages");
		const q = query( 
			messagesRef, 
			where("from", "in", [currentUser?.uid, userId]), 
			where("to", "in", [currentUser?.uid, userId]), 
			orderBy("timestamp", "asc")
		);

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
		const fetchedMessages = querySnapshot.docs.map(doc => ({ 
			id: doc.id, 
			...doc.data() 
		}));
		setMessages(fetchedMessages);
		});
		
		return () => unsubscribe();
	}, [userId, currentUser]);

	const handleMessageChange = (e) => {
		setMessage(e.target.value);
	};
	
	const sendMessage = async () => {
			if (user && message.trim()) {
			 try {
				 await addDoc(collection(db, "messages"), {
					 from: currentUser.uid,
					 to: user.id,
					 message: message,
					 timestamp: new Date(),
				 });
				 setMessage("");
				 alert("Message sent!");
			 } catch (error) {
				 console.error("Error sending message:", error);
			 }
		} else {
			alert("Please enter a message.");
		}
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
			"&:hover":{backgroundColor: "#D3DADC",},
		}
	);

	return (
		<div className="App">

		{/*Title*/}
		<h1>Message with {user ? user.name : "Loading..."}</h1>

		<Container
		style={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-start",
			alignItems: "center",
			height: "100vh",
			padding: "20px"
		      }}
		>

		<div
		style={{
			width: "100%",
			maxWidth: "400px",
			border: "1px solid #ddd",
			padding: "10px",
			borderRadius: "10px",
			overflowY: "auto",
			maxHeight: "300px",
			marginBottom: "10px"
		      }}
		>
		
		{messages.length > 0 ? (
		    messages.map((msg) => (
		        <p key={msg.id} style={{ textAlign: msg.from === currentUser.uid ? "right" : "left" }}>
			    <strong>{msg.from === currentUser.uid ? "You" : user?.name}:</strong> {msg.message}
			</p>
		    ))
		) : (
			<p>No messages yet</p>
		)}
		</div>

		<form onSubmit={handleMessageChange} style={{ width: "100%", maxWidth: "400px" }}>

		{/*Message Input*/}
		<TextField
		label="Message"
		type="text"
		variant="outlined"
		fullWidth
		margin="normal"
		value={message}
		onChange={handleMessageChange}
		required
		/>

		{/*Send Button*/}
		<Button 
		variant="contained" 
		sx={{
			borderRadius: "30px",
			padding: "10px 30px",
			background: "#455763",
			"&:hover":{backgroundColor: "#D3DADC"}
		   }}
		onClick={sendMessage}
		>
		 Send Message
		</Button>

		{/*Back to Messages Button*/}
		<TopRightButton
		variant="contained"
		component={Link}
		to="/Messages"
		startIcon={<ArrowBackIcon />}
		>
		 back
		</TopRightButton>


		</form>
		</Container>
		</div>
	);
}

export default MessageRoom;
