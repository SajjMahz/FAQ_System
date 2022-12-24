import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Comment from './comment/Comment';
import { Grid, Group, Paper, Title, Tooltip } from '@mantine/core';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import api from '../api/api';

const QuestionDetail = () => {
	const { id } = useParams();
	const { state }: any = useLocation();
	const question = state;
	const [users, setUsers] = useState<any[]>([]);
	const [counter, setCounter] = useState({ up: 0, down: 0 });

	const getAllUsers = async () => {
		const res = await api.get('/getUser');
		setUsers(res?.data?.users);
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	const creator = users?.find((v: any) => v.id === question.created_by)?.name;

	return (
		<Paper shadow='lg' className='h-full '>
			<Grid className='justify-center'>
				<Grid.Col md={5}>
					<Title className='capitalize'>
						{/* {id} :*/} {question.name}
					</Title>
					<Group className='mb-2'>
						<span>Created by: {creator}</span>
					</Group>
					<Group>
						<Tooltip label='UpVote'>
							<div
								className='cursor-pointer flex items-center'
								onClick={() => setCounter({ ...counter, up: counter.up + 1 })}
							>
								<BiUpArrow />
								{counter.up}
							</div>
						</Tooltip>
						<Tooltip label='DownVote'>
							<div
								className='cursor-pointer flex items-center'
								onClick={() => setCounter({ ...counter, down: counter.down + 1 })}
							>
								<BiDownArrow />
								{counter.down}
							</div>
						</Tooltip>
					</Group>
					<Comment qid={id} users={users} />
				</Grid.Col>
			</Grid>
		</Paper>
	);
};

export default QuestionDetail;
