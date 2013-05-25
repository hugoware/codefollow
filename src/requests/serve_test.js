
var $$class = module.exports = function ServeTestRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $route = request.route
    , $post = /post/i.test( $request.method )
    
    // where to go
    , $presentation_id = _.numbers( $route.params.presentation_id )
    , $presentation = Presentation.active[ $presentation_id ]
    , $test_key = _.numbers( $route.params.test_key )
    , $user_id = $route.params.user_id
    , $serve = _.trim( $route.params.serve )
    , $errors = new $$validation()
    , $user = User.find( $user_id )

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

    // make sure the key provided is correct
    _validate_test_key = function() {
      if ( $presentation.test_key != $test_key )
        $errors.error = 'invalid_test_key';
    },

    // is this user part of the presentation
    _validate_user = function() { 
      if ( !$presentation.is_member( $user ) )
        $errors.error = 'invalid_user';
    },

    // make sure the 
    _validate_view = function() {
      if ( !( $presentation.view instanceof Test ) )
        $errors.error = 'invalid_view';
    },

    // checks if looking for user input values
    _is_input_request = function() {
      return /^(.*\/input|input)$/.test( $serve );
    },

    // verify a file can be lesser
    _is_valid_location = function( path ) {
      var root = $$fs.realpathSync( $presentation.view.directory )
        , target = $$fs.realpathSync( path )
        , contains = target.indexOf( root ) == 0;
      return contains;
    },

    // determines what should be sent back
    _identify_request = function() {

      // if looking for user content
      if ( _is_input_request() )
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

      // serve the file if still okay
      if ( $errors.none )
        $file = path;
    },

    // displays content provided by the user
    _serve_content = function() {

      $json = {
        success: true,
        zones: $presentation.view.zones_for( $user )
      };
    },

    // handle the request
    _run = function() {
      $$validation.run( $errors, 
        _validate_presentation,
        _validate_view,
        _validate_test_key,
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