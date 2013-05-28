describe( 'function `sort`', function() {
  it( 'should exist', function() { expect( 'sort' in window ).toBe( true ); });
  it( 'should not throw exceptions', function() { window.__run(); expect( window.__run ).not.toThrow(); });
});

describe( 'function `red`', function() {
  it( 'should be called', function() { expect( window.__red > 0 ).toBe( true ); });
  it( 'for each `red` color', function() { expect( window.__red == window.__expected_red ).toBe( true ); });
});

describe( 'function `green`', function() {
  it( 'should be called', function() { expect( window.__green > 0 ).toBe( true ); });
  it( 'for each `green` color', function() { expect( window.__green == window.__expected_green ).toBe( true ); });
});

describe( 'function `blue`', function() {
  it( 'should be called', function() { expect( window.__blue > 0 ).toBe( true ); });
  it( 'for each `blue` color', function() { expect( window.__blue == window.__expected_blue ).toBe( true ); });
});

describe( 'function `unknown`', function() {
  it( 'should be called', function() { expect( window.__unknown > 0 ).toBe( true ); });
  it( 'for each `unknown` color', function() { expect( window.__unknown == window.__expected_unknown ).toBe( true ); });
});
