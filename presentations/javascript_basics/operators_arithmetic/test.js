
describe( 'variable `first`', function() {
  var result = window.__a + window.__b;
  it( 'should exist', function() { expect( 'first' in window ).toBe( true ); })
  it( 'should be correct type', function() { expect( typeof first == 'number' || first instanceof Number ).toBe( true ); })
  it( 'should be correct value', function() { expect( first ).toBe( result ); })
});

describe( 'variable `second`', function() {
  var result = window.__b - window.__a;
  it( 'should exist', function() { expect( 'second' in window ).toBe( true ); })
  it( 'should be correct type', function() { expect( typeof second == 'number' || second instanceof Number ).toBe( true ); })
  it( 'should be correct value', function() { expect( second ).toBe( result ); })
});

describe( 'variable `third`', function() {
  var result = ( window.__b / window.__a ).toFixed( 3 );
  it( 'should exist', function() { expect( 'third' in window ).toBe( true ); })
  it( 'should be correct type', function() { expect( typeof third == 'number' || third instanceof Number ).toBe( true ); })
  it( 'should be correct value', function() { 
    var fixed = ( new Number( third ) ).toFixed( 3 );
    expect( fixed ).toBe( result ); 
  })
});

describe( 'variable `fourth`', function() {
  var result = window.__a * window.__b;
  it( 'should exist', function() { expect( 'fourth' in window ).toBe( true ); })
  it( 'should be correct type', function() { expect( typeof fourth == 'number' || fourth instanceof Number ).toBe( true ); })
  it( 'should be correct value', function() { expect( fourth ).toBe( result ); })
});