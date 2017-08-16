import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import _ from 'lodash';
import Folder from "./Folder";

class Folders extends Component {  
  render() {
  	const { nestedFolders, folders, depth } = this.props;
  	const { openedFolderId, topLevelFolders } = folders;
  	
  	const appliedFolders = nestedFolders || topLevelFolders;
    
    return (
      <div className="folders-root" style={{ marginLeft: `${15*depth}px`}}>
        {
        	_.map(appliedFolders, folder => {
	        	const opened = openedFolderId.get() === folder.id;
	        	
	        	return (
	        		<Folder
	        			opened={opened}
	        			folder={folder}
	        			key={folder.id}
	        		/>
	        	);
	        })
        }
      </div>
    );
  }
}

Folders.defaultProps = {
	depth: 0
};

export default inject('folders')(observer(Folders));
