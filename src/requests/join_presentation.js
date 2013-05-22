module.exports = $$class = function JoinPresentationRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $post = /post/i.test( $request.method )
    
    // where to go
    , $view = 'join'
    , $redirect = null
    , $presentation_id = _.numbers( $request.body.presentation_id )
    , $presentation = Presentation.active[ $presentation_id ]
    , $exists = !!$presentation
    , $user = User.find( $session.user )
    , $active = $user && Presentation.active[ $user.presentation_id ]
    , $errors = new $$validation()
    
    // model used by the view
    , $model = {
      user: $user,
      exists: $exists,
      presentation: $presentation,
      presentation_id: _.trim( $request.body.presentation_id ),
      name: _.trim( $request.body.name ),
      email: _.trim( $request.body.email ),
      errors: $errors
    }, 

    // attempts to log a user in
    _attempt_login = function() {

      // make sure they aren't already logged in
      if ( $user ) {
        if ( $active )
          $errors.user = 'in_session';
        return;
      }

      // try and create the new account
      _.merge( $errors, User.validate( $model ) );
      if ( $errors.any ) return;

      // otherwise, log in the user
      $user = User.login( $model, $session );

    },

    // tries to create the presentation session
    _attempt_join = function() {

      // try and find the presentation first
      if ( !$exists )
        return $errors.presentation_id = 'missing';

      // include the user
      $presentation.add( $user );
    },

    // attempt to login for this user
    _attempt_start = function() {
      $$validation.run( $errors, 
        _attempt_login,
        _attempt_join
        );
    },

    // handle the request
    _run = function() {
      if ( $post ) _attempt_start();
      if ( $post && $errors.none )
        $response.redirect( '/{1}/'.assign( $presentation.identity ) );
      else
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