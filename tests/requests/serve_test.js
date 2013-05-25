var $$presentation = null;
var $$user = null;

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

  is_a_thing: function() {
    this.ok( ServeTestRequest, 'does not exist' );
    var web = new WebRequest();
    this.ok( new ServeTestRequest( web.request, web.response ) instanceof ServeTestRequest, 'could not instantiate' );
  },

  status_404_when_presentation_is_missing: function() {
    var web = WebRequest.get( ServeTestRequest, { })
    this.equal( web.result.status, 404, 'did not render correct view' );
    this.equal( web.instance.errors.error, 'missing_presentation', 'did not have correct error' );
  },

  status_404_when_presentation_is_incorrect: function() {
    var web = WebRequest.get( ServeTestRequest, {
      route: { presentation_id: 'fake' }
    })
    this.equal( web.result.status, 404, 'did not render correct view' );
    this.equal( web.instance.errors.error, 'missing_presentation', 'did not have correct error' );
  },

  status_404_when_presentation_not_showing_test : function() {
    var web = WebRequest.get( ServeTestRequest, {
      route: { presentation_id: $$presentation.id }
    })
    this.equal( web.result.status, 404, 'did not render correct view' );
    this.equal( web.instance.errors.error, 'invalid_view', 'did not have correct error' );
  },

  status_404_when_test_key_is_missing: function() {
    $$presentation.index = 3;
    var web = WebRequest.get( ServeTestRequest, {
      route: { presentation_id: $$presentation.id }
    })
    this.equal( web.result.status, 404, 'did not render correct view' );
    this.equal( web.instance.errors.error, 'invalid_test_key', 'did not have correct error' );
  },

  status_404_when_test_key_is_incorrect: function() {
    $$presentation.index = 3;
    var web = WebRequest.get( ServeTestRequest, {
      route: { presentation_id: $$presentation.id, test_key: '1' }
    })
    this.equal( web.result.status, 404, 'did not render correct view' );
    this.equal( web.instance.errors.error, 'invalid_test_key', 'did not have correct error' );
  },

  status_404_when_user_id_is_missing: function() {
    $$presentation.index = 3;
    var web = WebRequest.get( ServeTestRequest, {
      route: { presentation_id: $$presentation.identity, test_key: $$presentation.test_key }
    });
    this.equal( web.result.status, 404, 'did not render correct view' );
    this.equal( web.instance.errors.error, 'invalid_user', 'did not have correct error' );
  },

  status_404_when_user_id_is_incorrect: function() {
    $$presentation.index = 3;
    var web = WebRequest.get( ServeTestRequest, {
      route: { presentation_id: $$presentation.identity, test_key: $$presentation.test_key, user_id: '99999999' }
    });
    this.equal( web.result.status, 404, 'did not render correct view' );
    this.equal( web.instance.errors.error, 'invalid_user', 'did not have correct error' );
  },

  // actual attempts for presentations
  with_existing_presentation: {

    before: function() {
      Presentation.clear();
      User.clear();

      // load in presentations
      var path = $$path.join( __dirname, '/../data/presentations' );
      $$config.mock( 'presentation_directory', path );
      Presentation.repository.refresh();

      // create the presentation that will be displayed
      $$presentation = new Presentation('presentation_a', { expand: true });
      Presentation.register( $$presentation );
      $$presentation.index = 3;

      // add the user
      $$user = new User({ name: 'fred' });
      User.login( $$user );
      $$presentation.add( $$user );

    },

    // will attempt to display existing file
    sends_file_when_requested: function() {
      var serve = 'file.txt'
        , expected = $$path.join( $$config.presentation_directory, 'presentation_a', serve );

      // create the view request
      var web = WebRequest.get( ServeTestRequest, {
        route: { presentation_id: $$presentation.identity, test_key: $$presentation.test_key, user_id: $$user.id, serve: serve }
      });

      this.equal( web.result.sendfile, expected, 'did not return correct file' );
    },

    // will attempt to display existing file
    send_404_for_missing_files: function() {
      var serve = 'missing.txt'
        , expected = $$path.join( $$config.presentation_directory, 'presentation_a', serve );

      // create the view request
      var web = WebRequest.get( ServeTestRequest, {
        route: { presentation_id: $$presentation.identity, test_key: $$presentation.test_key, user_id: $$user.id, serve: serve }
      });

      this.notEqual( web.result.sendfile, expected, 'did not return correct file' );
      this.equal( web.result.status, 404, 'did not return 404' );
    },

    // will attempt to display existing file
    will_not_go_beneath_presentation_directory: function() {
      var serve = '../too_low.txt'
        , expected = $$path.join( $$config.presentation_directory, 'presentation_a/content', serve );

      // create the view request
      var web = WebRequest.get( ServeTestRequest, {
        route: { presentation_id: $$presentation.identity, test_key: $$presentation.test_key, user_id: $$user.id, serve: serve }
      });

      this.notEqual( web.result.sendfile, expected, 'did not return correct file' );
      this.equal( web.result.status, 404, 'did not return 404' );
    },

    // will attempt to display existing file
    will_return_user_content: function() {
      var serve = 'input'
        , expected = $$path.join( $$config.presentation_directory, 'presentation_a/content', serve );

      // set some content
      var content = $$presentation.zones_for( $$user );
      content.script = 'test';

      // create the view request
      var web = WebRequest.get( ServeTestRequest, {
        route: { presentation_id: $$presentation.identity, test_key: $$presentation.test_key, user_id: $$user.id, serve: serve }
      });

      this.ok( web.result.json, 'returned a json response' );
      this.notEqual( web.result.sendfile, expected, 'did not return a file' );
      this.ok( web.result.json.zones.script, 'did not have user content' );
      this.equal( web.result.json.zones.script.content, 'test', 'did not have correct user content' );
    }

  }

});