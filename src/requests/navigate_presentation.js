module.exports = $$class = function NavigatePresentationRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $route = request.route
    , $post = /post/i.test( $request.method )

    , $end_of_presentation = { title: 'End of Presentation', type: 'end' }

    // where to go
    , $json = { }
    , $redirect = null
    , $presentation_id = _.numbers( $route.params.presentation_id )
    , $remote_key = _.numbers( $route.params.remote )
    
    , $errors = new $$validation()
    // , $user = User.find( $session.user )
    , $presentation = Presentation.active[ $presentation_id ]

    // the direction being navigated
    , $next = /next/i.test( _.trim( request.body.move ) )
    , $previous = /prev(ious)?/i.test( _.trim( request.body.move ) )
    
    // model used by the view
    , $model = {
      errors: $errors,
      // user: $user,
      presentation_id: $presentation_id,
      next: $presentation && new Summary( $presentation.peek() || $end_of_presentation )
    },

    // make sure the presentation exists
    _validate_presentation = function() {
      if ( $presentation instanceof Presentation ) return;
      $errors.error = 'missing_presentation';
    },

    // this is a valid remote
    _validate_key = function() { 
      if ( $presentation.remote_key !== $remote_key )
        $errors.error = 'invalid_key';
    },

    // make sure the movement parameter is provided
    _validate_direction = function() {
      if ( ( $next && $previous ) || ( !$next && !$previous ) )
        $errors.error = 'invalid_direction';
    },

    // verify the user can perform this action
    // _validate_user = function() {
    //   if ( $user && $presentation.leader && $presentation.leader.id == $user.id ) return;
    //   $errors.error = 'invalid_user';
    // },

    // handles moving to the next slide
    _navigate_presentation = function() {

      // handle moving the presentation
      if ( $next )
        $presentation.next();
      else if ( $previous )
        $presentation.previous();

      // broadcast the update
      // ???
    },

    // update for the successful attempt
    _set_success = function() {
      Object.merge( $json, {
        success: true,
        current: $presentation.index + 1,
        total: $presentation.views.length + 1,
        next: new Summary( $presentation.peek() )
      });
    },

    // update the failed attempt
    _set_failed = function() {
      Object.merge( $json, {
        success: false,
        error: $errors.error
      });
    },
    
    // handle the request
    _run = function() {
      if ( $post )
        $$validation.run( $errors,
          _validate_direction,
          _validate_presentation,
          // _validate_user,
          _navigate_presentation
        );

      // finalize the response
      if ( $errors.none ) _set_success();
      else _set_failed();

      // write the output
      $response.json( $json );
    };


  __define( $this, { 
    run: _run,
    success: { get: function() { return $success; } },
    errors: { get: function() { return $errors; } },
    presentation: { get: function() { return $presentation; } },
    available: { get: function() { return Presentation.available; } },
    user: { get: function() { return $user; } }
  });

};


__request( $$class );