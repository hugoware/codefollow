

describe( 'function `add`', function() {
  it( 'should should exist', function() { expect ( 'add' in window ).toBe( true ); });
  it( 'it should be a function', function() { expect( typeof( add ) == 'function' || add instanceof Function ).toBe( true ); });
  it( 'can be invoked', function() { expect ( add ).not.toThrow(); });
});

describe( 'with strings', function() {
  var count = 0|Math.random() * 100
    , args = [ ];

  // generate a random series of strings
  for ( var i = 0; i < count; i ++ )
    args.push( ( 0|Math.random() * 10 ).toString() );
  var result = args.join('');

  // final value
  it( 'should return correct result', function() { expect ( add.apply( null, args ) == result ).toBe( true ); });
});


describe( 'with numbers', function() {
  var count = 0|Math.random() * 100
    , result = 0
    , args = [ ];

  // generate a random series of strings
  for ( var i = 0; i < count; i ++ ) {
    var value = 0|Math.random() * 10;
    result += value;
    args.push( value );
  }

  it( 'should return correct result', function() { expect ( add.apply( null, args ) == result ).toBe( true ); });
});


describe( 'with booleans', function() {
  var count = 0|Math.random() * 100
    , result = 0
    , args = [ ];

  // generate a random series of strings
  for ( var i = 0; i < count; i ++ ) {
    var value = !!( 0|Math.random() * 10 > 5 );
    result += value;
    args.push( value );
  }

  it( 'should return correct result', function() { expect ( add.apply( null, args ) == result ).toBe( true ); });
});


describe( 'with mixed types', function() {
  
  // random selections
  var grab = [
    function() { return [ 'a', 'b', 'c', 'd', 'e' ][ 0|Math.random() * 5 ]; },
    function() { return 0|Math.random() * 50; },
    function() { return !( 0|Math.random() * 10 > 5 ); }
  ];

  var result
    , count = 0|Math.random() * 50
    , args = [ ];

  // add on each value
  for ( var i = 0; i < count; i++ ) {
    var pick = 0|Math.random() * 3
      , value = grab[ pick ]();
    args.push( value );

    // add on the value
    result = result ? result + value : value;
  }
  
  // test the result
  it( 'should return correct result', function() { expect ( add.apply( null, args ) == result ).toBe( true ); });

});
