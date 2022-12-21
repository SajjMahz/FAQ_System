import { Grid, Card, TextInput, Button, Title } from '@mantine/core';
import React, { useState } from 'react';

const NewUser = () => {
	const [name, setName] = useState<any>('');
	const [email, setEmail] = useState<any>('');
	const [password, setPassword] = useState<any>('');

	const handleSubmit = (event: any) => {
		event.preventDefault();
		console.log(name, email, password);
		setName('');
		setEmail('');
		setPassword('');
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
							<TextInput
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
