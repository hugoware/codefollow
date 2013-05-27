
describe( 'variable `obj`', function() {
  it( 'should exist', function() { expect( 'obj' in window ).toBe( true ); })
  it( 'should be correct type', function() { expect( typeof obj == 'object' || obj instanceof Object ).toBe( true ); })
  it( 'should be empty object', function() { 
    var count = 0;
    for ( var i in obj ) count++;
    expect( count == 0 ).toBe( true ); 
  })
});


describe( 'variable `collection`', function() {
  it( 'should exist', function() { expect( 'collection' in window ).toBe( true ); })
  it( 'should be correct type', function() { expect( typeof collection == 'array' || collection instanceof Array ).toBe( true ); })
  it( 'should have 10 elements', function() { expect( collection.length ).toBe( 10 ); })
});


describe( 'variable `match`', function() {
  it( 'should exist', function() { expect( 'match' in window ).toBe( true ); })
  it( 'should be correct type', function() { expect( match instanceof RegExp ).toBe( true ); })
  it( 'should have correct expression', function() { expect( match.toString() ).toBe( '/^red$/' ); })
});


describe( 'variable `time`', function() {
  it( 'should exist', function() { expect( 'time' in window ).toBe( true ); })
  it( 'should be correct type', function() { expect( time instanceof Date ).toBe( true ); })
  it( 'should have correct value', function() { 
    var current = new Date()
      , result = current.getDate() + current.getFullYear() + current.getMonth()
      , actual = time.getDate() + time.getFullYear() + time.getMonth();
    expect( actual ).toBe( result ); 
  })
});
