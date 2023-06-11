import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Comment from './comment/Comment';
import { Button, Grid, Group, Paper, Title, Tooltip } from '@mantine/core';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { successToast } from '../common/toast';
import { callAxios } from '../../plugins/axios';

const QuestionDetail = () => {
	const { id } = useParams();
	const { state } = useLocation();
	const question = state;
	const [users, setUsers] = useState<any[]>([]);
	const [vote, setVote] = useState<number>(0);
	const [vote_status, setVote_status] = useState<string>('');

	const getAllUsers = async () => {
		const res = await callAxios({
			url: 'user',
			method: 'GET',
		});
		setUsers(res?.data?.users);
	};

	const getVote = async (id: string | undefined) => {
		const res = await callAxios({
			url: `question/show/${id}`,
			method: 'GET',
		});
		const data = res?.data?.data[0];
		setVote(data.vote ?? 0);
		setVote_status(res?.data?.vote_status ?? '')
	};

	useEffect(() => {
		getAllUsers();
		getVote(id);
	}, [id]);

	const handleCounter = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const qId = e.currentTarget.id;
		if (qId === 'up_vote') {
			const res = await callAxios({
				url: `question/vote/${id}`,
				method: 'POST',
				data: { vote: 'U' },
			});
			toast(res?.data?.message, successToast);
			getVote(id);
		} else {
			const res = await callAxios({
				url: `question/vote/${id}`,
				method: 'POST',
				data: { vote: 'D' },
			});
			toast(res?.data?.message, successToast);
			getVote(id);
		}
	};

	const creator = users?.find(v => v.id === question.created_by)?.name;

	return (
		<Paper shadow='lg' className='h-full '>
			<Grid className='justify-center'>
				<Grid.Col md={5}>
					<Group position='left' className='gap-0 ml-[-45px]'>
						<div>
							<div className='flex flex-col items-center'>
								<Tooltip label='UpVote'>
									<Button
										variant='outline'
										id='up_vote'
										className='text-black border-none'
										onClick={handleCounter}
									>
										<BiUpArrow size={20} className={vote_status === 'U'? 'fill-red-600' : ''}/>
									</Button>
								</Tooltip>
								<div>{vote}</div>
								<Tooltip label='DownVote'>
									<Button
										variant='outline'
										id='down_vote'
										className='text-black border-none'
										onClick={handleCounter}
									>
										<BiDownArrow size={20} className={vote_status === 'D'? 'fill-blue-500' : ''}/>
									</Button>
								</Tooltip>
							</div>
						</div>
						<div>
							<Title className='capitalize'>{question.name}</Title>
							<div className='mb-2'>
								<span>Created by: {creator}</span>
							</div>
						</div>
					</Group>
					<Comment qid={id} users={users} />
				</Grid.Col>
			</Grid>
		</Paper>
	);
};

export default QuestionDetail;