import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './modules/auth/Login';
import Home from './modules/home/Home';
import NewUser from './modules/auth/NewUser';
import { AppShell, Header } from '@mantine/core';
import QuestionDetail from './modules/question/QuestionDetail';

function App() {
	return (
		<AppShell
			padding='md'
			header={
				<Header height={60} p='xs' className='text-lg font-bold'>
					<Link to='/'>FAQ System</Link>
				</Header>
			}
		>
			<Routes>
				<Route path='/auth' element={<Login />} />
				<Route path='/' element={<Home />} />
				<Route path='/new-user' element={<NewUser />} />
				<Route path='/question/:id' element={<QuestionDetail />} />
			</Routes>
		</AppShell>
	);
}

export default App;
