require( '../test' )( module, {

  is_a_thing: function() {
    this.ok( Ranking, 'does not exists' );
    this.ok( new Ranking instanceof Ranking, 'cannot instantiate' );
  },

  // will_track_multiple_users: function() {

  //   var mock = {
  //     users: [ {id:'a'}, {id:'b'}, {id:'c'} ],
  //     tests: [
  //       { results: { 'a': { pass:0, attempts: 2 }, 'b': { pass:1, attempts: 2 }, 'c': { pass:2, attempts: 2 } } },
  //       { results: { 'a': { pass:0, attempts: 1 }, 'b': { pass:1, attempts: 1 }, 'c': { pass:2, attempts: 2 } } },
  //       { results: { 'a': { pass:0, attempts: 1 }, 'b': { pass:1, attempts: 2 }, 'c': { pass:2, attempts: 2 } } }
  //     ]
  //   };

  //   // shortcut to create users
  //   var presentation = new Presentation()
  //     , ranking = new Ranking({ presentation: mock })
  //     , all = ranking.all;

  //   // c is top 
  //   this.equal( all[0].id, 'c', 'wrong first place user id' );
  //   this.equal( all[0].pass, 6, 'wrong first place pass count' );
  //   this.equal( all[0].attempts, 6, 'wrong first place attempt count' );

  //   // b is middle
  //   this.equal( all[1].id, 'b', 'wrong second place user id' );
  //   this.equal( all[1].pass, 3, 'wrong second place pass count' );
  //   this.equal( all[1].attempts, 5, 'wrong second place attempt count' );

  //   // a is last 
  //   this.equal( all[2].id, 'a', 'wrong third place user id' );
  //   this.equal( all[2].pass, 0, 'wrong third place pass count' );
  //   this.equal( all[2].attempts, 4, 'wrong third place attempt count' );

  // },

  // will_find_user_with_rankings: function() {

  //   var mock = {
  //     is_leader: function() { return false; },
  //     users: [ {id:'a'}, {id:'b'}, {id:'c'} ],
  //     tests: [
  //       { results: { 'a': { pass:0, attempts: 2 }, 'b': { pass:1, attempts: 2 }, 'c': { pass:2, attempts: 2 } } },
  //       { results: { 'a': { pass:0, attempts: 1 }, 'b': { pass:1, attempts: 1 }, 'c': { pass:2, attempts: 2 } } },
  //       { results: { 'a': { pass:0, attempts: 1 }, 'b': { pass:1, attempts: 2 }, 'c': { pass:2, attempts: 2 } } }
  //     ]
  //   };

  //   // shortcut to create users
  //   var presentation = new Presentation()
  //     , ranking = new Ranking({ presentation: mock })
  //     , user = { id: 'a' }
  //     , results = ranking.results( user );

  //   // does not return user info
  //   this.ok( !results.leaders, 'still included leaders' );

  //   // user is correct
  //   this.equal( results.user.id, 'a', 'wrong third place user id' );
  //   this.equal( results.user.pass, 0, 'wrong third place pass count' );
  //   this.equal( results.user.attempts, 4, 'wrong third place attempt count' );

  // },

  // will_not_include_leader_with_rankings: function() {

  //   var mock = {
  //     is_leader: function() { return true; },
  //     users: [ {id:'a'}, {id:'b'}, {id:'c'} ],
  //     tests: [
  //       { results: { 'a': { pass:0, attempts: 2 }, 'b': { pass:1, attempts: 2 }, 'c': { pass:2, attempts: 2 } } },
  //       { results: { 'a': { pass:0, attempts: 1 }, 'b': { pass:1, attempts: 1 }, 'c': { pass:2, attempts: 2 } } },
  //       { results: { 'a': { pass:0, attempts: 1 }, 'b': { pass:1, attempts: 2 }, 'c': { pass:2, attempts: 2 } } }
  //     ]
  //   };

  //   // shortcut to create users
  //   var presentation = new Presentation()
  //     , ranking = new Ranking({ presentation: mock })
  //     , user = { id: 'a' }
  //     , results = ranking.results( user );

  //   // does not return user info
  //   this.ok( !results.user, 'user was still included' );

  //   // c is top 
  //   this.equal( results.leaders[0].id, 'c', 'wrong first place user id' );
  //   this.equal( results.leaders[0].pass, 6, 'wrong first place pass count' );
  //   this.equal( results.leaders[0].attempts, 6, 'wrong first place attempt count' );

  //   // b is middle
  //   this.equal( results.leaders[1].id, 'b', 'wrong second place user id' );
  //   this.equal( results.leaders[1].pass, 3, 'wrong second place pass count' );
  //   this.equal( results.leaders[1].attempts, 5, 'wrong second place attempt count' );

  //   // a is last 
  //   this.equal( results.leaders[2].id, 'a', 'wrong third place user id' );
  //   this.equal( results.leaders[2].pass, 0, 'wrong third place pass count' );
  //   this.equal( results.leaders[2].attempts, 4, 'wrong third place attempt count' );

  // },

  // will_find_user_with_rankings: function() {

  //   var mock = {
  //     users: [ {id:'a'}, {id:'b'}, {id:'c'} ],
  //     tests: [
  //       { results: { 'a': { pass:0, attempts: 2 }, 'b': { pass:1, attempts: 2 }, 'c': { pass:2, attempts: 2 } } },
  //       { results: { 'a': { pass:0, attempts: 1 }, 'b': { pass:1, attempts: 1 }, 'c': { pass:2, attempts: 2 } } },
  //       { results: { 'a': { pass:0, attempts: 1 }, 'b': { pass:1, attempts: 2 }, 'c': { pass:2, attempts: 2 } } }
  //     ]
  //   };

  //   // shortcut to create users
  //   var presentation = new Presentation()
  //     , ranking = new Ranking({ presentation: mock })
  //     , user = { id: 'a' }
  //     , results = ranking.results( user );

  //   // c is top 
  //   this.equal( results.leaders[0].id, 'c', 'wrong first place user id' );
  //   this.equal( results.leaders[0].pass, 6, 'wrong first place pass count' );
  //   this.equal( results.leaders[0].attempts, 6, 'wrong first place attempt count' );

  //   // b is middle
  //   this.equal( results.leaders[1].id, 'b', 'wrong second place user id' );
  //   this.equal( results.leaders[1].pass, 3, 'wrong second place pass count' );
  //   this.equal( results.leaders[1].attempts, 5, 'wrong second place attempt count' );

  //   // a is last 
  //   this.equal( results.leaders[2].id, 'a', 'wrong third place user id' );
  //   this.equal( results.leaders[2].pass, 0, 'wrong third place pass count' );
  //   this.equal( results.leaders[2].attempts, 4, 'wrong third place attempt count' );

  //   // user is correct
  //   this.equal( results.user.id, 'a', 'wrong third place user id' );
  //   this.equal( results.user.pass, 0, 'wrong third place pass count' );
  //   this.equal( results.user.attempts, 4, 'wrong third place attempt count' );

  // }


});