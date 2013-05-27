describe( 'function `download`', function() {
  it( 'should be called', function() { expect( window.__download > 0 ).toBe( true ); })
  it( 'called only one time', function() { expect( window.__download == 1 ).toBe( true ); })
});

describe( 'a callback', function() {
  it( 'should be passed into `download`', function() { expect( window.__callback ).not.toBe( null ); })
  it( 'should be a function', function() { expect( typeof window.__callback == 'function' || window.__callback instanceof Function ).toBe( true ); })
  it( 'should accept arguments', function() { expect( window.__callback.length > 0 ).toBe( true ); })
});

describe( 'when invoked, the callback', function() {
  it( 'should use `save` to write file names', function() { expect( window.__save > 0 ).toBe( true ); })
  it( "shouldn't write `null` values", function() { expect( window.__save == 12 ).toBe( true ); })
});