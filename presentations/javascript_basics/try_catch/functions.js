(function() {

  // tracking 
  var $connect = 0
    , $disconnect = 0
    , $connected
    , $expired
    , $exceptions
    , $read = 0
    , $log = [ ]
    ,

    // tracking info
    _exceptions = function() { $exceptions = true; },

    // handles logging messages
    _log = function( error ) { $log.push( error ); },
    
    // simulates disconnecting
    _disconnect = function() {
      if ( !$connected ) throw 'error';
      $expired = false;
      $connected = false;
      $disconnect++; 
    },

    // simulates connecting
    _connect = function() { 
      if ( $connected ) throw 'error';
      $connected = true;
      $connect++; 
    },

    // reading records
    _read = function() {

      // check for connection errors
      if ( !$connected ) throw 'connection';
      else if ( $expired ) throw 'expired';
      $expired = true;

      // read only increments if this works
      $read++;
      
      // throw errors
      if ( $read == 7 ) throw 'timeout';
      else if ( $read == 12 ) throw 'locked';
      else if ( $read == 22 ) throw 'timeout';
      else if ( $read == 48 ) throw 'timeout';
      else if ( $read == 64 ) throw 'locked';
      else if ( $read == 89 ) throw 'timeout';
      else if ( $read == 90 ) throw 'timeout';
      else if ( $read == 91 ) throw 'locked';

      return "[DatabaseRecord]"
    };

  // total calls to connect
  Object.defineProperty( window, '__database', {
    enumerable: false, configurable: false,
    get: function() { 
      return {
        log: _log,
        disconnect: _disconnect,
        connect: _connect,
        read: _read
      }; 
    }
  });

  // add exception logging
  Object.defineProperty( window, '__exceptions', {
    set: function() { $exceptions = true; },
    get: function() { return $exceptions; }, 
    enumerable: false, configurable: false
  });

  // total calls to connect
  Object.defineProperty( window, '__connect', {
    get: function() { return $connect; }, enumerable: false, configurable: false
  });

  // total calls to disconnect
  Object.defineProperty( window, '__disconnect', {
    get: function() { return $disconnect; }, enumerable: false, configurable: false
  });

  // the total times records were read
  Object.defineProperty( window, '__read', {
    get: function() { return $read; }, enumerable: false, configurable: false
  });

  // the final message log
  Object.defineProperty( window, '__log', {
    get: function() { return $log; }, enumerable: false, configurable: false
  });

})();