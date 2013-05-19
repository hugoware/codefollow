var $directory = $$path.join( __dirname, '../data/presentations/presentation_a/' )
  , $section = { value: 'content' }

require('../test')( module, {

  after: function() { $$config.reset(); },
  before: function() {
    Presentation.clear();
    User.clear();

    // load in presentations
    var path = $$path.join( __dirname, '/../data/presentations' );
    $$config.mock( 'presentation_directory', path );
    Presentation.repository.refresh();

    // create the presentation that will be displayed
    $$presentation = new Presentation('presentation_a');
    Presentation.register( $$presentation );
  },

  test_is_a_thing : function() {
    this.ok( Test, 'missing type Test' )
    this.ok( new Test( $section, $directory ), 'could not create a new test' );
    this.ok( new Test instanceof Test, 'could not create an empty test' );
  },

  can_be_read : function() {
    var test = null;
    this.doesNotThrow(function() { test = new Test( $section, $directory, { expand: true }) }, null, 'threw error when expanding test' );
    this.equal( test.title, 'test', 'title was incorrect' );
    this.equal( test.type, 'test', 'type was incorrect' );
    this.equal( test.execute, 'index.html', 'execute was incorrect' );
    this.equal( test.tests.length, 2, 'test count was incorrect' );
    this.equal( test.zones.length, 3, 'zone count was incorrect' );

    // check the tests
    this.equal( test.tests[0].value, 'functions.js', 'did not read correct test #1 value' );
    this.equal( test.tests[1].value, 'test.js', 'did not read correct test #2 value' );

    // check the zones
    this.equal( test.zones[0].name, 'script.js', 'did not read correct first zone name' )
    this.equal( test.zones[0]['for'], 'script', 'did not read correct first zone for' )
    this.equal( test.zones[0].content, 'script default', 'did not read correct first zone content' )
    this.equal( test.zones[0].syntax, 'javascript', 'did not read correct first zone syntax' )

    // check the zones
    this.equal( test.zones[1].name, 'content.html', 'did not read correct second zone name' )
    this.equal( test.zones[1]['for'], 'html', 'did not read correct second zone for' )
    this.equal( test.zones[1].content, 'html default', 'did not read correct second zone content' )
    this.equal( test.zones[1].syntax, 'html', 'did not read correct second zone syntax' )

    // check the zones
    this.equal( test.zones[2].name, 'style.css', 'did not read correct first zone name' )
    this.equal( test.zones[2]['for'], 'css', 'did not read correct first zone for' )
    this.equal( test.zones[2].content, 'style default', 'did not read correct first zone content' )
    this.equal( test.zones[2].syntax, 'css', 'did not read correct first zone syntax' )

  },

  read_expanded_content_correctly : function() {
    var test = null;
    this.doesNotThrow(function() { test = new Test( $section, $directory, { expand: true }) }, null, 'threw error when expanding test' );
    this.equals( test.explanation, 'explained here', 'did not read external explanation' );
  },

  returns_user_content_for_zone : function() {

    // switch to the test
    var presentation = new Presentation('presentation_a', { expand: true });
    presentation.index = 3;

    // add a user to pull content for
    var user = new User();
    User.login( user );
    presentation.add( user );

    // edit the user zones
    var zones = presentation.zones_for( user );
    zones.extra = 'extra';
    zones.script = 'user script';

    // get the zones to use
    var content = presentation.view.zones_for( user );

    // should only pull required content
    this.ok( content.script, 'has content for script' );
    this.equal( content.script.content, 'user script', 'has correct content for script' );
    this.ok( content.html, 'has content for html' );
    this.equal( content.html.content, 'html default', 'has correct content for html' );
    this.ok( content.css, 'has content for css' );
    this.equal( content.css.content, 'style default', 'has correct content for css' );
    this.ok( !!!content.extra, 'did not pull too much content' );

  },

  will_track_user_results: function() {

    this.mock('TestResult', {
      ctor: function( id ) { this.id = id; }
    })

    var test = new Test()
      , user = new User()
      , starting_results = new TestResult( 1 )
      , replace_results = new TestResult( 2 );

    // try the first attempt at setting
    test.set_results( user, starting_results );
    this.ok( test.results, 'did not have starting results' );
    this.ok( test.results[ user.id ], 'did not have starting results for user' );
    this.equal( test.results[ user.id ].id, starting_results.id, 'starting results were not correct' );

    // then replace the results
    test.set_results( user, replace_results );
    this.ok( test.results, 'did not have replace results' );
    this.ok( test.results[ user.id ], 'did not have replace results for user' );
    this.equal( test.results[ user.id ].id, replace_results.id, 'replace results were not correct' );

  }


});