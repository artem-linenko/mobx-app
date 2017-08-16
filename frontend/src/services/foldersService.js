import axios from 'axios';


// const serverURL = 'http://localhost:3001';
const client = axios.create({
	baseURL: 'http://localhost:3001'
});

const foldersService = {
	getFolders() {
		return client
			.get('/directories')
			.then(res => res.data)
			.catch(err => { throw err });
	},

	addFolder(parentId, name) {
		return client
			.post('/directories', {
				parentId, name
			})
			.then(res => res.data)
			.catch(err => { throw err });
	},

	updateFolder(folder) {
		return client
			.put(`/directories/${folder.id}`, {
				...folder
			})
			.then(res => res.data)
			.catch(err => { throw err });
	},

	removeFolder(folderId) {
		return client
			.delete(`/directories/${folderId}`)
			.then(res => res.data)
			.catch(err => { throw err });
	}
};

export default foldersService;