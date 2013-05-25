
// contains a full summary of user results

var $$class = module.exports = function UserRanking( presentation, user ) {
  var $this = this
    , $presentation = presentation
    , $user = user
    , $score
    ,

    // calculates and returns the score
    _get_score = function() {
      if ( $score ) return $score;

      // get the status for each test
      $score = new Score( user, { complete: true } );
      $presentation.tests.each( function( test ) {
        var attempt = test.get_results( $user );
        $score.add( test, attempt );
      });

      // return the progress
      return $score;

    };

  
  __define( $this, {
    type: { get: function() { return 'ranking'; }, enumerable: true },
    score: { get: _get_score, enumerable: true }
  });  

};