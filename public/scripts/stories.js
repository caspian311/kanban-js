var kanban = kanban || {};
kanban.stories = {};

kanban.stories.delete = function() {
   var id = this.id;
   $.ajax({
      url: '/stories/' + id, 
      type: 'delete',
      success: function() {
         window.location.href = '/stories';
      },
      error: function(data) {
         alert('failed to delete: ' + id + '\n' + data.responseText);
      }
   });
   return false;
}

kanban.stories.updateCreateButton = function() {
   if ($('#release').val() && $('#name').val()) {
      $('#submitStory').removeAttr('disabled');
   } else {
      $('#submitStory').attr('disabled', 'disabled');
   }
}

$(function() {
   $('.deleteStory').click(kanban.stories.delete);

   $('#release').change(kanban.stories.updateCreateButton);
   $('#name').change(kanban.stories.updateCreateButton);
   $('#name').keyup(kanban.stories.updateCreateButton);

   kanban.stories.updateCreateButton();
});

