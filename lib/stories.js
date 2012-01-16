var Data = require('./data');
var StoriesModel = require('./models/storiesModel');
var StoriesController = require('./controllers/storiesController');

var storiesController = new StoriesController(new StoriesModel(new Data()));

exports.index = storiesController.index;
exports.new = storiesController.new;
exports.destroy = storiesController.destroy;
exports.edit = storiesController.edit;
exports.create = storiesController.create;
exports.update = storiesController.update;
