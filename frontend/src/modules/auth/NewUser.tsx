import { Grid, Card, TextInput, PasswordInput, Button, Title } from '@mantine/core';
import React, { useState } from 'react';
import api from '../api/api';
import {toast} from 'react-toastify'
import { successToast } from '../common/toast';

const NewUser = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const saveUser = async (data: any) => {
		const res: any = await api.post('/user', data);
		toast(res.data.message, successToast);
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		saveUser(user);
		setUser({ name: '', email: '', password: '' });
	};

	return (
		<Grid>
			<Grid.Col md={4} className='mx-auto'>
				<Title align='center'>New User</Title>
				<Card shadow='sm' mt='lg' p='lg' radius='md' withBorder>
					<form onSubmit={handleSubmit}>
						<TextInput
							label='Name'
							placeholder='Name'
							value={user.name}
							onChange={e => setUser({ ...user, name: e.target.value })}
							required
						/>
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
							Create
						</Button>
					</form>
				</Card>
			</Grid.Col>
		</Grid>
	);
};

export default NewUser;
