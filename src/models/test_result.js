
// a result of executing a user test
var $$class = module.exports = function TestResult( test, content, error ) {
  var $this = this
    , $content = ( content || '' ).toString().trim()

    // other details
    , $test = test
    , $tests = [ ]
    , $messages = [ ]
    , $pass = 0
    , $fail = 0
    , $attempts = 0
    , $error = error
    , $time

    // reading lines from the result
    , $lines = [ ]
    , $current
    ,

    // calculates final score value
    _get_score = function() {
      return Ranking.calculate( $pass, $attempts );
    },

    // start reading the content
    _parse = function() {
      _gather_lines();
      _extract_tests();
      _extract_summary();
    },

    // parse final test results
    _gather_lines = function() {
      var lines = $content.split( /\n/g )
        , gather;

      _.each( lines, function( i, line ) {
        if ( line == '== BEGIN ==' )
          gather = true, $lines = [ ];
        else if ( line == '== END ==' && gather )
          return false;
        else if ( line == '== ERROR ==' && gather )
          return false;
        else if ( gather )
          $lines.push( line );
      });
    },

    // grabs the test results
    _extract_tests = function() {
      _.each( $lines, function( i, line ) {

        // if at the end of the summary
        if ( line == '== SUMMARY ==' )
          return ( $lines = $lines.slice( ++i )) && false;

        // determine the result
        if ( /^\t/.test( line ) )
          _add_result( line );
        else
          _add_test( line );

      });
    },

    // starts a new test item
    _add_test = function( title ) {
      $tests.push(
        $current = {
          title: title,
          tests: [ ]
        });
    },

    // adds a result to the test
    _add_result = function( line ) {
      if ( !!!$current ) return;

      // get the values first
      var parts = line.trim().split(/\t/g)
        , result = {
            name: parts[0],
            pass: 0|parts[1],
            attempts: 0|parts[2]
          };

      // update counts
      $pass += result.pass;
      $attempts += result.attempts;
      $fail += ( result.attempts - result.pass );

      // add the attempt item
      $current.tests.push( result );
    },

    // grabs additional information
    _extract_summary = function() {
      _.each( $lines, function( i, line ) {
        var parts = line.split(/\t/g)
          , key = parts[0]
          , value = parts.slice(1).join(' ');

        // map to the correct value
        if ( key === 'message' )
          $messages.push( value )
        else if ( key === 'time' )
          $time = 0|value;
      });
    };

  // load the content
  _parse();


  __define( $this, {
    title: { get: function() { return $test.title; }, enumerable: true },
    score: { get: _get_score, enumerable: true },
    type: { get: function() { return 'results' }, enumerable: true },
    pass: { get: function() { return $pass; }, enumerable: true },
    fail: { get: function() { return $fail; }, enumerable: true },
    attempts: { get: function() { return $attempts; }, enumerable: true },
    time: { get: function() { return $time; }, enumerable: true },
    messages: { get: function() { return $messages; }, enumerable: true },
    tests: { get: function() { return $tests; }, enumerable: true },
    error: { get: function() { return $error; } }

  });
};