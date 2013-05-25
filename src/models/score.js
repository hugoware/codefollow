var $$class = module.exports = function Score( user, params ) {
  var $this = this
    , $user = user || { }
    , $params = params || { }
    
    , $tests = [ ]
    , $attempts = 0
    , $pass = 0
    , $score = 0
    ,

    // getters
    _get_score = function() { return $score; },
    _get_pass = function() { return $pass; },
    _get_attempts = function() { return $attempts; },
    _get_tests = function() { return $tests; },
    _get_rank = function() { return Ranking.calculate( $pass, $attempts ); },

    // includes a test
    _add = function( test, attempt ) {
      if ( !attempt ) attempt = { skipped: true, pass: 0, attempts: 0 }

      // add up score
      $pass += 0|attempt.pass;
      $attempts += 0|attempt.attempts;

      // include the record ( if needed )
      if ( $params.complete )
        $tests.push({
          title: test.title,
          pass: 0|attempt.pass,
          attempts: 0|attempt.attempts,
          rank: Ranking.calculate( attempt.pass, attempt.attempts ),
          skipped: !!attempt.skipped
        });
    };


  __define( $this, {
    add: _add,

    // score information
    // score: { get: _get_score, enumerable: true },
    pass: { get: _get_pass, enumerable: true },
    attempts: { get: _get_attempts, enumerable: true },

    // user information
    name: { get: function() { return $user.name; }, enumerable: true },
    gravatar: { get: function() { return $user.gravatar; }, enumerable: true },
    id: { get: function() { return $user.id; } }
  });

  // include extra if needed
  if ( $params.complete )
    __define( $this, {
      tests: { get: _get_tests, enumerable: true }
    });

};