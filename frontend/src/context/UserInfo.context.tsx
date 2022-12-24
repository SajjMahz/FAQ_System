import { createContext,	ReactNode, useContext, useEffect, useState } from 'react';
import api from '../modules/api/api';

interface IUserInfoContext {
	id: number;
	name: string;
	email: string;
}

interface IUserInfoProviderProps {
	children: ReactNode;
}

const UserInfoContext = createContext({} as IUserInfoContext);

export const UseUserInfo = () => {
	return useContext(UserInfoContext);
};

export function UserInfoProvider({ children }: IUserInfoProviderProps) {
	const [userInfo, setUserInfo] = useState<IUserInfoContext>({
		id: 0,
		name: '',
		email: '',
	});

	const getUserInfo = async () => {
		const token = sessionStorage.getItem('USER_ACCESS_TOKEN');
		const accessToken = token;

		const res: any = await api.get('/getLoggedUser', {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				Authorization: accessToken !== null ? `Bearer ${accessToken}` : '',
			},
		});
		setUserInfo(res?.data?.getLoggedUserInfo);
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<UserInfoContext.Provider value={userInfo}>
			{children}
		</UserInfoContext.Provider>
	);
}
