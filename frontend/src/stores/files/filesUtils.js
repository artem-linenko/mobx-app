import _ from 'lodash';

export function processFoldersToMap(folders) {
	const map = {};
	const sortedFolders = _.sortBy(folders, 'id');

	_.forEach(sortedFolders, folder => {
		const children = _.filter(sortedFolders, { parentId: folder.id })
		folder.childrenIds = _.map(children, 'id');
		
		map[folder.id] = folder;
	});

	return map;
}

export function getTopLevelFolders(foldersMap) {
	return _.omitBy(foldersMap, folder => folder.parentId);
}
