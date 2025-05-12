import React, {useState, useEffect} from 'react';
import { Button, Typography, styled, Container, TextField, Grid } from '@mui/material';
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
	
	const fallbackImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8gYk3kollZt_SA30MUbGp0vn66p8jsRIYbg&s";

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
	const StyledBox = styled("div")(
		{
			width: "400px",
			margin: "10px",
			padding: "10px",
			cursor: "pointer",
			backgroundColor: "#ededed",
			border: "1px solid #ccc", 
			borderRadius: "8px",
			boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
			textAlign: "center",
			transition: "0.3s",
			"&:hover":{backgroundColor: "ACB4BD",}
		}
	);

	const BoxImage = styled("img")({
		width: "100%",
		height: "200px",
		objectFit: "cover",
		borderRadius: "4px",
		marginBottom: "10px",
	});

	return (
		<div className="App">

		{/*Title*/}
		<h1>
		Recipe Book
		</h1>
	
		<Container 
		style={{ 
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			paddingTop: "30px",
			paddingBottom: "50px",
		      }}
		>	

		<Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginBottom: "20px" }}>
		<Grid item>
		{/*Filter Out Ingredient*/}
		<TextField
		label="Filter out Ingredient"
		variant="outlined"
		margin="normal"
		style={{
			width:"250px",
			height:"150"
		      }}
		value={searchIngredient}
		onChange={(e) => setSearchIngredient(e.target.value)}
		/>
		</Grid>

		{/*Filter byb Name*/}
		<Grid item>
		<TextField
		label="Filter by Name"
		variant="outlined"
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
		{/*Apply Filter Button*/}
		<Button 
		variant="contained"
		sx={{
			borderRadius: "30px",
			padding: "10px 30px",
			background: "#455763",
			"&:hover":{backgroundColor: "#D3DADC"}
		}}
		onClick={handleFilter}
		style={{ marginTop: "10px"}}
		>
		Apply Filters
		</Button>
		</Grid>
		<Grid item>
		{/*Clear Filter Button*/}
		<Button
		variant="contained"
		sx={{
			borderRadius: "30px",
			padding: "10px 30px",
			background: "#455763",
			"&:hover":{backgroundColor: "#D3DADC"}
		   }}
		onClick={handleClearFilters}
		style={{ marginTop: "10px"}}
		>
		Clear Filters
		</Button>
		</Grid>
		</Grid>
		<Grid container spacing={2} justifyContent="center">
		{filteredRecipes.length > 0 ? (
			filteredRecipes.map(recipe => (
				<Grid item key={recipe.id}>
				<StyledBox
				key={recipe.id}
				onClick={() => navigate(`/recipe/${recipe.id}`)}
				>		
				{/*Image displayed*/}
				<BoxImage
				src={recipe.imageURL || fallbackImage}
				alt={recipe.foodname}
				/>
				{/*Recipe Name*/}
				<Typography variant = "h6" component="div">
				{recipe.foodname}
				</Typography>
				</StyledBox>
				</Grid>
			))
		) : (
			<p>No recipes posted yet.</p>
		)}
		</Grid>

		{/*Back to Profile Button*/}
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
