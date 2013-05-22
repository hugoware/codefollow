module.exports = $$class = function DisplayRemoteRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $route = request.route
    , $post = /post/i.test( $request.method )

    // what to show if at the very end of the presentation
    , $end_of_presentation = { content: 'End of Presentation', type: 'end' }
    
    // where to go
    , $presentation_id = _.numbers( $route.params.presentation_id )
    , $remote_key = _.numbers( $route.params.remote )

    , $errors = new $$validation()
    , $user = User.find( $session.user )
    , $presentation = Presentation.active[ $presentation_id ]
    
    // model used by the view
    , $model = {
      errors: $errors,
      allowed: false,
      presentation_id: $presentation_id,
      user: $user,
      current: $presentation && $presentation.index + 1,
      total: $presentation && $presentation.views.length + 1,
      next: $presentation && new Summary( $presentation.peek() || $end_of_presentation )
    }, 

    // is this an actual presentation
    _validate_presentation = function()  {
      if ( !($presentation instanceof Presentation )) 
        $errors.error = 'missing_presentation';
    },

    // this is a valid remote
    _validate_key = function() { 
      if ( $presentation.remote_key !== $remote_key )
        $errors.error = 'invalid_key';
    },

    // handle the request
    _run = function() {
      $$validation.run( $model.errors,
        _validate_presentation,
        _validate_key );

      // go to home for invalid requests
      if ( $errors.any )
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