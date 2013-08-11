
describe( '`customer` element', function() {
  it( 'should exist', function() { expect ( __has_customer ).toBe( true ); });
});

describe( '`h3` within `customer`', function() {
  it( 'should exist', function() { expect ( __has_h3 ).toBe( true ); }) ; 
  it( 'and equal `Fred Smith`', function() { expect ( __h3_set_correctly ).toBe( true ); });
  it( 'and set using jQuery', function() { expect ( __h3_not_pre_set ).toBe( true ); });
  it( 'and should only affect within `customer`', function() { expect ( __h3_limited_scope ).toBe( true ); });
});

describe( '`p` within `customer`', function() {
  it( 'should exist', function() { expect ( __has_p ).toBe( true ); }); 
  it( 'be added using jQuery', function() { expect ( __p_added_via_script ).toBe( true ); }); 
  it( 'and equal `Developer`', function() { expect ( __p_set_correctly ).toBe( true ); });
  it( 'and should only affect within `customer`', function() { expect ( __p_limited_scope ).toBe( true ); });
});