describe('variable `a`', function() {
  it( 'should exist', function() { expect ( 'a' in window ).toBe( true ); });
  it( 'be a string', function() { expect ( typeof a == 'string' || a instanceof String ).toBe( true ); });
  it( 'equal `fred`', function() { expect ( a === 'fred' ).toBe( true ); });
});

describe('variable `b`', function() {
  it( 'should exist', function() { expect ( 'b' in window ).toBe( true ); });
  it( 'be a boolean', function() { expect ( typeof b == 'boolean' || b instanceof Boolean ).toBe( true ); });
  it( 'equal `false`', function() { expect ( b === false ).toBe( true ); });
});

describe('variable `c`', function() {
  it( 'should exist', function() { expect ( 'c' in window ).toBe( true ); });
  it( 'be a number', function() { expect ( !isNaN( c ) ).toBe( true ); });
  it( 'equal `33`', function() { expect ( c === 33 ).toBe( true ); });
});