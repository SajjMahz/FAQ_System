import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Comment from './comment/Comment';
import { Button, Grid, Paper, Textarea } from '@mantine/core';

const QuestionDetail = () => {
    const [comment, setComment] = useState<string>('')
	const { id } = useParams();
	const { state }: any = useLocation();
	const question = state;

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(comment)
        setComment('')
    }

	return (
		<Paper shadow='lg' className='h-96 '>
			<Grid className='justify-center'>
				<Grid.Col md={5}>
					<div className='font-bold'>
						{id} : {question}
					</div>
					<Comment qid={id} />
					<form onSubmit={handleSubmit}>
						<Textarea
							placeholder='Your comment'
							label='Your comment'
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)}
							withAsterisk
                            required
							autosize
						/>
                        <Button className='bg-blue-500 mt-2 float-right' type='submit'>Add a Comment</Button>
					</form>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};

export default QuestionDetail;
