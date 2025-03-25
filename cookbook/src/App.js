import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import PostRecipe from './PostRecipe';
import PostedRecipe from './PostedRecipe';
import Recipe from './Recipe';
import Messages from './Messages';
import MessageRoom from './MessageRoom';
import './App.css';

function App() {

	  return (
		  <Router>
		  <div className="App">
		  </div>
		  <Routes>
		  <Route path="/" element={<Home />} />
		  <Route path="/CreateAccount" element={<CreateAccount />} />
		  <Route path="/Login" element={<Login />} />
		  <Route path="/Profile" element={<Profile />} />
		  <Route path="/PostRecipe" element={<PostRecipe />} />
		  <Route path="/PostedRecipe" element={<PostedRecipe />} />
		  <Route path="/Recipe/:id" element={<Recipe />} />
		  <Route path="/Messages" element={<Messages />} />
		  <Route path="/MessageRoom/:userId" element={<MessageRoom />} />
		  </Routes>
		  </Router>
		    );
}

export default App;
