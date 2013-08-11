require(['queueManagement'], function(queueManagement) {
   var queueManagementPage = new pager.Page();
   queueManagementPage.viewModel = queueManagement;

   var viewModel = {
      queueManagement: queueManagementPage,

      logout: function() {
         window.location.href = '/logout';
      }
   };

   pager.extendWithPage(viewModel);

   ko.applyBindings(viewModel);

   pager.start('home');
});
