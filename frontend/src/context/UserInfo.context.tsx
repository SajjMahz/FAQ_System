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
		const res: any = await api.get('/getLoggedUser');
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
