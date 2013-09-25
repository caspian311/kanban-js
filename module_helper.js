path = require('path');

module.exports = {
   setupViews: function(app, currentDir) {
      directory = currentDir.substr(currentDir.lastIndexOf('/'), currentDir.length);
      viewsDir = path.join(currentDir, '..', '..', 'views', directory);
      app.set('views', viewsDir);
   }
};
