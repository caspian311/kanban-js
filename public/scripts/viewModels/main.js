define(function() {
   var Main = function() {
      var siteVMs = {};
      this.registerVM = function(id, vm) {
         siteVMs[id] = vm;
      };
      this.bindModel = function(bindingFunction, parentViewModel) {
         var vm = siteVMs[parentViewModel.currentId];
         bindingFunction(vm);
         if (vm.viewAttached) {
            vm.viewAttached();
         }
      };

      this.logout = kanbanjs.logout;
   };

   return new Main();
});
