var a, b;

(function() { 

  // the values used for testing
  var $a = 0|Math.random() * 2
    , $b = 0|Math.random() * 2;


  Object.defineProperty( window, '__a', {
    get: function() { return $a; },
    configurable: false, enumerable: false
  });

  Object.defineProperty( window, '__b', {
    get: function() { return $b; },
    configurable: false, enumerable: false
  });

  // set for the user
  a = $a;
  b = $b;

})();