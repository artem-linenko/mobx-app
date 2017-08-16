import React, { Component } from 'react';
import { Button, Popconfirm } from 'antd';
import _ from 'lodash';
import { observer, inject } from "mobx-react";

class ButtonsSidebar extends Component {
	addFolder = () => {
		this.props.folders.addFolder();
	}

	addFile = () => {
		this.props.files.addFile();
	}

	removeFolder = () => {
		this.props.folders.removeFolder();
	}

	getRemoveButton(onClick) {
  	const { list, openedFolder } = this.props.folders;

		return (
	    <Button
    		type={'Primary'}
    		disabled={!list.length || !openedFolder}
    		onClick={onClick}
    	>
    		Remove
    	</Button>
		);
	}

	renderRemoveControl() {
  	const { openedFolder } = this.props.folders;

		if (openedFolder && !_.isEmpty(openedFolder.childrenIds)) {
			return (
				<Popconfirm
					onConfirm={this.removeFolder}
					title={'Are you sure want to remove this folder, all its nested folders and children?'}
					okText={'Yes'}
					cancelText={'No'}
				>
					{ this.getRemoveButton(()=>{}) }
				</Popconfirm>
			);
		}

		return this.getRemoveButton(this.removeFolder); 
	}
  
  render() {
  	const { openedFolder} = this.props.folders;
    
    return (
      <div className="buttons-sidebar-root">
      	<ul className="buttons-sidebar-list">
				  
				  <li className="buttons-sidebar-item">
	        	<Button
	        		type={'Primary'}
	        		disabled={openedFolder && !!openedFolder.parentId}
	        		onClick={this.addFolder}
	        	>
	        		Add folder
	        	</Button>
        	</li>

        	<li className="buttons-sidebar-item">
	        	<Button
	        		type={'Primary'}
	        		disabled={!(openedFolder && !!openedFolder.id)}
	        		onClick={this.addFile}
	        	>
	        		Add file
	        	</Button>
        	</li>

        	<li className="buttons-sidebar-item">
        		{ this.renderRemoveControl() }
        	</li>
        
        </ul>
      </div>
    );
  }
}

export default inject('folders', 'files')(observer(ButtonsSidebar));
