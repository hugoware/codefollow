var $$class = module.exports = function MissingRequest( request, response ) {
  var $this = this
    , $request = request
    , $response = response

    // handle the request
    _run = function() {
      $response.status( 404 );

      // html
      if ( $request.accepts('html') )
        $response.render('missing', { errors: null });

      // json
      else if ( $request.accepts('json') )
        $response.send({ error: 'not found' })

      // whatever
      else
        $response.type('txt')
          .send('not found');

    };

  __define( $this, { 
    run: _run
  });

};


__request( $$class );