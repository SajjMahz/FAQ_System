import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './modules/auth/Login';
import Home from './modules/home/Home';

function App() {
	return (
		<Routes>
			<Route path='/auth' element={<Login />} />
			<Route path='/' element={<Home />} />
		</Routes>
	);
}

export default App;
