
// executes the tests
describe( 'for loop should', function() {
  it( 'call add', function() { expect ( window.__add > 0 ).toBe( true ); });
  it( 'exactly 300 times', function() { expect ( window.__add ).toBe( 300 ); });
});

describe( 'while loop should', function() {
  it( 'call read', function() { expect ( window.__at > 0 ).toBe( true ); });
  it( "until 'cat' is returned", function() { expect ( window.__at ).toBe( 46 ); });
});