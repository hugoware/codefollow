
describe( '`customer` element', function() {
  it( 'should exist', function() { expect ( $('.customer').length ).toBe( 1 ); });
});

describe( 'within `customer`', function() {
  it( 'should have an `h3` element', function() { expect ( $('.customer h3').length ).toBe( 1 ); }) ; 
  it( 'and equal `fred`', function() { expect ( $('.customer h3').text() ).toBe( 'Fred Smith' ); });

  it( 'should have a `p` element', function() { expect ( $('.customer p').length ).toBe( 1 ); });
  it( 'and equal `fred`', function() { expect ( $('.customer p').text() ).toBe( 'Software Engineer' ); });
});