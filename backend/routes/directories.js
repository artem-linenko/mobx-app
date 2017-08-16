var express = require('express')
  , _ = require('lodash')
  , router = express.Router()
  , store = require('./../store/store')
  , idGenerator = require('./../store/id-generator')

router
  .get('/', function (req, res) {
    res.send(store.directories)
  })
  .post('/', function (req, res) {
    var directory = _.pick(req.body, [ 'parentId', 'name' ]);

    if (_.isEmpty(directory)) {
      res.status(500).send('no parent')
    }

    _.assign(directory, { id: idGenerator.getNext() })
    store.directories.push(directory)

    res.send(directory)
  })
  .put('/:id', function (req, res) {
    var directory = _.pick(req.body, [ 'id', 'parentId', 'name' ]);
    var oldEntityIndex = _.findIndex(store.directories, { id: directory.id });

    if (oldEntityIndex === -1) {
      res.status(500).send('no entity')
    }


    store.directories.splice(oldEntityIndex, 1, directory)
    res.send(directory)
  })
  .delete('/:id', function (req, res) {
    var directoryId = req.params.id

    if (directoryId == 1) {
      res.send(500).send('can not remove root directory')
      return
    }

    var entityIndex = _.findIndex(store.directories, { id: _.parseInt(directoryId) });
    var directory = store.directories[entityIndex]

    if (entityIndex === -1) {
      res.status(500).send('no entity')
    }
    
    store.directories.splice(entityIndex, 1)
    res.send(directory)
  })

module.exports = router
