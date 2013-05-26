function load( database ) {
  try {
    database.connect()
    database.read();
  }
  catch ( e ) {
    database.log( e );
  }
  finally {
    database.disconnect();
  }
}

// run their code
try {
  for ( var i = 0; i < 100; i++ )
    load( window.__database );
}

// whatevz...
catch ( e ) {
  window.__exceptions = true;
}


describe( 'function `load`', function() {
  it( 'should should exist', function() { expect ( 'load' in window ).toBe( true ); });
  it( 'it should be a function', function() { expect( typeof( load ) == 'function' || load instanceof Function ).toBe( true ); });
  it( 'it should not throw exceptions', function() { expect( window.__exceptions ).not.toBe( true ); });
});

describe( 'database `open`', function() {
  it( 'should be called once per `load` call', function() { expect ( window.__connect == 100 ).toBe( true ); });
  it( 'should be called once for each `read`', function() { expect ( window.__connect == window.__read ).toBe( true ); });
});

describe( 'database `close`', function() {
  it( 'should be called once per `load` call', function() { expect ( window.__disconnect == 100 ).toBe( true ); });
  it( 'should be called once for each `open`', function() { expect ( window.__disconnect == window.__connect ).toBe( true ); });
});

describe( 'database `log`', function() {
  it( 'should write all exceptions', function() { expect ( window.__log.length == 8 ).toBe( true ); });
  it( 'should have correct log messages', function() { 
    var result = 'timeout,locked,timeout,timeout,locked,timeout,timeout,locked'
      , actual = window.__log.join(',');
    expect ( result ).toBe( actual ); 
  });
});