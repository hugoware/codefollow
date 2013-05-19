var $$class = module.exports = function ServeDirectoryRequest( request, response ) {
    var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $route = request.route
    , $post = /post/i.test( $request.method )
    
    // where to go
    , $errors = new $$validation()
    , $presentation_id = _.numbers( $route.params.presentation_id )
    , $serve = _.trim( $route.params.serve )
    , $user = User.find( $session.user )
    , $presentation = Presentation.active[ $presentation_id ]
    

    // possible results
    , $json
    , $file
    
    // model used by the view
    , $model = {
      errors: $errors,
      user: $user,
      presentation_id: $presentation_id,
      presentation: $presentation
    }, 

    // is this an actual presentation
    _validate_presentation = function()  {
      if ( !($presentation instanceof Presentation )) 
        $errors.error = 'missing_presentation';
    },

    // is this user part of the presentation
    _validate_user = function() { 
      if ( !$presentation.is_member( $user ) )
        $errors.error = 'invalid_user';
    },

    // verify a file can be lesser
    _is_valid_location = function( path ) {
      var root = $$fs.realpathSync( $presentation.directory )
        , target = $$fs.realpathSync( path )
        , contains = target.indexOf( root ) == 0;
      return contains;
    },

    // check if this is for the current test
    _for_input = function() { return /input$/.test( $serve ) },
    
    // checks if the route requested matches a test directory
    _is_allowed = function() {
      for (var t in $presentation.tests) {
        var test = $presentation.tests[t]
          , location = test.location;

        // if this matches a directory request, require the test is active
        if ( $serve.substr( 0, location.length ) == location )
          return $presentation.view.location == test.location;
      }

      // any other location is fine
      return true;
    },

    // determines what should be sent back
    _identify_request = function() {

      // if looking for user content
      if ( _for_input() )
        _serve_content();

      // returns file content
      else
        _serve_file();
    },

    // returns a file for a test
    _serve_file = function() {
      var path = $$path.join( $presentation.directory, $serve )
        , exists = $$fs.existsSync( path )
        , valid = exists && _is_valid_location( path );

      // make sure it can be served
      if ( !exists ) $errors.error = 'missing_file';
      else if ( !valid ) $errors.error = 'invalid_location';
      else if ( !_is_allowed() ) $errors.error = 'unavailable';

      // serve the file if still okay
      if ( $errors.none )
        $file = path;
    },

    // displays content provided by the user
    _serve_content = function() {
      if ( !_is_allowed() )
        return $errors.error = 'unavailable';

      // grab the content
      $json = {
        success: true,
        zones: $presentation.view.zones_for( $user )
      };
    },

    // handle the request
    _run = function() {
      $$validation.run( $errors, 
        _validate_presentation,
        _validate_user,
        _identify_request );

      // render the result
      if ( $errors.any )
        $response.send( 404 );
      else {
        if ( $json )
          $response.json( $json )
        else if ( $file )
          $response.sendfile( $file );
        else
          $response.send( 404 );
      }

    };



  __define( $this, { 
    run: _run,

    success: { get: function() { return $success; } },
    errors: { get: function() { return $errors; } },
    presentation: { get: function() { return $presentation; } },
    presentation_id: { get: function() { return $presentation_id; } },
    user: { get: function() { return $user; } }
  });

};


__request( $$class );