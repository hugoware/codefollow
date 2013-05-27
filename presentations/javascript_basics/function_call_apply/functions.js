var Factory;

(function() {
  var $error = [ ]
    , $route = [ ]
    , $send = [ ]

    , $count = 0
    , $handled = 0
    , $valid
    , $current

  // quick gibber
  var _rnd = function() {
    var len = 2 + 0|Math.random() * 15
      , value = Math.random().toString(36).substr( 2, len );
    return value.split('');
  };

  var $messages = [

    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'error', _rnd() ],
    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'error', _rnd() ],
    [ 'send', _rnd() ],
    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'error', _rnd() ],
    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'send', _rnd() ],
    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'error', _rnd() ],
    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'error', _rnd() ],
    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'send', _rnd() ],
    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'route', _rnd() ],
    [ 'error', _rnd() ],
    [ 'route', _rnd() ],
    [ 'send', _rnd() ],
    [ 'route', _rnd() ]
  ];

  Object.defineProperty( window, '__valid', {
    get: function() { return !!$valid; },
    enumerable: false, configurable: false
  });

  Object.defineProperty( window, '__count', {
    get: function() { return $count; },
    enumerable: false, configurable: false
  });

  Object.defineProperty( window, '__messages', {
    get: function() { return $messages.slice(0); },
    enumerable: false, configurable: false
  });

  Object.defineProperty( window, '__error', {
    get: function() { return $error; },
    enumerable: false, configurable: false
  });
  
  Object.defineProperty( window, '__route', {
    get: function() { return $route; },
    enumerable: false, configurable: false
  });

  Object.defineProperty( window, '__send', {
    get: function() { return $send; },
    enumerable: false, configurable: false
  });

  Object.defineProperty( window, '__handled', {
    get: function() { return $handled; },
    enumerable: false, configurable: false
  });

  // only run the test once
  var _start = function() {
    _start = function() { };
    for( var i in $messages ) {
      $current = $messages[i][1].slice(0);
      Server.handle( $messages[i][0], $current, $count++ );
    }
  };

  var _merge = function( target, args ) {

    // fill invalid data
    args = [].slice.call( args, 0 );
    for ( var a in args )
      if ( args[a] == null )
        args[a] = 'X';

    // validate the length
    if ( $valid !== false ) 
      $valid = $current.length == args.length;

    // save the data
    target.push( args.join('') );
  };

  // an instance
  var __Server = function() {

    // the server actions to handle
    this.error = function() { 
      if ( this instanceof __Server ) $handled++;
      _merge( $error, arguments ); 
    };

    this.route = function() {
      if ( this instanceof __Server ) $handled++;
      _merge( $route, arguments ); 
    };

    this.send = function() {
      if ( this instanceof __Server ) $handled++;
      _merge( $send, arguments ); 
    };

    this.start = _start;

  };


  // create the server used
  var $server = new __Server();
  Object.defineProperty( window, 'Server', {
    get: function() { return $server; },
    enumerable: false, configurable: false
  });


})();