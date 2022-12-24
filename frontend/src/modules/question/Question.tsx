import { Button, Card, Group, Modal, TextInput, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UseUserInfo } from '../../context/UserInfo.context';
import api from '../api/api';
import { errorToast, successToast } from '../common/toast';

const Question = () => {
	const [questionList, setQuestionList] = useState<any>();
	const [opened, setOpened] = useState(false);
	const [question, setQuestion] = useState<string>('');

	const { id } = UseUserInfo();

	const navigate = useNavigate();

	const loadData = async () => {
		try {
			const res = await api.get('/getQuestion');
			setQuestionList(res?.data?.data);
		} catch (err: any) {
			toast(err, errorToast);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	const saveQuestion = async (question: any) => {
		if (question) {
			const res = await api.post('/questionStore', question);
			toast(res.data.message, successToast) && loadData();
		} else {
			toast('Please enter valid Question', errorToast);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newQuestion = { questions: question, created_by: id };
		saveQuestion(newQuestion);
		setOpened(false);
		setQuestion('');
	};

	const QuestionModal = (
		<Modal
			opened={opened}
			onClose={() => setOpened(false)}
			title='Please ask your Question'
		>
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

	const handleClick = (e: any) => {
		const id = e.id;
		const question = { name: e.questions, created_by: e.created_by };
		navigate(`/question/${id}`, { state: question });
	};

	return (
		<>
			<Group position='right' mb={'md'}>
				<Button className='bg-blue-500' onClick={() => setOpened(true)}>
					Ask Question
				</Button>
			</Group>
			<ul className='h-3/4 overflow-auto'>
				{questionList?.map((v: any) => {
					return (
						<li
							key={v.id}
							className='cursor-pointer mb-2'
							onClick={() => handleClick(v)}
						>
							<Card shadow='sm' p='lg' radius='md' withBorder>
								<Title order={4} className='capitalize'>
									{v.questions}
								</Title>
							</Card>
						</li>
					);
				})}
			</ul>
			{QuestionModal}
		</>
	);
};

export default Question;
