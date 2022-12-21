import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './modules/auth/Login';
import Home from './modules/home/Home';
import NewUser from './modules/auth/NewUser';

function App() {
	return (
		<Routes>
			<Route path='/auth' element={<Login />} />
			<Route path='/' element={<Home />} />
			<Route path='/new-user' element={<NewUser />} />
		</Routes>
	);
}

export default App;
