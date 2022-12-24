import { Header, Group, Button, Text } from '@mantine/core';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UseUserInfo } from '../../context/UserInfo.context';
import { successToast } from '../common/toast';

const TopBar = () => {
	const userInfo = UseUserInfo();
	const navigate = useNavigate();
    const name = userInfo?.name

	const logoutHandler = () => {
		sessionStorage.clear();
		toast('Successfully Logout', successToast);
		navigate('/auth');
	};

	return (
		<Header
			height={60}
			p='xs'
			className='text-2xl font-bold flex justify-between'
		>
			<Link to='/'>FAQ's</Link>
			<Group>
				<Text>{name}</Text>
				<Button className='bg-blue-500 float-right' onClick={logoutHandler}>
					Logout
				</Button>
			</Group>
		</Header>
	);
};

export default TopBar;
