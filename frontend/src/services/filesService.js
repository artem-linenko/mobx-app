import axios from 'axios';


// const serverURL = 'http://localhost:3001';
const client = axios.create({
	baseURL: 'http://localhost:3001'
});

const filesService = {
	getFiles() {
		return client
			.get('/notices')
			.then(res => res.data)
			.catch(err => { throw err });
	},

	addFile(directoryId, name) {
		return client
			.post('/notices', {
				directoryId, name
			})
			.then(res => res.data)
			.catch(err => { throw err });
	},

	updateFile(file) {
		return client
			.put(`/notices/${file.id}`, {
				...file
			})
			.then(res => res.data)
			.catch(err => { throw err });
	},

	removeFile(fileId) {
		return client
			.delete(`/notices/${fileId}`)
			.then(res => res.data)
			.catch(err => { throw err });
	}
};

export default filesService;