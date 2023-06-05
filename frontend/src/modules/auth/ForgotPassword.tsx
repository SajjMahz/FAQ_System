import { Grid, Title, Card, TextInput, Group, Button } from '@mantine/core';
import React, { useState } from 'react';
import { callAxios } from '../../plugins/axios';
import { toast } from 'react-toastify';
import { errorToast, successToast } from '../common/toast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
	const [email, setEmail] = useState<string>('');
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await callAxios({
				method: 'POST',
				url: 'forgot-password',
				data: { email },
			});
			if (res.data) {
				toast(res.data.status, successToast);
				navigate('/auth');
			} else {
				toast(res.response.data.error, errorToast);
			}
		} catch (error) {
			Promise.reject(error);
		}
	};

	return (
		<Grid>
			<Grid.Col md={4} className='mx-auto'>
				<Title align='center'>Forgot Password</Title>
				<Card shadow='sm' mt='lg' p='lg' radius='md' withBorder>
					<form onSubmit={handleSubmit}>
						<TextInput
							label='Email'
							placeholder='Email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
						<Group position='right' mt={'sm'}>
							<Button type='submit' className='bg-blue-500'>
								Submit
							</Button>
						</Group>
					</form>
				</Card>
			</Grid.Col>
		</Grid>
	);
};

export default ForgotPassword;
