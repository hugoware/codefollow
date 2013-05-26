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
    , $password = _.trim( $request.body.password )
    , $entry = _.first( Presentation.available, _.all({ id: $presentation_id }) )
    , $exists = !!$entry
    , $user = User.find( $session.user )
    , $active = $user && Presentation.active[ $user.presentation_id ]
    , $errors = new $$validation()
    , $presentation
    
    // model used by the view
    , $model = {
      user: $user,
      presentation: null,
      presentation_id: $presentation_id,
      available: Presentation.available,
      name: _.trim( $request.body.name ),
      email: _.trim( $request.body.email ),
      active: $active,
      errors: $errors
    }, 

    // verify the password is okay
    _validate_password = function() {
      if ( $password != $$config.password )
        $errors.password = 'incorrect';
    },

    // attempts to log a user in
    _validate_user = function() {
      _.merge( $errors, User.validate( $model ) );
    },

    _validate_presentation = function() {
      if ( !$exists )
        $errors.presentation_id = 'missing';
    },

    // tries to create the presentation session
    _start = function() {

      // log out and back in
      if ( $user ) User.logout( $user );
      $user = User.login( $model, $session );

      // add a presentation
      var presentation = new Presentation( $presentation_id, { expand: true });
      Presentation.register( presentation );

      // and add the user
      presentation.add( $user );

      // successfully created and added presentation
      $model.presentation = $presentation = presentation;

      // send to the correct location
      $response.redirect( '/{1}/'.assign( $presentation.identity ) );

    },

    // handle the request
    _run = function() {
      if ( $post )
        $$validation.run( $errors, 
          _validate_user,
          _validate_password,
          _validate_presentation,
          _start );
      
      // show the required view
      if ( !$post || $errors.any )
        $response.render( $view, $model );
    };


  __define( $this, { 
    run: _run,

    errors: { get: function() { return $errors; } },
    presentation: { get: function() { return $presentation; } },
    available: { get: function() { return Presentation.available; } },
    user: { get: function() { return $user; } }
  });

};

__request( $$class );