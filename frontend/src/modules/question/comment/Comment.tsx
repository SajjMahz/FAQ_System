import { Button, Textarea } from '@mantine/core';
import React, { useState } from 'react';

const Comment = ({ qid }: any) => {
	const [comment, setComment] = useState<string>('');

	let Id = 1;

  const comments = [
    {
      qid: { qid },
      id: Id,
      comment: 'test comment 1',
    },
    {
      qid: { qid },
      id: ++Id,
      comment: 'test comment 2',
    },
  ];

  const [commentList, setCommentList] = useState<any>(comments)
  

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCommentList({...commentList, qid: { qid }, id: ++Id, comment: comment });
		setComment('');
	};


	return (
		<>
			<ul>
				{comments.map(v => {
					return <li key={v.id}>{v.comment}</li>;
				})}
			</ul>
			<form onSubmit={handleSubmit}>
				<Textarea
					placeholder='Your comment'
					label='Your comment'
					value={comment}
					onChange={e => setComment(e.target.value)}
					withAsterisk
					required
					autosize
				/>
				<Button className='bg-blue-500 mt-2 float-right' type='submit'>
					Add a Comment
				</Button>
			</form>
		</>
	);
};

export default Comment;
