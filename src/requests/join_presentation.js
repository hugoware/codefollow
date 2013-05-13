module.exports = $$class = function JoinPresentationRequest( request, response ) {
  var $this = this
    , $request = request
    , $response = response
    , 

    // handle the request
    _run = function() {
      $response.render( 'index', { title: 'hello' } );
    };


  __define( $this, {
    run: _run,

  });

};




__request( $$class );