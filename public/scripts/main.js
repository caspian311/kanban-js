require(['viewModels/main', 'viewModels/queueManagement', 'viewModels/editQueue', 'viewModels/home'],
      function(mainVM, queueManagement, editQueue, home) {

   mainVM.registerVM('home', home);
   mainVM.registerVM('queueManagement', queueManagement);
   mainVM.registerVM('editQueue', editQueue);

   pager.extendWithPage(mainVM);

   ko.applyBindings(mainVM);

   pager.start('home');
});
