
// executes the tests
describe( 'variable `a`', function() {
  it( 'should should exist', function() { expect ( 'a' in window ).toBe( true ); });
  it( 'it should equal to `3` ', function() { expect( a === 3 ).toBe( true ); });
});

describe( 'variable `b`', function() {
  it( 'it should exist', function() { expect ( 'b' in window ).toBe( true ); });
  it( 'variable `b` should equal to `false` ', function() { expect( b === false ).toBe( true ); });
});

describe( 'variable `c`', function() {
  it( 'it should exist', function() { expect ( 'c' in window ).toBe( true ); });
  it( 'it should equal to `name` ', function() { expect( c ).toBe( 'name' ); });  
});

describe( 'variable `d`', function() {
  it( 'it should exist', function() { expect ( 'd' in window ).toBe( true ); });
  it( 'should only have `3` values ', function() { expect( d.length ).toBe( 3 ); });  
  it( 'first value should equal to `a` ', function() { expect( d[0] ).toBe( 'a' ); });  
  it( 'second value should equal to `b` ', function() { expect( d[1] ).toBe( 'b' ); });  
  it( 'third value should equal to `c` ', function() { expect( d[2] ).toBe( 'c' ); });  
});

describe( 'variable `e`', function() {
  it( 'it should exist', function() { expect ( 'e' in window ).toBe( true ); });
  it( 'should only have one property ', function() {
    var count = 0;
    for ( var i in e ) count++;
    expect( count ).toBe( 1 ); 
  });  
  it( 'should have property named `color` ', function() { expect( 'color' in e ).toBe( true ); });  
  it( 'property color should equal `blue` ', function() { expect( e.color ).toBe( 'blue' ); });  
});