var $$class = module.exports = function EchoRequest( request, response ) {
  var $this = this

    , $request = request
    , $response = response
    , $session = request.session
    , $route = request.route
    , $post = /post/i.test( $request.method )

    // model used by the view
    , $model = {
      method: ( $request.method || '' ).toString().toUpperCase(),
      body: null,
      query: null
    }, 

    // updates remaining properties for the view
    _get_submission = function() {

      // stuff from the post body
      for ( var v in $request.body ) {
        $model.body = $model.body || { };

        // save this for later
        var value = $request.body[ v ];
        if ( !Object.isArray( value )) value = [ value ];
        $model.body[ v ] = value;
      }

      // stuff from the query string
      for ( var v in $request.query ) {
        $model.query = $model.query || { };

        // save this for later
        var value = $request.query[ v ];
        if ( !Object.isArray( value )) value = [ value ];
        $model.query[ v ] = value;
      }
      
    },

    // handle the request
    _run = function() {
      _get_submission();
      $response.render( 'echo', $model );
    };



  __define( $this, { 
    run: _run
  });

};


__request( $$class );