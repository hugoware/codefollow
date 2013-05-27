
describe( 'variable `first`', function() {
  var result = window.__a > window.__b;
  it( 'should exist', function() { expect( 'first' in window ).toBe( true ); })
  it( 'should be a boolean', function() { expect( typeof first == 'boolean' || first instanceof Boolean ).toBe( true ); })
  it( 'should be correct', function() { expect( first ).toBe( result ); })
});

describe( 'variable `second`', function() {
  var result = window.__a < window.__b;
  it( 'should exist', function() { expect( 'second' in window ).toBe( true ); })
  it( 'should be a boolean', function() { expect( typeof second == 'boolean' || second instanceof Boolean ).toBe( true ); })
  it( 'should be correct', function() { expect( second ).toBe( result ); })
});

describe( 'variable `third`', function() {
  var result = window.__a == window.__b;
  it( 'should exist', function() { expect( 'third' in window ).toBe( true ); })
  it( 'should be a boolean', function() { expect( typeof third == 'boolean' || third instanceof Boolean ).toBe( true ); })
  it( 'should be correct', function() { expect( third ).toBe( result ); })
});
