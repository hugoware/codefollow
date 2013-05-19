var $$class = module.exports = function Score( user ) {
  var $this = this
    , $user = user || { }
    , $attempts = 0
    , $pass = 0
    , $score = 0
    ,

    // getters
    _get_score = function() { return $score; },
    _get_pass = function() { return $pass; },
    _get_attempts = function() { return $attempts; },

    // includes a test
    _add = function( test ) {
      $pass += test.pass;
      $attempts += test.attempts;
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

};