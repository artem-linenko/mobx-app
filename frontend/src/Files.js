import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import _ from 'lodash';
import File from "./File";

class Files extends Component {  
  render() {
  	const { files } = this.props;
  	
    return (
      <div className="files-root">
        {
        	_.map(files.displayedFilesList, file => {
	        	const opened = files.openedFileId.get() === file.id;
	        	
	        	return (
	        		<File
	        			opened={opened}
	        			file={file}
	        			key={file.id}
	        		/>
	        	);
	        })
        }
      </div>
    );
  }
}

export default inject('files')(observer(Files));
