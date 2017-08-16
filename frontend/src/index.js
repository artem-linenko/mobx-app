import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import folders from './stores/folders/foldersStore.js';
import files from './stores/files/filesStore.js';
import { Provider } from 'mobx-react'
import { enableLogging } from 'mobx-logger';

enableLogging();

ReactDOM.render(
	<Provider
		folders={folders}
		files={files}
	>
		<App />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
