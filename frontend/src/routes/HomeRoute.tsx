import { AppShell } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import Home from '../modules/home/Home';
import QuestionDetail from '../modules/question/QuestionDetail';
import { UserInfoProvider } from '../context/UserInfo.context';
import TopBar from '../modules/partials/TopBar';

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