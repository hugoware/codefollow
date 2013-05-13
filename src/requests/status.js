module.exports = $$class = function StatusRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $route = request.route
    , $post = /post/i.test( $request.method )
    
    // where to go
    , $redirect = null
    , $presentation_id = _.numbers( $route.params.presentation_id )
    , $at = $request.body.at == null ? -1 : 0|_.numbers( $request.body.at )
    
    // model used by the view
    , $model = {
      errors: new $$validation(),
      user: User.find( $session.user ),
      presentation_id: $presentation_id,
      presentation: Presentation.active[ $presentation_id ]
    }, 

    // make sure the presentation exists
    _validate_presentation = function() {
      if ( !($model.presentation instanceof Presentation )) 
        $model.errors.error = 'missing_presentation';
    },

    // check if this user can be used
    _validate_user = function() {
      if ( !$model.presentation.is_member( $model.user ) )
        $model.errors.error = 'invalid_user';
    },

    // set the view information
    _set_success = function() {
      $json = { success: true, at: $model.presentation.index };

      // only include content if needed
      if ( $at !== $model.presentation.index )
        Object.merge( $json, $model.presentation.view );
    },

    // unable to display
    _set_failed = function() {
      $json = {
        success: false,
        error: $model.errors.error
      };
    },

    // handle the request
    _run = function() {
      if ( $post )
        $$validation.run( 
          $model.errors,
          _validate_presentation,
          _validate_user );
      else
        $model.errors.error = 'invalid_method';

      // finish the status request
      if ( $model.errors.none ) _set_success();
      else _set_failed();

      $response.json( $json );
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