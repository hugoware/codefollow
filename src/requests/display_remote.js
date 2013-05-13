module.exports = $$class = function DisplayRemoteRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $route = request.route
    , $post = /post/i.test( $request.method )
    
    // where to go
    , $presentation_id = _.numbers( $route.params.presentation_id )
    , $remote_key = _.numbers( $route.params.remote )
    
    // model used by the view
    , $model = {
      errors: new $$validation(),
      allowed: false,
      user: User.find( $session.user ),
      presentation_id: $presentation_id,
      presentation: Presentation.active[ $presentation_id ]
    }, 

    // is this an actual presentation
    _validate_presentation = function()  {
      if ( !($model.presentation instanceof Presentation )) 
        $model.errors.error = 'missing_presentation';
    },

    // is this user part of the presentation
    _validate_key = function() { 
      if ( $model.presentation.remote_key !== $remote_key )
        $model.errors.error = 'invalid_key';
    },

    // handle the request
    _run = function() {
      $$validation.run( $model.errors,
        _validate_presentation,
        _validate_key );

      // go to home for invalid requests
      if ( $model.errors.any )
        $response.redirect( '/' );

      // no problems, show remote
      else
        $response.render('remote', $model );
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