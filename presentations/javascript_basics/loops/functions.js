var add, read;

(function() {

  // counters
  var $add = 0

    // reading values
    , $values = 'a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,cat,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a'.split(',')
    , $at = -1;

  // the total add call count
  Object.defineProperty( window, '__add', {
    get: function() { return $add; },
    enumerable: false, configurable: false
  });

  // last time the get was called
  Object.defineProperty( window, '__at', {
    get: function() { return $at; },
    enumerable: false, configurable: false
  });

  // set the two functions
  add = function() { $add++; };
  
  // tracking both values
  read = function() { return $values[ ++$at ]; };

})();