import React, { useEffect, useState } from 'react';
import { Button, styled, Checkbox, FormControlLabel, TextField, List, ListItem, ListItemText, Card, CardContent, Typography, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, Link } from 'react-router-dom';
import { db } from './firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function RecipeDetail() {
	const { id } = useParams();
	const [recipe, setRecipe] = useState(null); // Recipe
	const [checkedIngredients, setCheckedIngredients] = useState({}); // Checked Ing. 
	const [comments, setComments] = useState([]); // Comments
	const [newComment, setNewComment] = useState(""); // NewComment
	const [userName, setUserName] = useState("Anonymous"); // User Name

	useEffect(() => {
		const fetchUserName = async () => {
			const auth = getAuth();
			if( auth.currentUser ) {
				const userDocRef = doc(db, "users", auth.currentUser.uid);
				const userDoc = await getDoc(userDocRef);
				if( userDoc.exists()) { 
					setUserName(userDoc.data().name);
				} else { 
					setUserName("Anonymous");
				}
			}
		};

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

		const fetchComments = async () => {
			try {
				const q = query(collection(db, "comments"), where("recipeId", "==", id));
				const querySnapshot = await getDocs(q);
				const commentsData = querySnapshot.docs.map(doc => doc.data());
				setComments(commentsData);
			} catch (error) { 
				console.error("Error fetching comments:", error);
			}
		};
		fetchUserName();
		fetchRecipe();
		fetchComments();
	}, [id]);


	const handleAddComment = async () => { 
		if (newComment.trim() === "")
		{
			return;
		}
		try {
			const username = userName;
			await addDoc(collection(db, "comments"), {
				recipeId: id,
				comment: newComment,
				userName: username,
				timestamp: new Date(),
			});
			setComments([...comments, { comment: newComment, userName: username }]);
			setNewComment("");
		} catch (error) {
			console.error("Error adding comments:", error);
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
	
	const handleCheck = (index) => { 
		setCheckedIngredients((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	    return (
		    <div className="App" 
		    style={{
			    display: "flex",
			    justifyContent: "center", 
			    padding: "40px"
		    	  }}
		    >
		    {recipe ? (
			    <Card 
			    sx={{ 
				    maxWidth: 800,
				    width: "100%", 
				    boxShadow: 3,
			            background: "#ededed"
			    	}}
			    >
			    <CardContent>
			  
			    {/*Recipe Name*/}
			    <Typography variant="h4" gutterBottom>
			    {recipe.foodname || "Unkown"}
			    </Typography>

			    {/*Users Name*/}
			    <Typography variant="subtitle1" gutterBottom>
			    By: {recipe.userName || "Anonymous"}
			    </Typography>

			    {/*Time Posted*/}
			    <Typography variant="subtitle1" gutterBottom>
			    {recipe.createdAt ? recipe.createdAt.toDate().toLocaleDateString() : "Unknown"}
			    </Typography>

			    {/*Image displayed*/}
			    {recipe.imageURL && (
				    <img
				    src={recipe.imageURL}
				    alt="Recipe"
				    style={{
					    width:"100%",
					    maxHeight:"400px",
					    objectFit:"cover",
				    	    marginTop: "20px",
					    borderRadius: "10px"
				    }}
				    />
			    )}

			    <Divider 
			    sx={{ 
				    marginY:2
			    	}}
			    />
			    
			    {/*Ingredients*/}
			    <Typography variant="h6">
			    Ingredients:
			    </Typography>

			    <div>
			    {recipe.ingredients.split("\n").map((ingredient, index) => (
				    <FormControlLabel
				    key={index}
				    control={
					    <Checkbox
					    checked={!!checkedIngredients[index]}
					    onChange={() => handleCheck(index)}
					    />
				    }
				    label={ingredient.trim()}
				    />
			    ))}
			    </div>

			    <Divider
			    sx={{
				    marginY:2
			    	}}
			    />

			    {/*Instructions*/}
			    <Typography variant="h6">
			    Instructions:
			    </Typography>
			    <ol
			    style={{
				    paddingLeft: "20px"
			    	  }}
			    >	

			    {recipe.instructions.split("\n").map((step, index) => (
		             <li key={index} style={{ marginBottom: "8px" }}>
				   <Typography> {step.trim()} </Typography>
			     </li>
			    ))}
			    </ol>

			    <Divider 
			    sx={{
				    marginY:2
			    	}}
			    />

			    {/*Comments*/}
			    <Typography variant="h6">
			    Comments: 
			    </Typography>
			    <List>
			    {comments.map((comment, index) => (
				    <ListItem key={index} alignItems="flex-start">
				    <ListItemText 
				    primary={comment.comment} 
				    secondary={`${comment.timestamp ? new Date(comment.timestamp.seconds * 1000).toLocaleString():""} by ${comment.userName|| "Anonymous"}`}				    
				    />
				    </ListItem>
			    ))}
			    </List>

			    {/*Comment Input*/}
			    <TextField
			    label="Add a comment"
			    variant="outlined"
			    value={newComment}
			    onChange={(e) => setNewComment(e.target.value)}
			    fullWidth
			    multiline
			    rows={3}
			    style={{ marinTop: 2, marginBottom: 1}}
			    />
			    {/*Post Comment Buttonn*/}
			    <Button 
			    variant="contained" 
			    sx={{
				    borderRadius: "30px",
				    padding: "10px 30px",
				    background: "#455763",
				   "&:hover":{backgroundColor: "#D3DADC"}
			        }}
			    onClick={handleAddComment}
			    >
			    Post Comment
			    </Button>
			   </CardContent>
			    </Card>
			    
		    ) : (
			    <p>Loading recipe details...</p>
		    )}

		    {/*Back to posted Recipe Page Button*/}
		    <TopRightButton
		    variant="contained"
		    component={Link}
		    to="/PostedRecipe"
		    startIcon={<ArrowBackIcon />}
		    >
		    back
		    </TopRightButton>
		    </div>
	    );
}

export default RecipeDetail;
