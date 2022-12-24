import { AppShell } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import QuestionDetail from '../question/QuestionDetail';
import { UserInfoProvider } from '../../context/UserInfo.context';
import TopBar from '../partials/TopBar';

const HomeRoute = () => {
	return (
		<UserInfoProvider>
			<AppShell className='h-full overflow-y-hidden' header={<TopBar />}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/question/:id' element={<QuestionDetail />} />
				</Routes>
			</AppShell>
		</UserInfoProvider>
	);
};

export default HomeRoute;
