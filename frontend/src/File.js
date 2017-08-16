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
			inputValue: props.file.name
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.file.name !== this.props.file.name) {
			this.setState({ inputValue: nextProps.file.name })
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
		this.props.files.updateFile(this.props.file.id, {
			title: this.state.inputValue
		});
		this.disableInput();
	}

	setOpenedFileId = () => {
		this.props.files.setOpenedFileId(this.props.file.id)
	}
  
  render() {
  	const { opened, inputValue, inputDisabled } = this.state;
    
    return (
    	<div>
    		<div className="folders-item">
					<Icon
	    			type={opened ? 'file' : 'file-text'}
	    			onClick={this.setOpenedFileId}
	    		/>
	    		<Input
	    			disabled={inputDisabled}
	    			value={inputValue}
	    			defaultValue={'File name'}
	    			onChange={this.onInputChange}
	    			onPressEnter={this.onInputPressEnter}
	    		/>
	    		<Icon
	    			type='edit'
	    			onClick={this.enableInput}
	    		/>
    		</div>
    		{ opened ? this.renderNestedFolders() : null }
    	</div> 
    );
  }
}

export default inject('files')(observer(Folder));
