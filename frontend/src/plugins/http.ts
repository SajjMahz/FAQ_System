export const isToken = () => {
	const auth = !!sessionStorage.getItem('USER_ACCESS_TOKEN');
	return auth;
};
