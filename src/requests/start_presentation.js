module.exports = $$class = function StartPresentationRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $post = /post/i.test( $request.method )
    
    // where to go
    , $view = 'start'
    , $redirect = null
    
    // model used by the view
    , $model = {
      user: User.find( $session.user ),
      presentation: null,
      available: Presentation.available,

      name: _.trim( $request.body.name ),
      email: _.trim( $request.body.email ),
      presentation_id: _.trim( $request.body.presentation_id ),
      errors: new $$validation()
    }, 

    // attempts to log a user in
    _attempt_login = function() {

      // make sure they aren't already logged in
      if ( $model.user ) {
        if ( $model.user.presentation_id )
          $model.errors.user = 'in_session';
        return;
      }

      // try and create the new account
      _.merge( $model.errors, User.validate( $model ) );
      if ( $model.errors.any ) return;

      // otherwise, log in the user
      $model.user = User.login( $model, $session );

    },

    // tries to create the presenation session
    _attempt_create_presentation = function() {

      // try and find the presentation first
      var entry = _.first( Presentation.available, _.all({ id: $model.presentation_id }) );
      if ( entry == null )
        return ( $model.errors.presentation_id = 'missing' );

      // create the actual presentation
      $model.presentation = new Presentation( entry.key, { expand: true });
      $model.presentation.add( $model.user );

      // try and register for use
      Presentation.register( $model.presentation );

      // successfully created and added presentation
      $model.success = true;

    },

    // attempt to login for this user
    _attempt_start = function() {
      _attempt_login();

      if ( $model.errors.none )
        _attempt_create_presentation();
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