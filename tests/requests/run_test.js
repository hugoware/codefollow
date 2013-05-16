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

    // set a test user
    $$user = new User({ name: 'fred' });
    User.login( $$user );
    $$presentation.add( $$user );
  },


  is_a_thing: function() {
    this.ok( RunTestRequest, 'does not exist' );
    var web = new WebRequest();
    this.ok( new RunTestRequest( web.request, web.response ) instanceof RunTestRequest, 'could not instantiate' );
  },

  requires_post_to_run_test: function() {
    var web = WebRequest.get( RunTestRequest, { });
    this.equal( web.result.status, 404, 'did not 404 a GET request');
    this.equal( web.instance.errors.error, 'invalid_method', 'did not find correct error' );
  },

  fails_if_presentation_invalid_or_missing: function() {
    var web = WebRequest.post( RunTestRequest, { });
    this.equal( web.result.status, 404, 'did not 404 invalid request');
    this.equal( web.instance.errors.error, 'missing_presentation', 'did not find correct error for invalid' );

    web = WebRequest.post( RunTestRequest, {
      route: { presentation_id: 999 }
    });
    this.equal( web.result.status, 404, 'did not 404 missing request');
    this.equal( web.instance.errors.error, 'missing_presentation', 'did not find correct error for missing' );
  },

  fails_if_test_is_missing: function() {
    var web = WebRequest.post( RunTestRequest, {
      route: { presentation_id: $$presentation.id }
    });
    this.equal( web.result.status, 404, 'did not 404 missing request');
    this.equal( web.instance.errors.error, 'invalid_test', 'did not find correct error for missing' );
  },

  fails_if_user_invalid_or_missing: function() {
    // set to the test view
    $$presentation.index = 3;

    var web = WebRequest.post( RunTestRequest, { 
      route: { presentation_id: $$presentation.id },
    });
    this.equal( web.result.status, 404, 'did not 404 invalid request');
    this.equal( web.instance.errors.error, 'invalid_user', 'did not find correct error for invalid' );

    web = WebRequest.post( RunTestRequest, {
      route: { presentation_id: $$presentation.id },
      session: { user: 99999 }
    });
    this.equal( web.result.status, 404, 'did not 404 missing request');
    this.equal( web.instance.errors.error, 'invalid_user', 'did not find correct error for missing' );
  },

  handles_finding_correct_test_engine: function() {
    // set to the test view
    $$presentation.index = 3;

    // mock any engine requests
    this.mock('HtmlJsEngine', {
      run: function( callback ) {
        callback({ success: true }); 
      }
    });

    var web = WebRequest.post( RunTestRequest, {
      route: { presentation_id: $$presentation.id },
      session: { user: $$user.id }
    });

    this.ok( web.instance.engine.run, 'did not find an engine' );
    this.ok( web.result.json.success, 'failed to run callback' );

  }


});