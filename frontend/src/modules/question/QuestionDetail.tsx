import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Comment from './comment/Comment';
import { Grid, Group, Paper, Title, Tooltip } from '@mantine/core';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';

const QuestionDetail = () => {
	const { id } = useParams();
	const { state }: any = useLocation();
	const question = state;
	const [counter, setCounter] = useState({ up: 0, down: 0 });

	return (
		<Paper shadow='lg' className='h-full '>
			<Grid className='justify-center'>
				<Grid.Col md={5}>
					<Title className='capitalize'>
						{/* {id} :*/} {question}
					</Title>
					<Group className='flex justify-between mb-2'>
						<span>Created by:</span>
						<span>Date:</span>
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
					<Comment qid={id} />
				</Grid.Col>
			</Grid>
		</Paper>
	);
};

export default QuestionDetail;
