import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material';

function RecipeDetail() {
	    const { id } = useParams();
	    const [recipe, setRecipe] = useState(null);
	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const docRef = doc(db, "recipes", id);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					setRecipe(docSnap.data());
				} else {
					console.error("No such document!");
				}
			} catch (error) {
				console.error("Error fetching recipe:", error);
			}
		};
		fetchRecipe();
	}, [id]);

	    return (
		    <div className="App">
		    {recipe ? (
			    <>
			    <h1>{recipe.foodName}</h1>
			    <h3>By: {recipe.userName || "Anonymous"}</h3>
			    <h4>Ingredients:</h4>
			    <ul>
			    {recipe.ingredients.split("\n").map((ingredient, index) => (
			     <li key={index}>{ingredient.trim()}</li>
			    ))}
			    </ul>

			    <h4>Instructions:</h4>
			    <ol>
			    {recipe.instructions.split("\n").map((step, index) => (
		             <li key={index}>{step.trim()}</li>
			    ))}
			    </ol>

			    </>
		    ) : (
			    <p>Loading recipe details...</p>
		    )}

		    <Link to="/PostedRecipe" style={{ textDecoration: "none" }}>
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
		     PostedRecipe		    
		    </Button>
		    </Link>
		    </div>
	    );
}

export default RecipeDetail;
