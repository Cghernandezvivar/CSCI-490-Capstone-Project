import React, { useState, useEffect } from 'react';
import { Button, TextField,Container, Typography, styled, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { db, auth } from './firebaseConfig';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

function PostRecipe() {
	const [foodname, setFoodName] = useState(""); // Food Name
	const [ingredients, setIngredients] = useState(""); // Ingredients
	const [instructions, setInstructions] = useState(""); // Instructions
	const [userName, setUserName] = useState("Anonymous"); // Users Name
	const [error, setError] = useState("");


	useEffect(() => {
		const fetchUserName = async () => {
			if (auth.currentUser) {
				const userDocRef = doc(db, "users", auth.currentUser.uid);
				const userDoc = await getDoc(userDocRef);
				if (userDoc.exists()) {
					 setUserName(userDoc.data().name);
				} else {
					setUserName("Anonymous");
			       	  }
			}
		};

		fetchUserName();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
	try { 
		const docRef = await addDoc(collection(db, "recipes"), { 
			foodname,
			ingredients,
			instructions,
			createdAt: new Date(),
			userName: userName,
		});

		console.log("Document written with ID:", docRef.id);
		alert("Recipe submitted successfully!");
		            setFoodName("");
			    setIngredients("");
		            setInstructions("");
	} catch (error) {
		console.error("Error adding document:", error);
		            alert("Error submitting recipe.");
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
			"&:hover": {backgroundColor: "#D3DADC",},
		}
	);

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

		<Card 
		sx={{ 
			minWidth: 400, 
			width: "70%",
			maxWidth: 500,
			boxShadow: 3, 
			p: 2, 
			background: "#ededed"
		   }}
		>
		<CardContent>

		<Typography variant="h4" gutterBottom>
		 Post a recpie
		</Typography>

		<form onSubmit={handleSubmit}>

		<TextField
		label="Food Name:"
		type="text"
		variant="outlined"
		fullWidth
		margin="normal"
		value={foodname}
		onChange={(e) => setFoodName(e.target.value)}
		required
		/>

		<TextField
		label="Ingredients:"
		type="text"
		variant="outlined"
		fullWidth
		margin="normal"
		value={ingredients}
		onChange={(e) => setIngredients(e.target.value)}
		multiline
		rows={8}
		required
		/>

		<TextField
		label="Instructions:"
		type="text"
		variant="outlined"
		fullWidth
		margin="normal"
		value={instructions}
		onChange={(e) => setInstructions(e.target.value)}
		multiline
		rows={8}
		required
		/>

		{error && (
		<Typography color="error" variant="body2" style={{ margin: "10px" }}>
		{error}
		</Typography>
		)}

		<Button
		variant="contained"
		sx={{
			borderRadius: "30px",
			padding: "10px 30px",
			background: "#455763",
			"&:hover":{backgroundColor: "#D3DADC"}
		   }}
		type="submit"
		>
		 Submit
		</Button>

		<TopRightButton
		variant="contained"
		component={Link}
		to="/Profile"
		startIcon={<HomeIcon />}
		>
		 Profile
		</TopRightButton>

		</form>
		</CardContent>
		</Card>
		</Container>
		</div>
	);
}
export default PostRecipe;
