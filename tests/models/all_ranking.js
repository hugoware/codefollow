
require('../test')( module, {

  is_a_thing: function() {
    this.ok( AllRanking, 'does not exist' );
    this.ok( new AllRanking instanceof AllRanking, 'could not instantiate' );
  },

  will_calculate_correct_scores: function() {

    var users = [
      { id:'a', name:'A' },
      { id:'b', name:'B' },
      { id:'c', name:'C' },
      { id:'e', name:'E' },
      { id:'f', name:'F' }
    ];

    // mock getting test results
    var get_result = function( user ) {
      
      // user a has done nothing
      if ( user.id == 'a' ) return null;
      var points = { b: 10, c: 5 }[ user.id ] || 2;
      
      return {
        pass: points,
        attempts: 10
      };
    };

    // the mock presentation
    var presentation = {
      users: users,
      tests:[
        { get_results: get_result },
        { get_results: get_result },
        { get_results: get_result },
        { get_results: get_result }
      ]
    };

    // find the ranking of users
    var ranking = new AllRanking( presentation )
      , leaders = ranking.leaders;

    // first place
    this.ok( leaders[0], 'has a first leader' );
    this.equal( leaders[0].name, 'B', 'has correct first leader' );
    this.equal( leaders[0].pass, 40, 'has correct pass count for first leader' );
    this.equal( leaders[0].attempts, 40, 'has correct attempt count for first leader' );
    this.ok( !leaders[0].tests, 'included tests for first leader' );
    
    // second place
    this.ok( leaders[1], 'has a second leader' );
    this.equal( leaders[1].name, 'C', 'has correct second leader' );
    this.equal( leaders[1].pass, 20, 'has correct pass count for second leader' );
    this.equal( leaders[1].attempts, 40, 'has correct attempt count for second leader' );
    this.ok( !leaders[1].tests, 'included tests for first leader' );
    
    // third place ( a tie )
    this.ok( leaders[2], 'has a third leader' );
    this.equal( leaders[2].pass, 8, 'has correct pass count for third leader' );
    this.equal( leaders[2].attempts, 40, 'has correct attempt count for third leader' );
    this.ok( !leaders[2].tests, 'included tests for first leader' );

    // 4th place
    this.ok( !leaders[3], 'does not have a fourth leader' );

  }



});