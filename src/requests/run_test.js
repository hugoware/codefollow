var $$class = module.exports = function RunTestRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $route = request.route
    , $post = /post/i.test( $request.method )
    
    // where to go
    , $presentation_id = _.numbers( $route.params.presentation_id )
    , $presentation = Presentation.active[ $presentation_id ]
    , $test = $presentation && $presentation.view instanceof Test && $presentation.view
    , $engine
    , $user = User.find( $session.user )
    , $errors = new $$validation
    
    // model used by the view
    , $model = {
      errors: $errors,
      user: $user,
      presentation_id: $presentation_id,
      presentation: $presentation,
      test: $test
    }, 

    // determines what kind of engine is used 
    // to execute this test
    _identify_engine = function( test ) {
      if ( /\.html$/i.test( $test.execute ) )
        return HtmlJsEngine;
    },

    // is this an actual presentation
    _validate_method = function()  {
      if ( !$post ) 
        $errors.error = 'invalid_method';
    },

    // is this an actual presentation
    _validate_presentation = function()  {
      if ( !( $presentation instanceof Presentation )) 
        $errors.error = 'missing_presentation';
    },

    // is this an actual presentation
    _validate_test = function()  {
      if ( !( $test instanceof Test )) 
        $errors.error = 'invalid_test';
    },

    // is this user part of the presentation
    _validate_user = function() { 
      if ( !$presentation.is_member( $user ) )
        $errors.error = 'invalid_user';
    },

    // attempts to execute the test
    _run_test = function() {
      $engine = new _identify_engine({
        presentation: $presentation,
        test: $presentation.view,
        user: $user
      });

      // populate final results
      $engine.run( _handle_results );
    },

    // populate and send the results
    _handle_results = function( results ) {
      $response.json( results );
    },

    // handle the request
    _run = function() {
      $$validation.run( $model.errors,
        _validate_method,
        _validate_presentation,
        _validate_test,
        _validate_user,
        _run_test );

      // if there are any problems, just stop
      if ( $errors.any )
        return $response.send( 404 );

    };



  __define( $this, { 
    run: _run,

    success: { get: function() { return $model.success; } },
    engine: { get: function() { return $engine; } },
    errors: { get: function() { return $errors; } },
    presentation: { get: function() { return $presentation; } },
    presentation_id: { get: function() { return $presentation_id; } },
    user: { get: function() { return $user; } }
  });

};


__request( $$class );