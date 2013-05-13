require('../test')( module, {

  before: function() {
    Presentation.clear();

    // load in presentations
    // var path = $$path.join( __dirname, '/../data/presentations' );
    // $$config.mock( 'presentation_directory', path );
    // Presentation.repository.refresh();
  },

  is_a_thing: function() {
    this.ok( DisplayRemoteRequest, 'did not exist' );
    var web = new WebRequest();
    this.ok( new DisplayRemoteRequest( web.request, web.response ), 'did not exist' );
  },

  redirects_for_invalid_presentations: function() {
    var web = WebRequest.run( DisplayRemoteRequest, { });
    this.equal( web.result.redirect, '/', 'did not redirect to home' );
  },

  redirects_for_invalid_remote_key: function() {
    var presentation = new Presentation( 'presentation_a' );
    Presentation.register( presentation );

    // run the attempts
    var missing_remote = { route: { presentation_id: presentation.id } }
      , invalid_remote = { route: { presentation_id: presentation.id, remote: '000' } }
      , missing_attempt = WebRequest.run( DisplayRemoteRequest, missing_remote )
      , invalid_attempt = WebRequest.run( DisplayRemoteRequest, invalid_remote )
    
    this.equal( missing_attempt.result.redirect, '/', 'did not redirect to home with missing remote' );
    this.equal( missing_attempt.instance.errors.error, 'invalid_key', 'did not redirect to home with missing remote' );
    this.equal( invalid_attempt.result.redirect, '/', 'did not redirect to home with incorrect remote' );
    this.equal( invalid_attempt.instance.errors.error, 'invalid_key', 'did not redirect to home with incorrect remote' );
  },

  displays_remote_for_valid_attempts: function() {
    var presentation = new Presentation( 'presentation_a' );
    Presentation.register( presentation );

    // run the attempts
    var missing_remote = { route: { presentation_id: presentation.id } }
      , valid_remote = { route: { presentation_id: presentation.id, remote: presentation.remote_key } }
      , attempt = WebRequest.run( DisplayRemoteRequest, valid_remote )
    
    this.equal( attempt.result.view, 'remote', 'did not render remove view' );
    this.ok( attempt.instance.errors.none, 'still had errors when successful' );
  }

});