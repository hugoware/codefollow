
// contains a full summary of user results

var $$class = module.exports = function AllRanking( presentation ) {
  var $this = this
    , $presentation = presentation

    // holds the best results
    , $leaders
    ,

    // finds the
    _get_leaders = function() {
      if ( $leaders ) return $leaders;

      // keep track of all scores
      var scores = [ ];

      // calculate the score for each user
      $presentation.users.each( function( user ) {
        var score = new Score( user );
        scores.push( score );

        // include each test
        $presentation.tests.each( function( test ) {
          var attempt = test.get_results( user );
          score.add( test, attempt );
        });
      });

      // sort to put the best scores at the top
      scores.sort( function( a, b ) { 
        return b.pass - a.pass; 
      });

      // find the top users
      $leaders = scores.slice( 0, 3 );
      return $leaders;

    };
    

  __define( $this, {
    type: { get: function() { return 'ranking'; }, enumerable: true },
    leaders: { get: _get_leaders, enumerable: true }
  });

};