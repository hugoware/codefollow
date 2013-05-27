var save, download;

(function() {

  var $save = [ ]
    , $download = 0
    , $callback
    , $files = [ 
        'readme.txt', 
        'readme.txt', 
        null, 
        'readme.txt', 
        'readme.txt', 
        'readme.txt', 
        null, 
        'readme.txt', 
        'readme.txt', 
        null, 
        'readme.txt', 
        'readme.txt', 
        'readme.txt', 
        'readme.txt', 
        'readme.txt' 
      ]
    ,
    //read all records
    _download = function( callback ) {
      $download++;

      // track if they used callbacks
      $callback = $callback || callback;

      // update call once per download
      for ( var i in $files )
        callback( $files[i] );

    },
    // write the record
    _save = function( record ) {
      $save.push( record );
    };

  // share the save count
  Object.defineProperty( window, '__save', {
    get: function() { return $save.length; },
    configurable: false, enumerable: false
  });

  Object.defineProperty( window, '__callback', {
    get: function() { return $callback; },
    configurable: false, enumerable: false
  });

  Object.defineProperty( window, '__download', {
    get: function() { return $download; },
    configurable: false, enumerable: false
  });

  // expose methods
  download = _download;
  save = _save;

})();
