
// executes the tests
describe( 'variable `a`', function() {
  it( 'should should exist', function() { expect ( 'a' in window ).toBe( true ); });
  it( 'it should equal to `3` ', function() { expect( a ).toBe( 3 ); });
});

describe( 'variable `b`', function() {
  it( 'it should exist', function() {
    expect ( 'b' in window ).toBe( true );
  });

  it( 'variable `b` should equal to `false` ', function() {
    expect( b ).toBe( false );
    expect( b ).not.toBe( true );
  });
});

describe( 'variable `c`', function() {
  it( 'it should exist', function() { expect ( 'c' in window ).toBe( true ); });
  it( 'it should equal to `name` ', function() { expect( c ).toBe( 'name' ); });  
});