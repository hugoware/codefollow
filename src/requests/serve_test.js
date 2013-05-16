
var $$class = module.exports = function ServeTestRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $route = request.route
    , $post = /post/i.test( $request.method )
    
    // where to go
    , $presentation_id = _.numbers( $route.params.presentation_id )
    , $test_key = _.numbers( $route.params.test_key )
    , $user_id = $route.params.user_id
    , $serve = _.trim( $route.params.serve )

    // possible results
    , $json
    , $file
    
    // model used by the view
    , $model = {
      errors: new $$validation(),
      user: User.find( $user_id ),
      presentation_id: $presentation_id,
      presentation: Presentation.active[ $presentation_id ]
    }, 

    // is this an actual presentation
    _validate_presentation = function()  {
      if ( !($model.presentation instanceof Presentation )) 
        $model.errors.error = 'missing_presentation';
    },

    // make sure the key provided is correct
    _validate_test_key = function() {
      if ( $model.presentation.test_key != $test_key )
        $model.errors.error = 'invalid_test_key';
    },

    // is this user part of the presentation
    _validate_user = function() { 
      if ( !$model.presentation.is_member( $model.user ) )
        $model.errors.error = 'invalid_user';
    },

    // make sure the 
    _validate_view = function() {
      if ( !( $model.presentation.view instanceof Test ) )
        $model.errors.error = 'invalid_view';
    },

    // verify a file can be lesser
    _is_valid_location = function( path ) {
      var root = $$fs.realpathSync( $model.presentation.view.directory )
        , target = $$fs.realpathSync( path )
        , contains = target.indexOf( root ) == 0;
      return contains;
    },

    // determines what should be sent back
    _identify_request = function() {

      // if looking for user content
      if ( $serve === 'user' )
        _serve_content();

      // returns file content
      else
        _serve_file();
    },

    // returns a file for a test
    _serve_file = function() {
      var path = $$path.join( $model.presentation.view.source, $serve );
      if ( $$fs.existsSync( path ) && _is_valid_location( path ))
        $file = path;
    },

    // displays content provided by the user
    _serve_content = function() {
      $json = {
        success: true,
        zones: $model.presentation.content_for( $model.user )
      };
    },

    // handle the request
    _run = function() {
      $$validation.run( $model.errors, 
        _validate_presentation,
        _validate_view,
        _validate_test_key,
        _validate_user,
        _identify_request );

      // render the result
      if ( $model.errors.any )
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

    success: { get: function() { return $model.success; } },
    errors: { get: function() { return $model.errors; } },
    presentation: { get: function() { return $model.presentation; } },
    presentation_id: { get: function() { return $model.presentation_id; } },
    user: { get: function() { return $model.user; } }
  });

};


__request( $$class );