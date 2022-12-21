import React from 'react';
import { useNavigate } from 'react-router-dom';

const Question = () => {
	const data = [
		{
			id: 1,
			question: 'How to find cheap deals?',
		},
		{
			id: 2,
			question: 'How to root phone?',
		},
	];
	const navigate = useNavigate();

	const handleClick = (e: any) => {
		const id = e.id;
        const question = e.question
		navigate(`/question/${id}`, {state: question});
	};

	return (
		<ul>
			{data.map(v => {
				return (
					<li
						key={v.id}
						className='border-solid border-b-2 cursor-pointer mb-2'
						onClick={() => handleClick(v)}
					>
						{v.question}
					</li>
				);
			})}
		</ul>
	);
};

export default Question;
