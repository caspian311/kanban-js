define(['queueService'], function(queueService) {
   var QueueManagement = function() {
      this.queues = ko.observableArray([
         { name: 'task 1', description: 'desc 1'},
         { name: 'task 2', description: 'desc 2'},
         { name: 'task 3', description: 'desc 3'},
         { name: 'task 4', description: 'desc 4'}
      ]);
      this.foo = 'abc';
   };
   return new QueueManagement();
});
