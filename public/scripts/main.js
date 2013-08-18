require(['viewModels/main', 'viewModels/queueManagement', 'viewModels/editQueue'],
      function(mainVM, queueManagement, editQueue) {

   mainVM.registerVM('queueManagement', queueManagement);
   mainVM.registerVM('editQueue', editQueue);

   pager.extendWithPage(mainVM);

   ko.applyBindings(mainVM);

   pager.start('home');
});
