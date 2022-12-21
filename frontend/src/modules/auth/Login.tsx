import React, { useState } from 'react';

const Login = () => {
	const [name, setName] = useState<any>('');

	const handleSubmit = (event: any) => {
		event.preventDefault();
		console.log(name);
		setName('');
	};

	return (
		<>
			<div className='font-bold text-center text-2xl'>Login</div>
			<form className='flex justify-center pt-5' onSubmit={handleSubmit}>
				<div className='box-content h-96 w-96 p-4 border-4 shadow-xl bg-gray-200'>
					<label>Name </label>
					<input className='border-solid border border-black' type='text' value={name} onChange={e => setName(e.target.value)} />
				</div>
			</form>
		</>
	);
};

export default Login;
