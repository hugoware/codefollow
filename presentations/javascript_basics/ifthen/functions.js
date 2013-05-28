var red, green, blue;

(function() {


  var $red = 0
    , $green = 0
    , $blue = 0
    , $unknown = 0
    , $expected_red = 0
    , $expected_green = 0
    , $expected_blue = 0
    , $expected_unknown = 0
    , $colors = [ ]

    _red = function() { $red++; },
    _green = function() { $green++; },
    _blue = function() { $blue++; },
    _unknown = function() { $unknown++; },

    // executes the test
    _run = function() {
      _run = function() { };
      for ( var c in $colors )
        sort( $colors[c] );
    };

  // generate a list
  for ( var i = 0; i < 300; i++ ) {
    var pick = [ 'red', 'green', 'blue', 'other', 33, 'kafe', true ][ 0|Math.random() * 7 ];
    $colors.push( pick );
    if ( pick == 'red' ) $expected_red++;
    else if ( pick == 'green' ) $expected_green++;
    else if ( pick == 'blue' ) $expected_blue++;
    else $expected_unknown++;
  };


  // expose
  red = _red;
  green = _green;
  blue = _blue;
  unknown = _unknown;

  Object.defineProperty( window, '__run', {
    get: function() { return _run; },
    enumerable: false, configurable: false
  });

  Object.defineProperty( window, '__expected_red', {
    get: function() { return $expected_red; },
    enumerable: false, configurable: false
  });

  Object.defineProperty( window, '__red', {
    get: function() { return $red; },
    enumerable: false, configurable: false
  });

  Object.defineProperty( window, '__expected_green', {
    get: function() { return $expected_green; },
    enumerable: false, configurable: false
  });

  Object.defineProperty( window, '__green', {
    get: function() { return $green; },
    enumerable: false, configurable: false
  });

  Object.defineProperty( window, '__expected_blue', {
    get: function() { return $expected_blue; },
    enumerable: false, configurable: false
  });

  Object.defineProperty( window, '__blue', {
    get: function() { return $blue; },
    enumerable: false, configurable: false
  });

  Object.defineProperty( window, '__expected_unknown', {
    get: function() { return $expected_unknown; },
    enumerable: false, configurable: false
  });

  Object.defineProperty( window, '__unknown', {
    get: function() { return $unknown; },
    enumerable: false, configurable: false
  });

})();