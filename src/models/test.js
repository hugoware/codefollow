
// testing user attempts

var $$class = module.exports = function Test( params, directory, expand ) {
  var $this = this
    , $params = params || { }
    , $presentation = $params.presentation

    // handles lazy loading
    , $expanded = false
    , $expand = expand || false
    
    // the base directory
    , $directory = directory
    , $location = $params.value
    , $source = $$path.join( $directory, $params.value )
    , $path = $$path.join( $source, 'test' )

    // test details
    , $explanation = null
    , $title = null
    , $execute = null
    , $zones = [ ]
    , $tests = [ ]
    ,

    // getters
    _get_location = function() { return $location; },
    _get_title = function() { _expand(); return $title; },
    _get_explanation = function() { _expand(); return $explanation; },
    _get_execute = function() { _expand(); return $execute; },
    _get_zones = function() { _expand(); return $zones; },
    _get_tests = function() { _expand(); return $tests; },
    _get_directory = function() { return $directory; },
    _get_source = function() { return $source; },

    // including new content
    _add_test = function( section ) { $tests.push( section ); },
    _add_zone = function( section ) { $zones.push( section ); },


    // adds a zone entry
    _set_explanation = function( section ) {

      // read a separate file
      if ( section.value ) {
        var path = $$path.join( $directory, $params.value, section.value )
          , exists = $$fs.existsSync( path )
          , file = exists && $$fs.readFileSync( path )
          , content = file && file.toString();
        $explanation = content;
      }

      // or use the inline content
      else $explanation = section.content;
    },

    // grabs the content for the slides
    _expand = function() {
      if ( $expanded ) return;
      $expanded = true;
      
      // read in all content
      var exists = $$fs.existsSync( $path )
        , file = exists && $$fs.readFileSync( $path )
        , content = file && file.toString()
        , reader = content && new Reader( content );

      // if nothing was read, give up
      if ( !reader ) return;

      // read each section value
      _.each( reader.sections, 
        function( i, section ) {

          if ( section.type == 'explanation' )
            _set_explanation( section );

          // the name of the test
          else if ( section.type == 'title' )
            $title = section.value || '';

          // the file that should be run
          else if ( section.type == 'execute' )
            $execute = section.value;

          // tests that will be executed
          else if ( section.type == 'test' )
            _add_test( section );

          // areas that can be modified
          else if ( section.type == 'zone' )
            _add_zone( section );

        });

    },

    // returns a populated set of zones
    _zones_for = function( user ) {
      var zones = { }
        , existing = $presentation.zones_for( user );

      // copy only zones for this test
      $zones.each( function( zone ) {
        var key = zone['for'];
        zones[ key ] = {
          'for': key,
          name: zone.name,
          syntax: zone.syntax,
          content: existing[ key ] || zone.content || ''
        };
      });

      return zones;
    };


  // expand if needed
  if ( expand ) _expand();


  __define( $this, {
    type: { get: function() { return 'test' }, enumerable: true },
    location: { get: _get_location },
    title: { get: _get_title, enumerable: true },
    explanation: { get: _get_explanation, enumerable: true },
    execute: { get: _get_execute },
    zones: { get: _get_zones },
    tests: { get: _get_tests },
    directory: { get: _get_directory },
    source: { get: _get_source },

    // extracting content
    zones_for: _zones_for
  });

};