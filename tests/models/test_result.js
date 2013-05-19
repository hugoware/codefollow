require('../test')( module, {

  is_a_thing: function() {
    this.ok( TestResult, 'does not exist' );
    this.ok( new TestResult instanceof TestResult, 'could not instantiate' );
  },
  
  will_read_test_results: function() {
    var path = $$path.join( __dirname, '../data/sample_results' )
      , file = $$fs.readFileSync( path )
      , content = file.toString()
      , error = 'null'
      , test = { title: 'title' }
      , results = new TestResult( test, content, error )
      

    this.ok( results instanceof TestResult, 'did not create results' );
    this.equal( results.title, test.title, 'did not have correct title' );
    this.equal( results.error, error, 'did not have correct error' );
    this.equal( results.tests.length, 3, 'did not find correct number of tests' );
    this.equal( results.messages.length, 3, 'did not return correct number of results' );
    this.equal( results.time, 6, 'did not find correct time' );
    this.equal( results.attempts, 8, 'did not have correct number of attempts' );
    this.equal( results.pass, 7, 'did not have correct number of passes' );
    this.equal( results.fail, 1, 'did not have correct number of fails' );

  }

});