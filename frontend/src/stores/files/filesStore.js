import { observable, extendObservable, computed, action, useStrict, runInAction } from 'mobx';
import _ from 'lodash';
import filesService from '../../services/filesService';
import { processFoldersToMap } from './filesUtils';
import foldersStore from '../folders/foldersStore.js';

useStrict(true)

class Files {
  constructor() {
    extendObservable(this, {
      list: observable(
        []
      ),

      displayedFilesList: computed(
        () => _.filter(this.list, { directoryId: foldersStore.openedFolderId.get() })
      ),
      
      map: observable(
        {}
      ),
      
      openedFileId: observable.box(
        null
      ),

      openedFile: computed(
        () => this.map[this.openedFileId.get()]
      ),
      
      setOpenedFileId: action(
        function setOpenedFileId(fileId) {
         const newFileIdValue = this.openedFileId.get() === fileId ? null : fileId;
         this.openedFileId.set(newFileIdValue);
        }
      ),
      
      getFiles: action(
        async function getFiles() {
          const files = await filesService.getFiles();
          
          runInAction(() => {
            this.list.push(...files);
            this.map = processFoldersToMap(files);
          });
        }
      ),

      addFile: action(
        async function addFile() {
          const directoryId = foldersStore.openedFolderId.get();
          const title = null;
          
          const file = await filesService.addFile(directoryId, title);

          runInAction(() => {
            this.list.push(file);
            this.map = processFoldersToMap(this.list);
          });
        }
      ),

      updateFile: action(
        async function updateFile(fileId, data) {
          const updatedFileIndex = this.list.findIndex(f => f.id === fileId);
          const updatedFile = { ...this.list[updatedFileIndex], ...data };

          const file = await filesService.updateFile(updatedFile);
          
          runInAction(() => {
            this.list[updatedFileIndex] = file;
          });
        }
      ),

      removeFile: action(
        async function removeFile() {
          const removedFileId = this.openedFileId.get();

          if (removedFileId) {
            await filesService.removeFile(removedFileId);

            const updatedFileIndex = this.list.findIndex(f => f.id === removedFileId);

            runInAction(() => {
              this.list.splice(updatedFileIndex, 1);
              this.map = processFoldersToMap(this.list);
              this.openedFileId.set(null);
            });
          }
        }
      )
    })
  }
  
}

export default new Files();
