var $$class = module.exports = function JoinPresentationRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $route = request.route
    , $post = /post/i.test( $request.method )
    
    // where to go
    , $view = 'join'
    , $redirect = null
    , $presentation_id = _.trim( $request.body.presentation_id || $route.params.presentation_id )
    , $presentation = Presentation.active[ _.numbers( $presentation_id ) ]
    , $exists = !!$presentation
    , $user = User.find( $session.user )
    , $active = $user && Presentation.active[ $user.presentation_id ]
    , $errors = new $$validation()
    
    // model used by the view
    , $model = {
      user: $user,
      exists: $exists,
      active: $active,
      presentation: $presentation,
      presentation_id: $presentation_id,
      name: _.trim( $request.body.name ),
      email: _.trim( $request.body.email ),
      errors: $errors
    }, 

    // attempts to log a user in
    _validate_user = function() {
      _.merge( $errors, User.validate( $model ) );
    },

    // tries to create the presentation session
    _validate_presentation = function() {
      if ( !$exists ) 
        $errors.presentation_id = 'missing';
    },

    // attempt to login for this user
    _join = function() {

      // log out and back in
      if ( $user ) User.logout( $user );
      $user = User.login( $model, $session );

      // include the user
      $presentation.add( $user );

      // goto the presentation
      $response.redirect( '/{1}/'.assign( $presentation.identity ) );
    },

    // handle the request
    _run = function() {
      if ( $post )
        $$validation.run( $errors, 
          _validate_user,
          _validate_presentation,
          _join );
      
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