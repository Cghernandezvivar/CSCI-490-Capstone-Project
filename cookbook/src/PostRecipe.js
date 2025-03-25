import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
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
		rows={10}
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
		rows={10}
		required
		/>

		{error && (
		<Typography color="error" variant="body2" style={{ margin: "10px" }}>
		{error}
		</Typography>
		)}

		<Grid container spacing={2} justifyContent="space-between">

		<Grid item xs={6}>
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
		 Submit
		</Button>
		</Grid>

		<Grid item xs={6} container justifyContent="flex-end">
		
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
		</Grid>

		</Grid>
		
		</form>
		</Container>
		</div>
	);
}
export default PostRecipe;
