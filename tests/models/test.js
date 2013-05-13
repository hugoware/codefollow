
var $directory = $$path.join( __dirname, '../data/presentations/presentation_a/' )
  , $section = { value: 'content' }


require('../test')( module, {

  test_is_a_thing : function() {
    this.ok( Test, 'missing type Test' )
    this.ok( new Test( $section, $directory ), 'could not create a new test' );
    this.ok( new Test(), 'could not create an empty test' );
  },

  can_be_read : function() {
    var test = null;
    this.doesNotThrow(function() { test = new Test( $section, $directory, { expand: true }) }, null, 'threw error when expanding test' );
    this.equal( test.title, 'test', 'title was incorrect' );
    this.equal( test.type, 'test', 'type was incorrect' );
    this.equal( test.execute, 'index.html', 'execute was incorrect' );
    this.equal( test.tests.length, 2, 'test count was incorrect' );
    this.equal( test.zones.length, 1, 'zone count was incorrect' );

    // check the tests
    this.equal( test.tests[0].value, 'functions.js', 'did not read correct test #1 value' );
    this.equal( test.tests[1].value, 'test.js', 'did not read correct test #2 value' );

    // check the zones
    this.equal( test.zones[0].name, 'script.js', 'did not read correct zone name' )
    this.equal( test.zones[0]['for'], 'script', 'did not read correct zone for' )
    this.equal( test.zones[0].syntax, 'javascript', 'did not read correct zone syntax' )

  },

  read_expanded_content_correctly : function() {
    var test = null;
    this.doesNotThrow(function() { test = new Test( $section, $directory, { expand: true }) }, null, 'threw error when expanding test' );
    this.equals( test.explanation, 'explained here', 'did not read external explanation' );
  }


});