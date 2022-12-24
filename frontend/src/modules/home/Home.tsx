import { Grid, Title } from '@mantine/core';
import Question from '../question/Question';

const Home = () => {
	return (
		<>
			<Title align='center'>Frequently Asked Questions</Title>
			<Grid>
				<Grid.Col md={6} className='mx-auto' mt={'lg'}>
					<Question />
				</Grid.Col>
			</Grid>
		</>
	);
};

export default Home;
