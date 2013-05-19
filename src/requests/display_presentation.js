module.exports = $$class = function DisplayPresentationRequest( request, response ) {
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
    , $errors = new $$validation()
    
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

    // checks for a trailing slash for presentation urls
    _verify_trailing_slash = function() {
      return /.*\/$/.test( $request.url );
    },

    // updates remaining properties for the view
    _finalize = function() {
      Object.merge( $model, {
        remote_url: '/{1}/{2}/remote'.assign( $presentation.id, $presentation.remote_key ),
        stylesheet: $presentation.stylesheet ? './style.css' : '/ui/default.css'
      });

    },

    // handle the request
    _run = function() {

      // require a trailing slash
      if ( !_verify_trailing_slash() )
        return $response.redirect( $request.url + '/' );

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
        _finalize();
        $response.render( 'display', $model );
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