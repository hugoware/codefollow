require('./test')( module, {

  generate_id_returns_random_numbers: function() {

    var random = _.generate_id( 10 );
    this.ok( random.length == 10, 'did not return correct count' );
    this.ok( /^[0-9]+$/.test( random ), 'did not only return numbers' );
  },

  generate_id_uses_default_value: function() {
    var random = _.generate_id();
    this.ok( random != null && random.length > 0, 'did not return correct count' );
  },

  hash_correcly_generates_values: function() {
    var value = 'test value'
      , expected = 'd56c753e0f8ce84ba3d3ab284628cf6594fdaa74'
      , actual = _.hash( value );
    this.equal( actual, expected, 'hash was not generated correctly' );
  },

  each_performs_correctly: function() {
    var all = ''
      , indexes = ''
      , expected_all = 'abc'
      , expected_indexes = '012';

    // try the loop once
    _.each( ['a','b','c'], function( index, value ) {
      all += value;
      indexes += index.toString();
    });

    this.equal( all, expected_all, 'all values did not loop' );
    this.equal( indexes, expected_indexes, 'all indexes did not loop' );
  },

  each_can_be_canceled: function() {
    var all = ''
      , indexes = ''
      , expected_all = 'ab'
      , expected_indexes = '01';

    // try the loop once
    _.each( ['a','b','c', 'd', 'e'], function( index, value ) {
      if ( value == 'c' ) return false;
      all += value;
      indexes += index.toString();
    });

    this.equal( all, expected_all, 'loop collected too many values' );
    this.equal( indexes, expected_indexes, 'loop collected too many indexes' );
  },

  trim_works_on_multiple_types: function() {
    this.equal( _.trim(' a '), 'a', 'failed with spaces' );
    this.equal( _.trim('a'), 'a', 'failed no with spaces' );
    this.equal( _.trim( false ), 'false', 'failed with booleans' );
    this.equal( _.trim( 3 ), '3', 'failed with numbers' );
    this.equal( _.trim( null ), '', 'failed with nulls' );
  },

  take_works_with_collections: function() {
    var collection = [ 1, 1, 2, 2, 3, 3, 4, 4 ]
      , evens = _.select( collection, function( value ) { return value % 2 == 0; } )
      , odds = _.select( collection, function( value ) { return value % 2 != 0; } )
      , only_evens = evens[0] == 2 && evens[1] == 2 && evens[2] == 4 && evens[3] == 4
      , only_odds = odds[0] == 1 && odds[1] == 1 && odds[2] == 3 && odds[3] == 3;

    this.ok( only_evens, 'collected too many evens' );
    this.ok( only_odds, 'collected too many odds' );
  },

  compare_performs_liberal_matches: function() {
    this.ok( _.compare('first', 'FIRST'), 'failed string matching');
    this.ok( _.compare( 1, 1 ), 'failed numeric matching' );
  },

  every_allows_manual_control_for_loops: function() {
    var collection = [ 1, 2, 3 ]
      , total = 0
      , even = function( index, value ) { if ( value == 2 ) return false; total+= value; each.next(); }
      , each = function( index, value ) { total+= value; each.next(); }
      , done = function() { total++; };

    _.every( collection, each, done );
    this.equal( total, 7, 'did not complete loop' );

    // check canceling
    _.every( collection, even, done );
    this.equal( total, 8, 'did not cancel loop and ignore done call' );

  },

  will_generate_aliases: function() {
    this.equal( _.alias(), '', 'changes null to empty string' );
    this.equal( _.alias(''), '', 'empty string stays empty' );
    this.equal( _.alias('  abc  ' ), 'abc', 'trims extra spaces' );
    this.equal( _.alias('  ABC  ' ), 'abc', 'converts to lowercase' );
    this.equal( _.alias('  A-B-C  ' ), 'a_b_c', 'replaces non-characters' );
    this.equal( _.alias('  0-1-2  ' ), '0_1_2', 'works with numbers' );
  },

  first_grabs_first_matching_record: function() {
    this.equal( _.first([ 1, 2, 3, 4 ], function( i ) { return i < 2 }), 1, 'did not find correct value of 1' );
    this.equal( _.first([ 1, 2, 3, 4 ], function( i ) { return i > 2 }), 3, 'did not find correct value of 3' );
    this.equal( _.first([ 1, 2, 3, 4 ], function( i ) { return i == 2 }), 2, 'did not find correct value of 3' );
    this.equal( _.first([ 1, 2, 3, 4 ], function( i ) { return i == 5 }), null, 'did not return null' );
  },

  all_any_none_create_generic_matching_functions: function() {
    
    // passing all attempts
    this.equal( _.all({ id:1 })({ id: 1 }), true, 'all should match on basic attempt' );
    this.equal( _.all({ id:1, name:'test' })({ id: 1, name:'test' }), true, 'all should match on multiple values' );

    // failing all attempts
    this.equal( _.all()({ id: 1 }), false, 'all should fail without parameters' );
    this.equal( _.all({ id:1 })( null ), false, 'all should fail when null' );
    this.equal( _.all({ id:1, name:'test' })({ id: 1 }), false, 'all should fail if any is missing' );

    // passing any attempts
    this.equal( _.any({ id:1 })({ id: 1 }), true, 'any should match on basic attempt' );
    this.equal( _.any({ id:1, name:'test' })({ id: 1, name:'test' }), true, 'any should match on multiple values' );
    this.equal( _.any({ id:1, name:'test' })({ id: 1 }), true, 'any should pass if any is matching' );
    
    // failing any attempts
    this.equal( _.any()({ id: 1 }), false, 'any should fail without parameters' );
    this.equal( _.any({ id:1 })( null ), false, 'any should fail when null' );
    this.equal( _.any({ id:2, name:'test' })({ id: 1 }), false, 'any should fail if none match' );

    // passing none attempt
    this.equal( _.none()({ id: 1 }), true, 'did not find a nothing match' );
    this.equal( _.none({ id:1 })({ id: 1 }), false, 'single still found a match' );
    this.equal( _.none({ id:1, name:'test' })({ id: 1 }), false, 'multiple still found a match' );
    this.equal( _.none({ name:'test' })({ id: 1 }), true, 'non match failed' );

  },

  will_merge_objects_together: function() {
    this.deepEqual( _.merge({ a:1 }, { b:1 }), { a:1, b:1 }, 'did not merge into one object' );
    this.deepEqual( _.merge({ a:1 }, { b:1 }, { c:1 }), { a:1, b:1, c:1 }, 'did not merge multiple into one object' );
    this.doesNotThrow( function() { _.merge( {}, null, null ); }, 'threw exception when it should not' );

    var original = { a:1 };
    _.merge( original, { b: 1 });
    this.deepEqual( original, { a:1, b:1 }, 'did not merge original' );
    this.equal( _.merge(), null, 'merge nothing did not return null' );
  },

  numbers_only_formats_values_correctly: function() {
    this.equal( _.numbers( '123' ), '123', 'did not keep basic replace' );
    this.equal( _.numbers( '  123  ' ), '123', 'did not replace spaces' );
    this.equal( _.numbers( '1a23' ), '123', 'did not replace single letter' );
    this.equal( _.numbers( 'asd' ), '', 'did not return empty' );
    this.equal( _.numbers( null ), '', 'did not handle null' );
  }


})