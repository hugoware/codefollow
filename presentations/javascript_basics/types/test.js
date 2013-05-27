
describe( 'function `is_number`', function() {
  var number = 0|Math.random() * 200
    , instance = new Number( number );

  it( 'should exist', function() { expect( 'is_number' in window ).toBe( true ); })
  it( 'should be a function', function() { expect( typeof is_number == 'function' || is_number instanceof Function ).toBe( true ); })
  it( 'should work with a number', function() { expect( is_number( number ) ).toBe( true ); })
  it( 'should work with `new Number()`', function() { expect( is_number( instance ) ).toBe( true ); })
  it( 'should return false with invalid types', function() {
    expect( is_number( 'eee' ) ).toBe( false ); 
    expect( is_number( false ) ).toBe( false ); 
    expect( is_number( { } ) ).toBe( false ); 
  })
});

describe( 'function `is_string`', function() {
  var string = Math.random().toString(36)
    , instance = new String( string );

  it( 'should exist', function() { expect( 'is_string' in window ).toBe( true ); })
  it( 'should be a function', function() { expect( typeof is_string == 'function' || is_string instanceof Function ).toBe( true ); })
  it( 'should work with a string', function() { expect( is_string( string ) ).toBe( true ); })
  it( 'should work with `new String()`', function() { expect( is_string( instance ) ).toBe( true ); })
  it( 'should return false with invalid types', function() {
    expect( is_string( 33 ) ).toBe( false ); 
    expect( is_string( false ) ).toBe( false ); 
    expect( is_string( { } ) ).toBe( false ); 
  })
});

describe( 'function `is_array`', function() {
  it( 'should exist', function() { expect( 'is_array' in window ).toBe( true ); })
  it( 'should be a function', function() { expect( typeof is_array == 'function' || is_array instanceof Function ).toBe( true ); })
  it( 'should work with `[]`', function() { expect( is_array( [] ) ).toBe( true ); })
  it( 'should work with `new Array()`', function() { expect( is_array([]) ).toBe( true ); })
  it( 'should return false with invalid types', function() {
    expect( is_array( 33 ) ).toBe( false ); 
    expect( is_array( false ) ).toBe( false ); 
    expect( is_array( { } ) ).toBe( false ); 
  })
});

describe( 'function `is_user`', function() {
  var user = new window.User();
  it( 'should exist', function() { expect( 'is_user' in window ).toBe( true ); })
  it( 'should be a function', function() { expect( typeof is_user == 'function' || is_user instanceof Function ).toBe( true ); })
  it( 'should work with `new User()`', function() { expect( is_user( user ) ).toBe( true ); })
  it( 'should return false with invalid types', function() {
    expect( is_user( 33 ) ).toBe( false ); 
    expect( is_user( false ) ).toBe( false ); 
    expect( is_user( { } ) ).toBe( false ); 
  })
});

