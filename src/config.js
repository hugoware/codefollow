
// handles config settings
var $mocks = { }
  , 

  // checks if this method belongs to this class
  _is_config_method = function( key ) {
    return /(load|(un)?mock|reset|clear)/.test(key);
  },

  // wipe out all config values
  _clear = function() {
    for ( k in module.exports )
      delete module.exports[ k ];
    _define();
  },

  // mocks a configuration value
  _mock = function( key, value ) {
    $mocks[ key ] = $mocks[ key ] == null ? module.exports[ key ] : $mocks[ key ];
    module.exports[ key ] = value;
  },

  // remove a mocked value
  _unmock = function( key ) {
    delete module.exports[ key ];
    if( $mocks[ key ]) 
      module.exports[ key ] = $mocks[ key ];
    delete $mocks[ key ];
  },

  // loads a configuration by path
  _load = function( path ) {
    if ( !$$fs.existsSync( path ))
      throw 'configuration_not_found';

    var content = $$fs.readFileSync( path ).toString()
      , config = JSON.parse( content );

    // populate config values
    for ( var key in config )
      module.exports[ key ] = config[ key ];
  },

  // resets any mocked configurations
  _reset = function() {
    for (var k in $mocks) _unmock( k );
  },

  // expose config management
  _define = function() {
    __define( module.exports, {

      // mocking config values
      load: _load,
      mock: _mock,
      unmock: _unmock,
      reset: _reset,
      clear: _clear

    });

  };


// prepare the config
_define();