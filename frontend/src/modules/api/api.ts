import axios from 'axios';

const token = sessionStorage.getItem('USER_ACCESS_TOKEN');
const accessToken = token;

export default axios.create({
	baseURL: 'http://127.0.0.1:8000/api/',
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		Authorization: accessToken !== null ? `Bearer ${accessToken}` : '',
	},
});