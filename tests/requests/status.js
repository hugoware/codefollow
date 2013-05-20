require('../test')( module, {

  before: function() {
    Presentation.clear();
    User.clear();

    var path = $$path.join( __dirname + '/../data/presentations' );
    $$config.mock( 'presentation_directory', path );
    Presentation.repository.refresh();
  },

  is_a_thing: function() {
    var web = new WebRequest();
    this.ok( StatusRequest, 'does not exist' );
    this.ok( new StatusRequest( web.request, web.response ), 'could not instantiate' );
  },

  fails_unless_using_post: function() {
    var web = WebRequest.get( StatusRequest, { } );
    this.ok( !web.result.json.success, 'did not show failed attempt' );
    this.equal( web.result.json.error, 'invalid_method', 'did not show failed attempt' );
  },

  displays_error_for_not_provided_presentations: function() {
    var web = WebRequest.post( StatusRequest, { } );
    this.ok( !web.result.json.success, 'did not show failed attempt' );
    this.equal( web.result.json.error, 'missing_presentation', 'did not show failed attempt' );
  },

  displays_error_for_missing_presentations: function() {
    var web = WebRequest.post( StatusRequest, {
      route: { presentation_id: 999 }
    } );
    this.ok( !web.result.json.success, 'did not show failed attempt' );
    this.equal( web.result.json.error, 'missing_presentation', 'did not show failed attempt' );
  },

  displays_error_for_invalid_user: function() {
    var presentation = new Presentation('presentation_a');
    Presentation.register( presentation );

    var web = WebRequest.post( StatusRequest, {
      route: { presentation_id: presentation.id },
      session: { user: 1 }
    } );
    this.ok( !web.result.json.success, 'did not show failed attempt' );
    this.equal( web.result.json.error, 'invalid_user', 'did not show failed attempt' );
  },

  displays_complete_view_for_empty_at: function() {
    var presentation = new Presentation('presentation_a')
      , user = new User();

    User.login( user );
    Presentation.register( presentation );
    presentation.add( user );

    var web = WebRequest.post( StatusRequest, {
      route: { presentation_id: presentation.id },
      session: { user: user.id }
    });

    this.ok( web.result.json.success, 'did not display slide' );
    this.equal( web.result.json.type, 'slide', 'did not display a slide' );
    this.equal( web.result.json.at, 0, 'should be on first slide' );
  },

  displays_partial_view_when_at_is_provided: function() {
    var presentation = new Presentation('presentation_a')
      , user = new User();

    User.login( user );
    Presentation.register( presentation );
    presentation.add( user );

    var web = WebRequest.post( StatusRequest, {
      body: { at: '0' },
      route: { presentation_id: presentation.id },
      session: { user: user.id }
    });

    this.ok( web.result.json.success, 'did not display slide' );
    this.equal( web.result.json.type, null, 'should not include full view' );
    this.equal( web.result.json.at, 0, 'should be on first slide' );
  },

  displays_partial_view_when_away_from_start_and_is_provided: function() {
    var presentation = new Presentation('presentation_a')
      , user = new User();

    User.login( user );
    Presentation.register( presentation );
    presentation.add( user );

    presentation.next();

    var web = WebRequest.post( StatusRequest, {
      body: { at: '1' },
      route: { presentation_id: presentation.id },
      session: { user: user.id }
    });

    this.ok( web.result.json.success, 'did not display slide' );
    this.equal( web.result.json.type, null, 'should not include full view' );
    this.equal( web.result.json.at, 1, 'should be on first slide' );
  },

  displays_partial_view_when_invalid_and_is_provided: function() {
    var presentation = new Presentation('presentation_a')
      , user = new User();

    User.login( user );
    Presentation.register( presentation );
    presentation.add( user );

    presentation.next();

    var web = WebRequest.post( StatusRequest, {
      body: { at: '-1' },
      route: { presentation_id: presentation.id },
      session: { user: user.id }
    });

    this.ok( web.result.json.success, 'did not display slide' );
    this.equal( web.result.json.type, 'slide', 'should not include full view' );
    this.equal( web.result.json.at, 1, 'should be on first slide' );
  },

  displays_test_differently_as_result: function() {
    var presentation = new Presentation('presentation_a')
      , user = new User();

    User.login( user );
    Presentation.register( presentation );
    presentation.add( user );

    presentation.index = 3;

    var web = WebRequest.post( StatusRequest, {
      route: { presentation_id: presentation.id },
      session: { user: user.id }
    });

    this.ok( web.result.json.success, 'did not display slide' );
    this.equal( web.result.json.type, 'test', 'did not display a slide' );
    this.equal( web.result.json.at, 3, 'should be on first slide' );
  },

  display_ranking_differently_as_result: function() {
    var presentation = new Presentation('presentation_a')
      , user = new User();

    User.login( user );
    Presentation.register( presentation );
    presentation.add( user );

    presentation.index = 4;

    var web = WebRequest.post( StatusRequest, {
      route: { presentation_id: presentation.id },
      session: { user: user.id }
    });

    this.ok( web.result.json.success, 'did not display slide' );
    this.equal( web.result.json.type, 'ranking', 'did not display a slide' );
    this.equal( web.result.json.at, 4, 'should be on first slide' );
  }

});