import { Grid, Card, TextInput, PasswordInput, Button, Title } from '@mantine/core';
import React, { useState } from 'react';
import api from '../api/api';
import {toast} from 'react-toastify'

const NewUser = () => {
	const [name, setName] = useState<any>('');
	const [email, setEmail] = useState<any>('');
	const [password, setPassword] = useState<any>('');

	const saveUser = async (data:any) => {
		const res:any = await api.post('/user', data)
		// console.log(res)
		toast(res.data.message)
	}

	const handleSubmit = (event: any) => {
		event.preventDefault();
		console.log(name, email, password);
		setName('');
		setEmail('');
		setPassword('');
		const data = {name, email, password}
		saveUser(data)
	};

	return (
		<>
			<Title align='center'>New User</Title>
			<Grid className='flex justify-center'>
				<Grid.Col md={4}>
					<Card shadow='sm' mt='lg' p='lg' radius='md' withBorder>
						<form onSubmit={handleSubmit}>
							<TextInput
								label='Name'
								placeholder='Name'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							<TextInput
								label='Email'
								placeholder='Email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
							<PasswordInput
								label='Password'
								placeholder='Password'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<Button mt='sm' className='bg-blue-500 float-right' type='submit'>
								Create
							</Button>
						</form>
					</Card>
				</Grid.Col>
			</Grid>
		</>
	);
};

export default NewUser;
