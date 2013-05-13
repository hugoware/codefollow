
// testing user attempts

module.exports = $$class = function Test( params, directory, expand ) {
  var $this = this
    , $params = params || { }

    // handles lazy loading
    , $expanded = false
    , $expand = expand || false
    
    // the base directory
    , $directory = directory
    , $path = $$path.join( $directory, $params.value, 'test' )

    // test details
    , $explanation = null
    , $title = null
    , $execute = null
    , $zones = [ ]
    , $tests = [ ]
    ,

    // getters
    _get_title = function() { _expand(); return $title; },
    _get_explanation = function() { _expand(); return $explanation; },
    _get_execute = function() { _expand(); return $execute; },
    _get_zones = function() { _expand(); return $zones; },
    _get_tests = function() { _expand(); return $tests; },

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

    };


  // expand if needed
  if ( expand ) _expand();


  __define( $this, {
    type: { get: function() { return 'test' }, enumerable: true },
    title: { get: _get_title, enumerable: true },
    explanation: { get: _get_explanation, enumerable: true },
    execute: { get: _get_execute, enumerable: true },
    zones: { get: _get_zones, enumerable: true },
    tests: { get: _get_tests, enumerable: true }
  });

};