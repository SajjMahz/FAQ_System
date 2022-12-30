import { Grid, Card, TextInput, PasswordInput, Button, Title } from '@mantine/core';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { successToast } from '../common/toast';
import { Link, useNavigate } from 'react-router-dom';
import { callAxios } from '../../plugins/axios';

interface IUser {
	name: string;
	email: string;
	password: string;
}

const NewUser = () => {
	const [user, setUser] = useState<IUser>({
		name: '',
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const saveUser = async (data: IUser) => {
		const res = await callAxios({
			url: 'user',
			method: 'POST',
			data: data,
		});
		toast(res.data.message, successToast);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		saveUser(user);
		navigate('/auth');
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
					<div className='mt-4 hover:text-blue-500'>
						<Link to='/auth'>Go Back</Link>
					</div>
				</Card>
			</Grid.Col>
		</Grid>
	);
};

export default NewUser;