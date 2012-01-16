var kanban = kanban || {};
kanban.releases = {};

kanban.releases.delete = function(id) {
   $.ajax({
      url: '/releases/' + id, 
      type: 'delete',
      success: function() {
         window.location.href = '/releases';
      },
      error: function(data) {
         alert('failed to delete: ' + id + '\n' + data.responseText);
      }
   });
}

$(function() {
   $('.deleteRelease').click(function() {
      kanban.releases.delete(this.id);
      return false;
   });
});

