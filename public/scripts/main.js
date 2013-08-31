require(['viewModels/main', 'viewModels/queueManagement', 'viewModels/editQueue', 'viewModels/home', 'viewModels/newCard'],
      function(mainVM, queueManagement, editQueue, home, newCard) {

   mainVM.registerVM('home', home);
   mainVM.registerVM('queueManagement', queueManagement);
   mainVM.registerVM('editQueue', editQueue);
   mainVM.registerVM('newCard', newCard);

   pager.extendWithPage(mainVM);

   ko.applyBindings(mainVM);

   pager.start('home');
});
