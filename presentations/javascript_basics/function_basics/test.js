
describe( 'function `save`', function() {
  it( 'should should exist', function() { expect ( 'save' in window ).toBe( true ); });
  it( 'it should be a function', function() { expect( typeof( save ) == 'function' || save instanceof Function ).toBe( true ); });
});

describe( 'function `save`', function() {
  it( 'can be invoked', function() { expect ( save ).not.toThrow(); });
  it( 'does not return a value', function() { expect ( save() == null ).toBe( true ); });
});

describe( 'function `find`', function() {
  it( 'should should exist', function() { expect ( 'find' in window ).toBe( true ); });
  it( 'it should be a function', function() { expect( typeof( find ) == 'function' || find instanceof Function ).toBe( true ); });
});

describe( 'function `find`', function() {
  it( 'can be invoked', function() { expect ( find ).not.toThrow(); });
  it( 'does not return a value', function() { expect ( find() == 'javascript' ).toBe( true ); });
});