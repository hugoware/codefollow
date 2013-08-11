var fruits;

(function() {

  // quick testing result property
  function _test( share ) {
    Object.defineProperty( window, share.name, { configurable: false, enumerable: false, get: share });
  }

  // capture methods
  var _assign = String.prototype.assign
    , _forEach = Array.prototype.forEach
    , _sortBy = Array.prototype.sortBy
    , _map = Array.prototype.map;

  // quick random number
  var _rnd = function() { return 0|(Math.random() * 25) + 1; },
    _verify_all = function( items_a, items_b ) {
      if ( items_a.length == 0 || items_a.length != items_b.length ) return false;
      for ( var a in items_a )
        if ( items_a[a] != items_b[a] ) return false;
      return true;
    },
    _clone_obj = function( clone ) { var obj = { }; for ( var p in clone ) obj[p] = clone[p]; return obj; },
    _clone = function( clone ) {
      if ( clone instanceof Array || typeof clone == 'array' ) {
        clone =  clone.slice();
        for ( var c in clone ) clone[c] = _clone( clone[c] );
      }
      else clone = _clone_obj( clone );
      return clone;
    };

  // declare variables
  var $this = this
    , $fruits = [ 'orange', 'apple', 'pear', 'grape', 'banana', 'kiwi', 'strawberry' ].map( function( fruit ) { return { name: fruit, count: _rnd() }; })
    , $total = $fruits.length
    , $sorted = _sortBy.call( _clone( $fruits ), 'count', true )
    , $expect = _map.call( $sorted, function( fruit ) { return 'total {name} count is {count}'.assign( fruit ); })
    , $calls = { assign: 0, log: 0, sort_by: 0, for_each: 0 }

    // different test results
    , $messages = [ ]
    , $assign_format
    , $sort_by = { }
    , $for_each = { }
    , $assign = { results:[ ] }
    , $console_log = { messages:[ ] };


  // override and capture attempts
  String.prototype.assign = function() {
    $assign.format_correct = /total \{1|name\} count is \{2|count\}/i.test( (this || '' ).toString().trim() );
    $calls.assign++;

    // get the result
    var result = _assign.apply( this, arguments );
    $assign.results.push( result );

    return result;
  };

  Array.prototype.sortBy = function() {
    $sort_by.collection = $sort_by.collection || this;
    $sort_by.property = $sort_by.property || arguments[0];
    $calls.sort_by++;

    // make sure they sorted correctly
    $sort_by.result = $sort_by.result || _sortBy.apply( this, arguments );
    $sort_by.order = $sort_by.order || _verify_all( $sort_by.result, $sorted );
    return $sort_by.result;
  };

  Array.prototype.forEach = function() {
    $for_each.is_sort_by_collection = this == $sort_by.result;
    $for_each.use_function = $for_each.use_function || typeof arguments[0] == 'function' || arguments[0] instanceof Function;
    $calls.for_each++;

    // make sure they sorted correctly
    return _forEach.apply( this, arguments );
  };

  // logging
  var $console = window.console
    , _log = window.console.log;

  // var _log = window.console.log;
  window.console.log = function() {
    $calls.log++;
    var message = [].slice.call( arguments ).join(' ').trim();
    $console_log.messages.push( message );
    _log.call( $console, message );
  };


  // proof of tests
  _test( function __sort_by_used() { return $calls.sort_by > 0; });
  _test( function __sort_by_using_fruit() { return $sort_by.collection == $fruits; });
  _test( function __sort_by_fruit_by_count() { return $sort_by.property == 'count'; });
  _test( function __for_each_used() { return $calls.for_each > 0; });
  _test( function __for_each_provided_function() { return $for_each.use_function; });
  _test( function __for_each_with_sorted_collection() { return $for_each.is_sort_by_collection; });
  _test( function __assign_used_correct_count() { return $calls.assign == $total; });
  _test( function __assign_correct_template() { return $assign.format_correct; });
  _test( function __assign_correct_results() { return _verify_all( $assign.results, $expect ); });
  _test( function __console_log_used() { return $calls.log == $total; });
  _test( function __console_log_correct_results() { return _verify_all( $console_log.messages, $expect ); });


  fruits = $fruits;

})();