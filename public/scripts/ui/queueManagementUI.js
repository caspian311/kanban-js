define([], function() {
   var QueueManagementUI = function() {
      this.showDeleteConfirmation = function() {
         $('#queue-delete-confirmation-dialog').modal();
      };

      this.hideDeleteConfirmation = function() {
         $('#queue-delete-confirmation-dialog').modal('hide');
      };
   };
   return new QueueManagementUI();
});
