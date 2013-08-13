require(['viewModels/main', 'viewModels/queueManagement', 'viewModels/newQueue'],
      function(mainVM, queueManagement, newQueue) {
   mainVM.registerVM('queueManagement', queueManagement, newQueue);
   mainVM.registerVM('newQueue', newQueue);

   pager.extendWithPage(mainVM);

   ko.applyBindings(mainVM);

   pager.start('home');
});
