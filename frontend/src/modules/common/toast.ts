import { toast } from 'react-toastify';

const successToast = {
	closeButton: false,
	type: toast.TYPE.SUCCESS,
	autoClose: 2000,
	hideProgressBar: true,
};

const errorToast = {
	closeButton: false,
	type: toast.TYPE.ERROR,
	autoClose: 2000,
	hideProgressBar: true,
};

const messageToast = {
	closeButton: false,
	type: toast.TYPE.INFO,
	position: toast.POSITION.TOP_CENTER,
	autoClose: 5000,
	hideProgressBar: true,
};

export { successToast, errorToast, messageToast };
