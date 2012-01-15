var Data = require('./data');
var StoriesModel = require('./storiesModel');
var StoriesController = require('./storiesController');

var storiesController = new StoriesController(new StoriesModel(new Data()));

exports.index = storiesController.index;
exports.new = storiesController.new;
exports.destroy = storiesController.destroy;
exports.edit = storiesController.edit;
exports.create = storiesController.create;
exports.update = storiesController.update;
