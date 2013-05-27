describe( 'function `Animal`', function() {
  it( 'should exist', function() { expect( 'Animal' in window ).toBe( true ); });
  it( 'can create instances', function() { expect( new Animal instanceof Animal ).toBe( true ); });
});

describe( '`Animal` prototype', function() {
  it( 'should have multiple values', function() {
    var count = 0;
    for ( var v in Animal.prototype ) count++;
    expect( count ).toBe( 2 ); 
  })

  it( 'should have a `name` property', function() { expect( 'name' in Animal.prototype ).toBe( true ); });
  it( 'and should be a string', function() { expect( typeof Animal.prototype.name == 'string' || Animal.prototype.name instanceof String ).toBe( true ); });
  it( 'and should equal `animal`', function() { expect( Animal.prototype.name ).toBe( 'animal' ); });
  it( 'should have a `eat` function', function() { expect( 'eat' in Animal.prototype ).toBe( true ); });
  it( 'and returns `animal eats`', function() { expect( /animal ?eats/i.test( (new Animal).eat() ) ).toBe( true ); });
});

describe( 'function `Dog`', function() {
  it( 'should exist', function() { expect( 'Dog' in window ).toBe( true ); });
  it( 'can create instances', function() { expect( new Dog instanceof Dog ).toBe( true ); });
});

describe( '`Dog` prototype', function() {
  it( 'should have multiple values', function() {
    var count = 0;
    for ( var v in Dog.prototype ) count++;
    expect( count ).toBe( 2 ); 
  });

  it( 'should have a `name` property', function() { expect( 'name' in Dog.prototype ).toBe( true ); });
  it( 'and should be a string', function() { expect( typeof Dog.prototype.name == 'string' || Dog.prototype.name instanceof String ).toBe( true ); });
  it( 'and should equal `animal`', function() { expect( Dog.prototype.name ).toBe( 'animal' ); });
  it( 'should have a `eat` function', function() { expect( 'eat' in Dog.prototype ).toBe( true ); });
  it( 'and returns `animal eats`', function() { expect( /animal ?eats/i.test( (new Dog).eat() ) ).toBe( true ); });
});

