import { Button, Title } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<div className='flex justify-end mt-1 mr-1'>
				<Link to={'/auth'}>
					<Button className='bg-blue-500 mr-1'>Login</Button>
        </Link>
        <Link to={'/new-user'}>
					<Button className='bg-blue-500'>Create User</Button>
				</Link>
			</div>
			<div>
				<Title align='center'>Question List</Title>
			</div>
		</>
	);
};

export default Home;
