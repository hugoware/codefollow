(function() {

  // simple inheritence
  Object.defineProperty( Function.prototype, 'extend', {
    enumerable: false,
    get: function() { 
      return function( define ) {
        var instance = function() { };

        // inheriting from source
        for ( var v in this.prototype )
          instance.prototype[v] = this.prototype[v];

        // unique for this instance
        for ( var v in define )
          instance.prototype[v] = define[v];

        // return the final class
        return instance;
      } 
    }
  });

})();