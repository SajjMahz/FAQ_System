import {
	Button,
	Card,
	Grid,
	Group,
	Modal,
	TextInput,
	Title,
} from '@mantine/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Question from '../question/Question';

const Home = () => {
	const [opened, setOpened] = useState(false);
	const [question, setQuestion] = useState<string>('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(question)
		setQuestion('')
	};

	const QuestionModal = (
		<Modal opened={opened} onClose={() => setOpened(false)}>
			<form onSubmit={handleSubmit}>
				<TextInput
					label='Question'
					placeholder='Enter your question'
					value={question}
					onChange={e => setQuestion(e.target.value)}
					required
				/>
				<Button className='bg-blue-500 mt-2 float-right' type='submit'>
					Submit
				</Button>
			</form>
		</Modal>
	);

	return (
		<>
			<div className='flex justify-end mt-1 mr-1'>
				<Link to={'/auth'}>
					<Button className='bg-blue-500 mr-1'>Login</Button>
				</Link>
				<Link to={'/new-user'}>
					<Button className='bg-blue-500'>Create User</Button>
				</Link>
			</div>
			<Group position='center'>
				<Button className='bg-blue-500' onClick={() => setOpened(true)}>
					Ask Question
				</Button>
			</Group>
			<Title align='center'>Question List</Title>
			<Grid>
				<Grid.Col md={8} className='mx-auto'>
					<Card shadow='sm' mt='lg' p='lg' radius='md' withBorder>
						<Question />
					</Card>
				</Grid.Col>
			</Grid>
			{QuestionModal}
		</>
	);
};

export default Home;
