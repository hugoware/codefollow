require( '../test' )( module, {

  is_a_thing: function() {
    this.ok( UserRanking, 'does not exist' );
    this.ok( new UserRanking instanceof UserRanking, 'could not instantiate' );
  },

  displays_user_ranking: function() {

    // mock getting test results
    var user = { id:'a', name:'A' };
    var no_result = function() { };
    var get_result = function( user ) {
      return {
        pass: 5,
        attempts: 10
      };
    };

    // the mock presentation
    var presentation = {
      tests:[
        { title: 'test a', get_results: get_result },
        { title: 'test b', get_results: no_result },
        { title: 'test c', get_results: get_result },
        { title: 'test d', get_results: get_result }
      ]
    };

    var ranking = new UserRanking( presentation, user )
      , score = ranking.score;

    this.ok( score, 'did not have a score' );
    this.equal( score.name, 'A', 'did not have correct name' );
    this.equal( score.pass, 15, 'did not have correct pass count' );
    this.equal( score.attempts, 30, 'did not have correct attempt count' );
    this.ok( score.tests, 'did not have a tests' );
    this.equal( score.tests.length, presentation.tests.length, 'did not have correct test count' );

    // make sure each test result is correct
    this.ok( score.tests[0], 'did not have first test');
    this.equal( score.tests[0].title, 'test a', 'did not have correct first test title');
    this.equal( score.tests[0].skipped, false, 'did not have correct first test skipped');
    this.equal( score.tests[0].pass, 5, 'did not have correct first test pass');
    this.equal( score.tests[0].attempts, 10, 'did not have correct first test attempts');
    this.equal( score.tests[0].rank, 1, 'did not have correct first test rank');

    // second test ( skipped )
    this.ok( score.tests[1], 'did not have second test');
    this.equal( score.tests[1].title, 'test b', 'did not have correct second test title');
    this.equal( score.tests[1].skipped, true, 'did not have correct second test skipped');
    this.equal( score.tests[1].pass, 0, 'did not have correct second test pass');
    this.equal( score.tests[1].attempts, 0, 'did not have correct second test attempts');
    this.equal( score.tests[1].rank, 0, 'did not have correct second test rank');

    // make sure each test result is correct
    this.ok( score.tests[2], 'did not have third test');
    this.equal( score.tests[2].title, 'test c', 'did not have correct third test title');
    this.equal( score.tests[2].skipped, false, 'did not have correct third test skipped');
    this.equal( score.tests[2].pass, 5, 'did not have correct third test pass');
    this.equal( score.tests[2].attempts, 10, 'did not have correct third test attempts');
    this.equal( score.tests[2].rank, 1, 'did not have correct third test rank');

    // fourth attempt
    this.ok( score.tests[3], 'did not have fourth test');
    this.equal( score.tests[3].title, 'test d', 'did not have correct fourth test title');
    this.equal( score.tests[3].skipped, false, 'did not have correct fourth test skipped');
    this.equal( score.tests[3].pass, 5, 'did not have correct fourth test pass');
    this.equal( score.tests[3].attempts, 10, 'did not have correct fourth test attempts');
    this.equal( score.tests[3].rank, 1, 'did not have correct fourth test rank');

  }

});