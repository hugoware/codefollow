module.exports = $$class = function NavigatePresentationRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $route = request.route
    , $post = /post/i.test( $request.method )

    // where to go
    , $json = { }
    , $redirect = null
    , $presentation_id = _.numbers( $route.params.presentation_id )
    , $next = /next/i.test( _.trim( request.body.move ) )
    , $previous = /prev(ious)?/i.test( _.trim( request.body.move ) )
    
    // model used by the view
    , $model = {
      errors: new $$validation(),
      user: User.find( $session.user ),
      presentation_id: $presentation_id,
      presentation: Presentation.active[ $presentation_id ]
    },

    // make sure the presentation exists
    _validate_presentation = function() {
      if ( $model.presentation instanceof Presentation ) return;
      $model.errors.error = 'missing_presentation';
    },

    // make sure the movement parameter is provided
    _validate_direction = function() {
      if ( ( $next && $previous ) || ( !$next && !$previous ) )
        $model.errors.error = 'invalid_direction';
    },

    // verify the user can perform this action
    _validate_user = function() {
      if ( $model.user && $model.presentation.leader && $model.presentation.leader.id == $model.user.id ) return;
      $model.errors.error = 'invalid_user';
    },

    // handles moving to the next slide
    _navigate_presentation = function() {

      // handle moving the presentation
      if ( $next )
        $model.presentation.next();
      else if ( $previous )
        $model.presentation.previous();

      // broadcast the update
      // ???
    },

    // update for the successful attempt
    _set_success = function() {
      Object.merge( $json, {
        success: true,
        view: $model.presentation.view
      });
    },

    // update the failed attempt
    _set_failed = function() {
      Object.merge( $json, {
        success: false,
        error: $model.errors.error
      });
    },
    
    // handle the request
    _run = function() {
      if ( $post )
        $$validation.run( $model.errors,
          _validate_direction,
          _validate_presentation,
          _validate_user,
          _navigate_presentation
        );

      // finalize the response
      if ( $model.errors.none ) _set_success();
      else _set_failed();

      // write the output
      $response.json( $json );
    };


  __define( $this, { 
    run: _run,
    success: { get: function() { return $model.success; } },
    errors: { get: function() { return $model.errors; } },
    presentation: { get: function() { return $model.presentation; } },
    available: { get: function() { return Presentation.available; } },
    user: { get: function() { return $model.user; } }
  });

};


__request( $$class );