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
	// const [counterUp, setCounterUp] = useState(0);
	// const [counterDown, setCounterDown] = useState(0);
	const [counter, setCounter] = useState<number>(0);
	const [vote, setVote] = useState<number>(0);

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
		setVote(data.vote ?? 0)
		// setCounterUp(data.up_vote);
		// setCounterDown(data.down_vote);
	};

	useEffect(() => {
		getAllUsers();
		getVote(id);
	}, [id]);

	const handleCounter = (e: React.MouseEvent<HTMLButtonElement>) => {
		const {id} = e.currentTarget
		// id === 'up_vote' ? setCounter(1) : setCounter(-1)
		if(id === 'up_vote') {
			if(counter === 0) {
				setVote(vote+1)
				setCounter(1)
			} else {
				setVote(vote-1)
				setCounter(0)
			}
		} 
		else {
			if(counter === 0) {
				setVote(vote-1)
				setCounter(1)
			} else {
				setVote(vote+1)
				setCounter(0)
			}
		}
	}

	// const saveVote = async (con: number) => {
	// 	if (con === 1) {
	// 		const res = await callAxios({
	// 			url: `question/vote/${id}`,
	// 			method: 'POST',
	// 			data: {
	// 				up_vote: counterUp + 1,
	// 				down_vote: counterDown,
	// 			},
	// 		});
	// 		toast(res?.data?.message, successToast);
	// 	} else {
	// 		const res = await callAxios({
	// 			url: `question/vote/${id}`,
	// 			method: 'POST',
	// 			data: {
	// 				up_vote: counterUp,
	// 				down_vote: counterDown + 1,
	// 			},
	// 		});
	// 		toast(res?.data?.message, successToast);
	// 	}
	// 	getVote(id);
	// };

	const creator = users?.find(v => v.id === question.created_by)?.name;

	return (
		<Paper shadow='lg' className='h-full '>
			<Grid className='justify-center'>
				<Grid.Col md={5}>
					<Title className='capitalize'>{question.name}</Title>
					<Group className='mb-2'>
						<span>Created by: {creator}</span>
					</Group>
					<Group>
						<div className="flex flex-col items-center">
							<Button variant='outline' id='up_vote' className='text-black border-none' onClick={handleCounter}>
								<BiUpArrow size={20}/>
							</Button>
							<div>{vote}</div>
							<Button variant='outline' id='down_vote' className='text-black border-none' onClick={handleCounter}>
								<BiDownArrow size={20}/>
							</Button>
						</div>
						<Tooltip label='UpVote'>
							<div
								className='cursor-pointer flex items-center'
								// onClick={() => saveVote(1)}
							>
								<BiUpArrow />
								{/* {counterUp ? counterUp : 0} */}
							</div>
						</Tooltip>
						<Tooltip label='DownVote'>
							<div
								className='cursor-pointer flex items-center'
								// onClick={() => saveVote(2)}
							>
								<BiDownArrow />
								{/* {counterDown ? counterDown : 0} */}
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