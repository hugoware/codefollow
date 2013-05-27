describe( 'function `Counter`', function() {
  it( 'should exist', function() { expect( typeof Counter ).not.toBe( 'undefined' ); })
  it( 'can be instantiated', function() { expect( new Counter instanceof Counter ).toBe( true ); })
  it( 'and not throw an exception', function() { new Counter; expect( true ).toBe( true ); });
});

describe( 'the `Counter` constructor', function() {
  var value = 0|Math.random() * 100;
  it( 'accept zero arguments', function() { expect( (new Counter).value ).toBe( 0 ); });
  it( 'accept a default start value', function() { expect( (new Counter( value )).value ).toBe( value ); });
});

describe( 'function `increment`', function() {
  it( 'to add correctly', function() {
    var start = 0|Math.random() * 50
      , attempt = 0|Math.random() * 50
      , result = start + attempt
      , counter = new Counter( start );

    // run the times
    for ( var i = 0; i < attempt; i++ )
      counter.increment();

    expect( result ).toBe( counter.value ); 
  });
});

describe( 'function `reset`', function() {
  it( 'to clear the counter', function() {
    var start = 0|Math.random() * 50
      , attempt = 0|Math.random() * 50
      , result = start + attempt
      , counter = new Counter( start );

    // run the times
    for ( var i = 0; i < attempt; i++ )
      counter.increment();

    counter.reset();

    // run the times
    for ( var i = 0; i < attempt; i++ )
      counter.increment();

    expect( attempt ).toBe( counter.value ); 
  });
});
