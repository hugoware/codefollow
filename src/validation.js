
// creates a simple error collection
module.exports = $$class = function Validator() {
  var $this = this
    ,

    // checks if this contains errors
    _any = function() {
      for( var p in $this )
        if ( !/^has$/.test( p ) ) return true;
      return false;
    },

    // checks if this contains errors
    _has = function() {
      for (var a in arguments)
        if ( $this[ arguments[a] ]) return true;
      return false;
    };

  // add a property to watch for errors
  __define( this, {
    any: { get: _any },
    none: { get: function() { return !_any(); } },
    has: _has
  });
  
};


// executes steps until an error is found or finished
var __run = function( validator ) {
  for ( var i = 1; i < arguments.length && validator.none; i++ )
    arguments[ i ]();
};


__define( $$class, {
  run: __run,
  email: /^[^\@]+\@[^\.]+\.\w+$/
})