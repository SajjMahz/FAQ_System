import { Card, Title, TextInput, Grid, Button } from '@mantine/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	const [name, setName] = useState<any>('');
	const [email, setEmail] = useState<any>('');

	const handleSubmit = (event: any) => {
		event.preventDefault();
		console.log(name, email);
		setName('');
		setEmail('');
	};

	return (
		<Grid>
			<Grid.Col md={4} className='mx-auto'>
				<Title align='center'>Login</Title>
				<Card shadow='sm' mt='lg' p='lg' radius='md' withBorder>
					<form onSubmit={handleSubmit}>
						<TextInput
							label='Name'
							placeholder='Name'
							value={name}
							onChange={e => setName(e.target.value)}
							required
						/>
						<TextInput
							label='Email'
							placeholder='Email'
							value={email}
							onChange={e => setEmail(e.target.value)}
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
