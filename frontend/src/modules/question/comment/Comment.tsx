import { Button, Textarea } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UseUserInfo } from '../../../context/UserInfo.context';
import api from '../../api/api';
import { errorToast, successToast } from '../../common/toast';

const Comment = ({ qid, users }: any) => {
	const [comment, setComment] = useState<string>('');
	const [commentList, setCommentList] = useState<any>();
	const {id} = UseUserInfo()

	const loadData = async (question_id: any) => {
		try {
			const res = await api.get(`/getComment/${question_id}`);
			setCommentList(res?.data?.data);
		} catch (err: any) {
			toast(err, errorToast);
		}
	};

	useEffect(() => {
		loadData(qid);
	}, [qid]);

	// const creator = users?.find((v: any) => v.id === commentList[0]?.created_by)?.name;

	const saveComment = async (comment: any) => {
		try {
			const res = await api.post('commentStore', comment);
			toast(res.data.message, successToast) && loadData(qid);
		} catch (error) {
			toast('Please enter valid Comment', errorToast);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newComment = { question_id: qid, comment: comment, created_by: id };
		saveComment(newComment);
		setComment('');
	};

	return (
		<>
			<ul className='mb-4 ml-2 p-1'>
				{commentList?.map((v: any) => {
					return (
						<li key={v.id} className='border-solid border-b-2 mb-2'>
							{v.comment} - {users?.find((d: any) => d.id === v?.created_by)?.name}
						</li>
					);
				})}
			</ul>
			<form onSubmit={handleSubmit}>
				<Textarea
					placeholder='Enter your comment'
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
