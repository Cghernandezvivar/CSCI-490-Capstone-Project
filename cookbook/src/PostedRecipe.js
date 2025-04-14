import React, {useState, useEffect} from 'react';
import { Button, Typography, styled, Container, Card, CardContent, TextField, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function PostedRecipe() {
	const [recipes, setRecipes] = useState([]); // Recipe
	const [filteredRecipes, setFilteredRecipes] = useState([]); // Filtered Recipe
	const [searchIngredient, setSearchIngredient] = useState(""); // Search Ingredient 
	const [searchRecipe, setSearchRecipe] = useState(""); // Search Recipe Name
	const navigate = useNavigate();

	useEffect(() => {
		const fetchRecipes = async() => {
			try { 
				const querySnapshot = await getDocs(collection(db, "recipes"));
				const recipeList = querySnapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}));
				setRecipes(recipeList);
				setFilteredRecipes(recipeList);
			} catch (error) {
				console.error("Error fetching recipes:", error);
			}
		};
		fetchRecipes();
	}, []);

	const handleFilter = () => {
		let filtered = recipes;
		if(searchIngredient)
		{
			filtered = filtered.filter(recipe => !recipe.ingredients.toLowerCase().includes(searchIngredient.toLowerCase()));
		}
		if(searchRecipe)
		{
			filtered = filtered.filter(recipe => recipe.foodname.toLowerCase().includes(searchRecipe.toLowerCase()));
		}
		setFilteredRecipes(filtered);
	};
	
	const handleClearFilters = () => {
		setSearchIngredient("");
		setSearchRecipe("");
		setFilteredRecipes(recipes);
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
	const StyledCard = styled(Card)(
		{
			width: "300px",
			margin: "10px 30px",
			padding: "10px",
			cursor: "pointer",
			background: "#ededed",
			boxShadow: 3,
			display: "flex",
			felxDirection: "column",
			alignItems: "center",
			justifyCoontent: "center",
			textAlign: "center",
			"&:hover":{backgroundColor: "ACB4BD",}
		}
	);


	return (
		<div className="App">

		<h1>
		Recipe Book
		</h1>
	
		<Container 
		style={{ 
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh"
		      }}
		>	

		<Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginBottom: "20px" }}>
		<Grid item>
		<TextField
		label="Filter by Ingredient"
		varinat="outlined"
		margin="normal"
		style={{
			width:"250px",
			height:"150"
		      }}
		value={searchIngredient}
		onChange={(e) => setSearchIngredient(e.target.value)}
		/>
		</Grid>

		<Grid item>
		<TextField
		label="Filter by Name"
		varinat="outlined"
		margin="normal"
		style={{ 
			width:"250px", 
			height:"150" 
		      }}
		value={searchRecipe}
		onChange={(e) => setSearchRecipe(e.target.value)}
		/>
		</Grid>
		</Grid>
		
		<Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginBottom: "20px" }}>
		<Grid item>
		<Button 
		variant="contained"
		onClick={handleFilter}
		style={{ marginTop: "10px"}}
		>
		Apply Filters
		</Button>
		</Grid>
		<Grid item>
		<Button
		variant="contained"
		onClick={handleClearFilters}
		style={{ marginTop: "10px"}}
		>
		Clear Filters
		</Button>
		</Grid>
		</Grid>

		{filteredRecipes.length > 0 ? (
			filteredRecipes.map(recipe => (
				<StyledCard
				key={recipe.id}
				onClick={() => navigate(`/recipe/${recipe.id}`)}
				>
				<CardContent>
				<Typography varinat = "h6" component="div">
				{recipe.foodname}
				</Typography>
				</CardContent>
				</StyledCard>
			))
		) : (
			<p>No recipes posted yet.</p>
		)}
	
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
export default PostedRecipe;
