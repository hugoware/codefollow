
describe( 'Server.handle', function() {
  it( 'should exist', function() { expect( 'handle' in Server ).toBe( true ); })
  it( 'should not fail', function() { expect( Server.start ).not.toThrow(); })
  it( 'should process all messages', function() { expect( window.__count == window.__messages.length ).toBe( true ); })
  it( 'should apply/call changes using `Server`', function() { expect( window.__handled == window.__count ).toBe( true ); })
  it( 'should use apply/call to pass all arguments', function() { expect( window.__valid ).toBe( true ); })
});

describe( 'Server.handle for `error`', function() {
  
  // recalculate
  var result;
  var grab = function() {
    if ( result ) return result;

    // grab all messages
    var errors = [ ], actual;
    try {
      for ( var i in window.__messages )
        if ( window.__messages[i][0] == 'error' )
          errors.push( window.__messages[i][1].join('') );

      // save findings
      value = window.__error.join('')
      actual = errors.join('');
    }
    // testing will catch
    catch( e ) { }
    return ( result = { errors: errors, value: value, actual: actual } );
  }

  it( 'should handle all errors', function() { 
    grab();
    expect( result.errors.length == window.__error.length ).toBe( true ); 
  });

  it( 'should pass all arguments', function() {
    grab();
    expect( result.value ).toBe( result.actual ); 
  });
  
});


describe( 'Server.handle for `route`', function() {
  
  // recalculate
  var result;
  var grab = function() {
    if ( result ) return result;

    // grab all messages
    var routes = [ ], actual;
    try {
      for ( var i in window.__messages )
        if ( window.__messages[i][0] == 'route' )
          routes.push( window.__messages[i][1].join('') );

      // save findings
      value = window.__route.join('')
      actual = routes.join('');
    }
    // testing will catch
    catch( e ) { }
    return ( result = { routes: routes, value: value, actual: actual } );
  }

  it( 'should handle all routes', function() { 
    grab();
    expect( result.routes.length == window.__route.length ).toBe( true ); 
  });

  it( 'should pass all arguments', function() {
    grab();
    expect( result.value ).toBe( result.actual ); 
  });
  
});


describe( 'Server.handle for `send`', function() {
  
  // recalculate
  var result;
  var grab = function() {
    if ( result ) return result;

    // grab all messages
    var sends = [ ], actual;
    try {
      for ( var i in window.__messages )
        if ( window.__messages[i][0] == 'send' )
          sends.push( window.__messages[i][1].join('') );

      // save findings
      value = window.__send.join('')
      actual = sends.join('');
    }
    // testing will catch
    catch( e ) { }
    return ( result = { sends: sends, value: value, actual: actual } );
  }

  it( 'should handle all sends', function() { 
    grab();
    expect( result.sends.length == window.__send.length ).toBe( true ); 
  });

  it( 'should pass all arguments', function() {
    grab();
    expect( result.value ).toBe( result.actual ); 
  });
  
});