var kanban = kanban || {};
kanban.stories = {};

kanban.stories.delete = function(id) {
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
}

$(function() {
   $('.deleteStory').click(function() {
      kanban.stories.delete(this.id);
      return false;
   });
});

