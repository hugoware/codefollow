
(function() {

  // set the user
  var User = function() { };

  // add the user class
  Object.defineProperty( window, 'User', {
    get: function() { return User; },
    enumerable: false, configurable: false
  });

})();