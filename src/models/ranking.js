
module.exports = $$class = function Ranking( params ) {
  var $this = this
    , $params = params || { }
    , $presentation = $params.presentation

    // finds the score for the current user
    _get_results = function( user ) {

      // ignore the leader
      user = $presentation.is_leader( user ) ? null : user;

      // reutrn the correct type
      return user ? new UserRanking( $presentation, user )
        : new AllRanking( $presentation );
    };
    
  __define( $this, {
    type: { get: function() { return 'ranking' } },
    results: _get_results
  });

};

// standard 3/rank calculation
__calculate_ranking = function( pass, attempts ) {
  pass = 0|pass;
  attempts = 0|attempts;
  if ( attempts == 0 || pass  == 0 ) return 0;
  return 0|( ( pass /  attempts ) * 3 );
};

__define( $$class, {
  calculate: __calculate_ranking
});