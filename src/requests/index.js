module.exports = $$class = function IndexRequest( request, response ) {
  var $this = this
    , $request = request
    , $response = response
    , 

    // handle the request
    _run = function() {
      $response.render( 'index' )
    };

  __define( $this, {
    run: _run
  });
};


__request( $$class );