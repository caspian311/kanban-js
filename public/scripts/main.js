require(['viewModels/main', 'viewModels/queueManagement'], function(mainVM, queueManagement) {
   mainVM.registerVM('queueManagement', queueManagement);

   pager.extendWithPage(mainVM);

   ko.applyBindings(mainVM);

   pager.start('home');
});
