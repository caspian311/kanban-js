var Data = require('./data');
var ReleasesModel = require('./models/releasesModel');
var ReleasesController = require('./controllers/releasesController');

var releasesController = new ReleasesController(new ReleasesModel(new Data()));

exports.index = releasesController.index;
exports.new = releasesController.new;
exports.destroy = releasesController.destroy;
exports.edit = releasesController.edit;
exports.create = releasesController.create;
exports.update = releasesController.update;
