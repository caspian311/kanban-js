var kanban = kanban || {};

kanban.goBack = function() {
   history.go(-1);
}

$(function() {
   $('.cancel').click(function() {
      kanban.goBack();
   });
});
