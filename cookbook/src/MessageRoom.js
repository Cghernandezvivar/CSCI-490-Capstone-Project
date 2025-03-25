import React, { useState, useEffect } from 'react';
import { Button, TextField, Container } from '@mui/material'; 
import { useParams, Link } from 'react-router-dom';
import { db } from './firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, addDoc, query, where,orderBy, onSnapshot } from 'firebase/firestore'; 

function MessageRoom() {
	const { userId } = useParams();
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const auth = getAuth();
	const currentUser = auth.currentUser;

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
		const messagesRef = collection(db, "messages");
		const q = query(
			messagesRef,
			where("from", "in", [currentUser?.uid, userId]),
			where("to", "in", [currentUser?.uid, userId]),
			orderBy("timestamp", "asc")
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const fetchedMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

		<h1>Message with {user ? user.name : "Loading..."}</h1>

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

		<Button 
		variant="contained" 
		sx={{
			borderRadius: "30px",
			padding: "10px 30px",
			background: "#727F91",
			"&:hover":{backgroundColor: "#ACB4BD"}
		   }}
		onClick={sendMessage}
		>
		 Send Message
		</Button>

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
		</form>
		</Container>
		</div>
	);
}

export default MessageRoom;
