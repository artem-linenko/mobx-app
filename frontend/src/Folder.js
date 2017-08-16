import React, { Component } from 'react';
import { Icon, Input } from 'antd';
import _ from 'lodash';
import { observer, inject } from "mobx-react";
import Folders from "./Folders";

class Folder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputDisabled: true,
			inputValue: props.folder.name
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.folder.name !== this.props.folder.name) {
			this.setState({ inputValue: nextProps.folder.name })
		}
	}

	disableInput = () => {
		if (!this.state.inputDisabled) {
			this.setState({
				inputDisabled: true
			});
		}
	}

	enableInput = () => {
		if (this.state.inputDisabled) {
			this.setState({
				inputDisabled: false
			});
		}
	}

	onInputChange = (e) => {
		this.setState({
			inputValue: e.target.value
		})
	}
	
	onInputPressEnter = () => {
		this.props.folders.updateFolder(this.props.folder.id, {
			title: this.state.inputValue
		});
		this.disableInput();
	}

	setOpenedFolderId = () => {
		this.props.folders.setOpenedFolderId(this.props.folder.id)
	}
  
  isFolderOpened() {
  	const { opened, folders, folder } = this.props;
  	const { childrenIds } = folder;

  	if (opened) {
  		return true;
  	}
  	
  	if (opened && _.isEmpty(childrenIds)) {
  		return true;
  	}

  	if (!opened && !_.isEmpty(childrenIds)) {
  		return _.includes(childrenIds, folders.openedFolderId.get());
  	}

  	return false;
  }
  
  renderNestedFolders() {
  	const { folders, folder } = this.props;
  	const nestedFoldersIds = folder.childrenIds;
  	const nestedFolders = _.map(nestedFoldersIds, id => folders.map[id]);

  	return nestedFolders.length ? (
  		<Folders
  			nestedFolders={nestedFolders}
  			depth={1}
  		/>
  	) : null;
  }
  
  render() {
  	const { inputValue, inputDisabled } = this.state;
  	const isFolderOpened = this.isFolderOpened();
    
    return (
    	<div>
    		<div className="folders-item">
					<Icon
	    			type={isFolderOpened ? 'folder-open' : 'folder'}
	    			onClick={this.setOpenedFolderId}
	    		/>
	    		<Input
	    			disabled={inputDisabled}
	    			value={inputValue}
	    			defaultValue={'Please enter folder name'}
	    			onChange={this.onInputChange}
	    			onPressEnter={this.onInputPressEnter}
	    		/>
	    		<Icon
	    			type='edit'
	    			onClick={this.enableInput}
	    		/>
    		</div>
    		{ this.isFolderOpened() ? this.renderNestedFolders() : null }
    	</div> 
    );
  }
}

export default inject('folders')(observer(Folder));
