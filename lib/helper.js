

if (!Array.prototype.each) {
   Array.prototype.each = function(func) {
      for (var i=0; i<this.length; i++) {
         var element = this[i];
         func(element);
      }
   }
}

