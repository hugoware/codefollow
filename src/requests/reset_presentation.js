var $$class = module.exports = function ResetPresentationRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $route = request.route
    , $post = /post/i.test( $request.method )
    
    // where to go
    , $presentation_id = _.numbers( $route.params.presentation_id )
    , $presentation = Presentation.active[ $presentation_id ]
    , $user = User.find( $session.user )
    , $leader = $user && $presentation.leader && $presentation.leader.id == $user.id
    , $errors = new $$validation()
    
    // model used by the view
    , $model = {
      errors: $errors,
      user: $user,
      presentation_id: $presentation_id,
      presentation: $presentation,
      leader: $leader
    }, 

    // is this an actual presentation
    _validate_presentation = function()  {
      if ( !($presentation instanceof Presentation )) 
        $errors.error = 'missing_presentation';
    },

    // is this user part of the presentation
    _validate_user = function() { 
      if ( !$presentation.is_leader( $user ) )
        $errors.error = 'invalid_user';
    },

    // handle the request
    _run = function() {
      console.log('run');

      // attempt to display
      $$validation.run( $errors,
        _validate_presentation,
        _validate_user );

      // choose the correct view
      if ( $errors.any ) {
        if ( $errors.error == 'missing_presentation' )
          $response.render( 'missing', $model );
        else if ( $errors.error == 'invalid_user' )
          $response.redirect( '/join/' + $presentation.identity );
      }
      // no problems, log in
      else {
        console.log('reset');
        $presentation.reload();
        $response.redirect( '/' + $presentation.identity );
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