import React, {useState, useEffect} from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function PostedRecipe() {
	const [recipes, setRecipes] = useState([]); // Recipe
	const navigate = useNavigate();

	const fetchRecipes = async () => {
		try { 
			const querySnapshot = await getDocs(collection(db, "recipes"));
			const recipeList = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setRecipes(recipeList);
		} catch (error) {
			console.error("Error fetching recipes:", error);
		}
	};
	 useEffect(() => {
		  fetchRecipes();
		  }, []);
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
		 Posted Recpies
		</Typography>

		{recipes.length > 0 ? ( 
			recipes.map(recipe => (
			<Typography 
				key={recipe.id}
				sx={{
					cursor: "pointer",
					color: "blue",
					textDecoration: "underline",
					margin: "5px 0"
				   }}
				onClick={() => navigate(`/recipe/${recipe.id}`)}
			>
			{recipe.foodname} - by {recipe.userName || "Anonymous"}
			</Typography>
		))
		) : (
			<p>No recipes posted yet.</p>
		)}
		

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
export default PostedRecipe;
