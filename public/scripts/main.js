require(['queueManagement'], function(queueManagement) {
   var queueManagementPage = new pager.Page();
   queueManagementPage.viewModel = queueManagement;

   var viewModel = {
      queueManagement: queueManagementPage,

      logout: kanbanjs.logout
   };

   pager.extendWithPage(viewModel);

   ko.applyBindings(viewModel);

   pager.start('home');
});
