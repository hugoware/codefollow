
describe( 'function `add`', function() {
  it( 'should should exist', function() { expect ( 'add' in window ).toBe( true ); });
  it( 'it should be a function', function() { expect( typeof( add ) == 'function' || add instanceof Function ).toBe( true ); });
  it( 'can be invoked', function() { expect ( add ).not.toThrow(); });
});

describe( 'with strings', function() {
  var a = ( 0|(Math.random() * 1000) ).toString() + 'AA'
    , b = ( 0|(Math.random() * 1000) ).toString() + 'AA'
    , result = ( a + b );
  it( 'should return correct result', function() { expect ( add( a, b ) == result ).toBe( true ); });
});

describe( 'with numbers', function() {
  var a = ( 0|(Math.random() * 1000) )
    , b = ( 0|(Math.random() * 1000) )
    , result = ( a + b );
  it( 'should return correct result', function() { expect ( add( a, b ) == result ).toBe( true ); });
});

describe( 'with booleans', function() {
  it( 'should return correct result', function() { expect ( add( true, true ) == 2 ).toBe( true ); });
});

describe( 'with mixed types', function() {
  var a = ( 0|(Math.random() * 1000) ).toString() + 'AA'
    , b = ( 0|(Math.random() * 1000) )
    , result = ( a + b );
  it( 'should return correct result', function() { expect ( add( a, b ) == result ).toBe( true ); });
});
