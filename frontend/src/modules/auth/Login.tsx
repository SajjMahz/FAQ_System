import {
	Card,
	Title,
	TextInput,
	Grid,
	Button,
	PasswordInput,
} from '@mantine/core';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/api';
import { errorToast, successToast } from '../common/toast';

const Login = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const getLogin = async (user: any) => {
		const res: any = await api.post('/login', user);
		const data = res?.data;
		if (data.token) {
			toast('Successfully login', successToast) && navigate('/');
			sessionStorage.setItem('USER_ACCESS_TOKEN', data.token);
		} else {
			toast('Login Failed', errorToast);
		}
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		getLogin(user);
		setUser({ email: '', password: '' });
	};

	return (
		<Grid>
			<Grid.Col md={4} className='mx-auto'>
				<Title align='center'>Login</Title>
				<Card shadow='sm' mt='lg' p='lg' radius='md' withBorder>
					<form onSubmit={handleSubmit}>
						<TextInput
							label='Email'
							placeholder='Email'
							value={user.email}
							onChange={e => setUser({ ...user, email: e.target.value })}
							required
						/>
						<PasswordInput
							label='Password'
							placeholder='Password'
							value={user.password}
							onChange={e => setUser({ ...user, password: e.target.value })}
							required
						/>
						<Button mt='sm' className='bg-blue-500 float-right' type='submit'>
							Login
						</Button>
					</form>
					<div className='mt-4 hover:text-blue-500'>
						<Link to='/new-user'>Don't have an Account?</Link>
					</div>
				</Card>
			</Grid.Col>
		</Grid>
	);
};

export default Login;
