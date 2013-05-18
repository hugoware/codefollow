module.exports = $$class = function StartPresentationRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $post = /post/i.test( $request.method )
    
    // where to go
    , $view = 'start'
    , $redirect = null
    , $presentation_id = _.trim( $request.body.presentation_id )
    , $entry = _.first( Presentation.available, _.all({ id: $presentation_id }) )
    , $exists = !!$entry
    , $user = User.find( $session.user )
    , $errors = new $$validation()
    
    // model used by the view
    , $model = {
      user: $user,
      presentation: null,
      presentation_id: $presentation_id,
      available: Presentation.available,
      name: _.trim( $request.body.name ),
      email: _.trim( $request.body.email ),
      errors: $errors
    }, 

    // attempts to log a user in
    _attempt_login = function() {

      // make sure they aren't already logged in
      if ( $model.user ) {
        if ( $user.presentation_id && !!Presentation.active[ $user.presentation_id ] )
          $errors.user = 'in_session';
        return;
      }

      // try and create the new account
      _.merge( $errors, User.validate( $model ) );
      if ( $errors.any ) return;

      // otherwise, log in the user
      $model.user = User.login( $model, $session );

    },

    // tries to create the presentation session
    _attempt_create_presentation = function() {

      // try and find the presentation first
      if ( !$exists )
        return ( $errors.presentation_id = 'missing' );

      // create the actual presentation
      var presentation = new Presentation( $presentation_id, { expand: true });
      presentation.add( $model.user );

      // try and register for use
      Presentation.register( presentation );

      // successfully created and added presentation
      $presentation = $model.presentation = presentation;
      $model.success = true;

    },

    // attempt to login for this user
    _attempt_start = function() {
      $$validation.run( $errors, 
        _attempt_login,
        _attempt_create_presentation
        );
    },

    // handle the request
    _run = function() {
      if ( $post ) _attempt_start();
      if ( $model.success )
        $response.redirect( '/' + $model.presentation.identity );
      else
        $response.render( $view, $model );
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