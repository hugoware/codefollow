require( '../test' )( module, {

  is_a_thing: function() {
    this.ok( Score, 'does not exists' );
    this.ok( new Score instanceof Score, 'cannot instantiate' );
  },

  will_track_user_scores: function() {
    var score = new Score()
      , test = new Test();

    // add a few scores
    score.add( test, { pass:1, attempts: 2 });
    this.equal( score.pass, 1, 'first add had wrong pass' );
    this.equal( score.attempts, 2, 'first add had wrong attempts' );

    // add a few scores
    score.add( test, { pass:2, attempts: 1 });
    this.equal( score.pass, 3, 'second add had wrong pass' );
    this.equal( score.attempts, 3, 'second add had wrong attempts' );

    // add a few scores
    score.add( test, { pass:5, attempts: 5 });
    this.equal( score.pass, 8, 'second add had wrong pass' );
    this.equal( score.attempts, 8, 'second add had wrong attempts' );
  }

});