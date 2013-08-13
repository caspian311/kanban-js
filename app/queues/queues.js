(function() {
   var Queues = function() {
      this.get = function(request, response) {
         response.json([
            { name: 'task 1', description: 'desc 1'},
            { name: 'task 2', description: 'desc 2'},
            { name: 'task 3', description: 'desc 3'},
            { name: 'task 4', description: 'desc 4'}
         ]);
      };

      this.post = function(request, response) {
         console.dir(request.body)
         response.json('worky!');
      };
   };

   module.exports = new Queues();
})();
