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
    , $presentation = Presentation.active[ $presentation_id ]
    , $errors = new $$validation()
    , $user = User.find( $session.user )
    
    // requested slide
    , $requested_at = _.numbers( $request.body.at )
    , $at = ( parseInt( $requested_at ) || 0 )
    , $missing_at = $requested_at.length == 0
    
    // model used by the view
    , $model = {
      errors: $errors,
      user: $user,
      presentation_id: $presentation_id,
      presentation: $presentation
    }, 

    // make sure the presentation exists
    _validate_presentation = function() {
      if ( !($presentation instanceof Presentation )) 
        $errors.error = 'missing_presentation';
    },

    // check if this user can be used
    _validate_user = function() {
      if ( !$presentation.is_member( $user ) )
        $errors.error = 'invalid_user';
    },

    // determines how to render a view
    _show_view = function( view ) {
      if ( !view )
        return;
      else if ( view.type == 'slide' )
        _show_as_slide( view );
      else if ( view.type == 'test' )
        _show_as_test( view );
      else if ( view.type == 'ranking' )
        _show_as_ranking( view );
    },

    // renders an entire test
    _show_as_test = function( test ) {
      Object.merge( $json, test );
      Object.merge( $json, { 
        zones: test.zones_for( $user )
      });
    },

    // slides are fine as is
    _show_as_slide = function( slide ) {
      Object.merge( $json, slide );
    },

    // displays each ranking
    _show_as_ranking = function( ranking ) {
      var results = ranking.results( $user );
      Object.merge( $json, results );
    },

    // set the view information
    _set_success = function() {
      $json = { success: true, at: $presentation.index };

      // only include content if needed
      if ( $missing_at || $presentation.views[ $at ] == null || $at != $presentation.index )
        _show_view( $presentation.view );        
    },

    // unable to display
    _set_failed = function() {
      $json = {
        success: false,
        error: $errors.error
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