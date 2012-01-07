$(function() {
   $('.delete').click(function() {
      deletePerson(this.id);
      return false;
   })
});

deletePerson = function(id) {
   $.ajax({
      url: '/people/' + id, 
      type: 'delete',
      success: function() {
         window.location.href = '/people';
      },
      error: function() {
         alert('failed to delete: ' + id);
      }
   });
}
