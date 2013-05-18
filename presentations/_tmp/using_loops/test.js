
// executes the tests
describe( 'loop should execute', function() {
  it( '100 times', function() { expect ( window.mx.add ).toBe( 100 ); });
});

describe( 'while should loop', function() {
  it( 'until false is returned', function() { expect ( window.mx.end ).toBe( 50 ); });
});