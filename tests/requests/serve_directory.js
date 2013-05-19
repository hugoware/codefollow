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

    $$user = new User({ name:'fred', });
    User.login( $$user );
    $$presentation.add( $$user );

  },

  is_a_thing: function() {
    var web = new WebRequest();
    this.ok( ServeDirectoryRequest, 'does not exist' );
    this.ok( new ServeDirectoryRequest( web.request, web.response ) instanceof ServeDirectoryRequest, 'could not instantiate' );
  },

  should_404_for_missing_presentations: function() {
    var web = WebRequest.get( ServeDirectoryRequest );
    this.ok( !web.result.sendfile, 'did not find a file to send' );
    this.equal( web.result.status, 404, 'did send correct response' );
    this.equal( web.instance.errors.error, 'missing_presentation', 'did not fail for correct reason' );
  },

  should_404_for_missing_users: function() {

    var web = WebRequest.get( ServeDirectoryRequest, {
      route: { presentation_id: $$presentation.id }
    });

    this.ok( !web.result.sendfile, 'did not find a file to send' );
    this.equal( web.result.status, 404, 'did send correct response' );
    this.equal( web.instance.errors.error, 'invalid_user', 'did not fail for correct reason' );

  },

  serves_content_within_presentation: function() {

    var file = 'file.txt';
    var web = WebRequest.get( ServeDirectoryRequest, {
      session: { user: $$user.id },
      route: {
        presentation_id: $$presentation.id, 
        serve: file
      }
    });

    var expect = $$path.join( $$presentation.directory, file );

    this.ok( web.result.sendfile, 'did not find a file to send' );
    this.equal( web.result.sendfile, expect, 'did send correct file' );

  },

  should_404_for_missing_files: function() {

    var file = 'missing.txt';
    var web = WebRequest.get( ServeDirectoryRequest, {
      session: { user: $$user.id },
      route: {
        presentation_id: $$presentation.id, 
        serve: file
      }
    });

    this.ok( !web.result.sendfile, 'did not find a file to send' );
    this.equal( web.result.status, 404, 'did not send missing response' );

  },

  should_404_test_content_when_not_active: function() {

    var file = 'content/test';
    var web = WebRequest.get( ServeDirectoryRequest, {
      session: { user: $$user.id },
      route: {
        presentation_id: $$presentation.id, 
        serve: file
      }
    });

    this.ok( !web.result.sendfile, 'did not find a file to send' );
    this.equal( web.result.status, 404, 'did not send missing response' );

  },

  should_show_test_content_when_test_is_active: function() {
    $$presentation.index = 3;

    var file = 'content/test';
    var web = WebRequest.get( ServeDirectoryRequest, {
      session: { user: $$user.id },
      route: {
        presentation_id: $$presentation.id, 
        serve: file
      }
    });

    var expect = $$path.join( $$presentation.directory, file );

    this.ok( web.result.sendfile, 'did not find a file to send' );
    this.equal( web.result.sendfile, expect, 'did not send correct file' );

  },

  should_404_user_input_when_not_active: function() {

    var file = 'content/input';
    var web = WebRequest.get( ServeDirectoryRequest, {
      session: { user: $$user.id },
      route: {
        presentation_id: $$presentation.id, 
        serve: file
      }
    });

    this.ok( !web.result.json, 'had incorrect json response' );
    this.equal( web.result.status, 404, 'did not send missing response' );

  },

  should_show_user_input_when_test_is_active: function() {
    $$presentation.index = 3;

    var file = 'content/input';
    var web = WebRequest.get( ServeDirectoryRequest, {
      session: { user: $$user.id },
      route: {
        presentation_id: $$presentation.id, 
        serve: file
      }
    });

    this.ok( web.result.json, 'did not return user content' );
    this.ok( web.result.json.success, 'missing json result value' );
    this.ok( web.result.json.zones, 'missing json zones value' );

  }

});