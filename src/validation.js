
// creates a simple error collection
module.exports = $$class = function Validator() {
  var $this = this
    ,

    // checks if this contains errors
    _any = function() {
      for( var any in $this ) break;
      return !!any;
    };

  // add a property to watch for errors
  __define( this, {
    any: { get: _any },
    none: { get: function() { return !_any(); } }
  });
  
};


// executes steps until an error is found or finished
var __run = function( validator ) {
  for ( var i = 1; i < arguments.length && validator.none; i++ )
    arguments[ i ]();
};

// checks for any matching error
var __has = function( validator ) {
  for ( var i = 1; i < arguments.length && validator.none; i++ )
    if ( $validator[ arguments[a] ]) return true;
  return false;
};


__define( $$class, {
  run: __run,
  has: __has,
  email: /^[^\@]+\@[^\.]+\.\w+$/
})