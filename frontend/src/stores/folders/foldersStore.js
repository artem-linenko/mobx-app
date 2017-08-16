import { observable, extendObservable, computed, action, useStrict, runInAction } from 'mobx';
import foldersService from '../../services/foldersService';
import { processFoldersToMap, getTopLevelFolders } from './foldersUtils';

useStrict(true)

class Folders {
  constructor() {
    extendObservable(this, {
      list: observable(
        []
      ),

      map: observable(
        {}
      ),
      
      topLevelFolders: computed(
        () => getTopLevelFolders(this.map)
      ),

      openedFolderId: observable.box(
        null
      ),

      openedFolder: computed(
        () => this.map[this.openedFolderId.get()]
      ),
      
      setOpenedFolderId: action(
        function setOpenedFolderId(folderId) {
         const newFolderIdValue = this.openedFolderId.get() === folderId ? null : folderId;
         this.openedFolderId.set(newFolderIdValue);
        }
      ),
      
      getFolders: action(
        async function getFolders() {
          const folders = await foldersService.getFolders();
          
          runInAction(() => {
            this.list.push(...folders);
            this.map = processFoldersToMap(folders);
          });
        }
      ),

      addFolder: action(
        async function addFolder() {
          const parentId = this.openedFolderId;
          const name = null;
          
          const folder = await foldersService.addFolder(parentId, name);

          runInAction(() => {
            this.list.push(folder);
            this.map = processFoldersToMap(this.list);
          });
        }
      ),

      updateFolder: action(
        async function updateFolder(folderId, data) {
          const updatedFolderIndex = this.list.findIndex(f => f.id === folderId);
          const updatedFolder = { ...this.list[updatedFolderIndex], ...data };

          const folder = await foldersService.updateFolder(updatedFolder);
          
          runInAction(() => {
            this.list[updatedFolderIndex] = folder;
          });
        }
      ),

      removeFolder: action(
        async function removeFolder() {
          const removedFolderId = this.openedFolderId.get();

          if (removedFolderId) {
            await foldersService.removeFolder(removedFolderId);

            const updatedFolderIndex = this.list.findIndex(f => f.id === removedFolderId);

            runInAction(() => {
              this.list.splice(updatedFolderIndex, 1);
              this.map = processFoldersToMap(this.list);
              this.openedFolderId.set(null);
            });
          }
        }
      )
    })
  }
  
}

export default new Folders();
