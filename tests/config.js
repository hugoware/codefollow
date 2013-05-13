var $configuration = null

require('./test')( module, {

  before: function() {

    // load in existing configs
    var path = $$path.join( __dirname, '../config.json')
      , file = $$fs.readFileSync( path )
      , content = file.toString()
    
    // save for reference
    $configuration = JSON.parse( content );

    // reset the config
    $$config.clear();
    $$config.load( path );
  },

  config_is_a_thing: function() {
    this.ok( $$config, '$$config exists');
  },


  config_has_properties: function() {
    var existing_count = 0
      , mapped_count = 0;

    // count the original and mapped
    _.each( $configuration, function() { existing_count++; });
    _.each( $$config, function( key, value ) {
      if ( !Object.isFunction(value) ) mapped_count++;
    });

    this.equals( existing_count, mapped_count, 'did not include all configuration' );
  },


  default_configuration_matches_mapped_values: function() {
    var match = true;
    _.each( $$config, function( key, value ) {
      if (!( value instanceof Function ))
        return ( match = value == $configuration[ key ] );
    });

    this.ok( match, 'not all values matched')
  },


  configuration_accepts_mocked_values: function() {
    var old_version = $$config.version
      , new_version = old_version + 1;

    // try a new value
    $$config.mock( 'version', new_version );
    this.equal( $$config.version, new_version, 'did not accept mock value' );

    // reset to previous value
    $$config.reset();
    this.equal( $$config.version, old_version, 'did not reset mock value' );
  }


});
