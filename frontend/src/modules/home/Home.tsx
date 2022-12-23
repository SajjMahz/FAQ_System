import { Button, Grid, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import Question from '../question/Question';

const Home = () => {
	// const [user, setUser] = useState<any>()

	// const loadUsers = async () => {
	// 	try {
	// 		const res = await api.get('/getUser')
	// 		// setUser(res?.data.users)
	// 		console.log(res?.data.users)
	// 	} catch (err:any) {
	// 		toast(err, errorToast)
	// 	}
	// }

	// useEffect(()=>{
	// 	loadUsers()
	// },[])

	return (
		<>
			<div className='flex justify-end mt-1 mr-1'>
				<Link to={'/auth'}>
					<Button className='bg-blue-500 mr-1'>Login</Button>
				</Link>
			</div>
			<Title align='center' mt={'lg'}>
				Frequently Asked Questions
			</Title>
			<Grid>
				<Grid.Col md={6} className='mx-auto' mt={'lg'}>
					<Question />
				</Grid.Col>
			</Grid>
		</>
	);
};

export default Home;
