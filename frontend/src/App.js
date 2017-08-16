import React, { Component } from 'react';
import { inject } from "mobx-react";
import './App.css';
import ButtonsSidebar from'./ButtonsSidebar.js';
import Folders from'./Folders.js';
import Files from'./Files.js';

class App extends Component {
	componentDidMount() {
    this.props.folders.getFolders();
		this.props.files.getFiles();
	}
  
  render() {

    return (
      <div className="app-root">
        <ButtonsSidebar />
        <div className="folders-container">
	        <Folders />
        </div>
        <div className="files-container">
          <Files />
        </div>
      </div>
    );
  }
}

export default inject('folders', 'files')(App);
