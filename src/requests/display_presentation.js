module.exports = $$class = function DisplayPresentationRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $route = request.route
    , $post = /post/i.test( $request.method )
    
    // where to go
    , $presentation_id = _.numbers( $route.params.presentation_id )
    
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
    _validate_user = function() { 
      if ( !$model.presentation.is_member( $model.user ) )
        $model.errors.error = 'invalid_user';
    },

    // updates remaining properties for the view
    _finalize = function() {
      Object.merge( $model, {

        remote_url: '/{1}/{2}/remote'.assign( $model.presentation.id, $model.presentation.remote_key )

      });

    },

    // handle the request
    _run = function() {
      $$validation.run( $model.errors,
        _validate_presentation,
        _validate_user );

      // choose the correct view
      if ( $model.errors.any ) {
        if ( $model.errors.error == 'missing_presentation' )
          $response.render( 'missing', $model );
        else if ( $model.errors.error == 'invalid_user' )
          $response.redirect( '/join/' + $model.presentation.identity );
      }
      // no problems, log in
      else {
        _finalize();
        $response.render( 'display', $model );
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