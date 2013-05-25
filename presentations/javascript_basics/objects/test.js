describe( 'object `user`', function() {
  it( 'should be modified (not redefined)', function() { expect ( '___tmp' in user ).toBe( true ); });
});

// executes the tests
describe( 'variable `user`', function() {
  it( 'it should exist', function() { expect ( 'user' in window ).toBe( true ); });
});

describe( 'property `user.first`', function() {
  it( 'it should exist', function() { expect ( 'first' in user ).toBe( true ); });
  it( 'should equal to `Fred` ', function() { expect( user.first ).toBe( 'Fred' ); });
});

describe( 'property `user.last`', function() {
  it( 'it should exist', function() { expect ( 'last' in user ).toBe( true ); });
  it( 'should equal to `Smith` ', function() { expect( user.last ).toBe( 'Smith' ); });
});

describe( 'property `user.email`', function() {
  it( 'it should exist', function() { expect ( 'email' in user ).toBe( true ); });
  it( 'should equal to `fred@sample.com` ', function() { expect( user.email ).toBe( 'fred@sample.com' ); });
});

describe( 'property `user.admin`', function() {
  it( 'it should exist', function() { expect ( 'admin' in user ).toBe( true ); });
  it( 'should equal to `false` ', function() { expect( user.admin ).toBe( false ); });
});

describe( 'property `user.name`', function() {
  it( 'it should not exist', function() { expect ( 'name' in user ).toBe( false ); });
  it( 'should not have a value', function() { expect( user.name == null && !('name' in user) ).toBe( true ); });
});
