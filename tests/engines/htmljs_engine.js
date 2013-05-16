var $$presentation, $$user;

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
    $$presentation.index = 3;

    // set a test user
    $$user = new User({ name: 'fred' });
    User.login( $$user );
    $$presentation.add( $$user );
  },

  is_a_thing: function() {
    this.ok( HtmlJsEngine, 'does not exist' );
    this.ok( new HtmlJsEngine instanceof HtmlJsEngine, 'could not instantiate' );
  },

  will_execute_request: function( test ) {
    test.delay = true;

    // the command send to the shell
    var expect = 'phantomjs {1} http://localhost:{2}/{3}/{4}/{5}/{6}/{7}'.assign(
      $$config.browser_execution_script,
      $$config.port, 
      $$presentation.id,
      $$presentation.test_key,
      $$user.id,
      $$presentation.view.location,
      $$presentation.view.execute );


    // capture the command request
    this.mock( '$$process', {
      exec: function( command, options, callback ) {
        test.equal( command, expect, 'command was incorrect' );
        test.equal( options.timeout, $$config.test_execution_time_limit, 'timeout did not match config' );
        test.equal( options.maxBuffer, $$config.test_execution_max_buffer, 'maxBuffer did not match config' );
        
        // must call back and give up
        callback( '', '', '' );
      }
    })

    // run the engine
    var engine = new HtmlJsEngine({
      presentation: $$presentation,
      test: $$presentation.view,
      user: $$user
    });

    // run the engine
    engine.run( function( result ) {
      test.ok( this instanceof HtmlJsEngine, 'did not provide engine to result' );
      test.ok( result instanceof TestResult, 'did not provide results to callback' );
      
      // done testing
      test.end();
    });

  }

});