
module.exports = $$class = function Ranking( params ) {
  var $this = this
    , $params = params || { }
    , $presentation = $params.presentation

    // the calculated rankings
    , $rankings
    , 
    // finds the top performing users
    _update = function() {
      $rankings = [ ];
      for ( var u in $presentation.users )
        _calculate_ranking( $presentation.users[ u ], true );
      
      // handle sorting by most passing
      $rankings.sort( function( a, b ) {
        return b.pass - a.pass; 
      });
    },

    // shows all rankings
    _get_all = function() {
      if ( !$rankings ) _update();
      return $rankings;
    },

    // get the top performers
    _get_leaders = function() {
      return $rankings.to( 10 );
    },

    // find the ranking for this user
    _get_user = function( user ) {
      for ( var u in $rankings )
        if ( $rankings[ u ].id == user.id )
          return $rankings[ u ];
    },

    // finds the score for the current user
    _get_results = function( user ) {
      if ( !$rankings ) _update();

      // ignore the leader
      user = $presentation.is_leader( user ) ? null : user;

      // reutrn the correct type
      return user ? { type: 'ranking', user: _get_user( user ) }
        : { type: 'ranking', leaders: _get_leaders() };
    },

    // gets the calculated randking for the user
    _calculate_ranking = function( user, minimum ) {

      // find each attempt made by the user
      var score = new Score( user, minimum );
      $presentation.tests.each( function( test ) {
        var attempt = test.results[ user.id ];
        if ( attempt )
          score.add( attempt );
      });

      // finish up tallying
      $rankings.push( score );
    };

  __define( $this, {
    type: { get: function() { return 'ranking' }, enumerable: true },
    all: { get: _get_all },
    results: _get_results,
    update: _update
  });

};