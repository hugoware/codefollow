var $$presentation = null;

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
    var web = new WebRequest();
    this.ok( DisplayPresentationRequest, 'does not exist' );
    this.ok( new DisplayPresentationRequest( web.request, web.response ), 'cannot create instance' );
  },


  renders_missing_when_presentation_does_not_exist: function() {
    var web = WebRequest.get( DisplayPresentationRequest, {
      route: { presentation_id: 'fake' }
    })

    this.equal( web.result.view, 'missing', 'did not render correct view' );
  },

  redirects_to_login_when_user_is_not_signed_in: function() {
    var web = WebRequest.get( DisplayPresentationRequest, {
      route: { presentation_id: $$presentation.identity }
    });

    this.equal( web.result.redirect, '/join/'+$$presentation.identity, 'did not redirect to correct view' );
  },

  renders_correct_view_if_found: function() {
    
    // add the user
    var user = new User({ name: 'fred' });
    User.login( user );
    $$presentation.add( user );

    // create the view request
    var web = WebRequest.get( DisplayPresentationRequest, {
      session: { user: user.id },
      route: { presentation_id: $$presentation.identity }
    });

    // perform the request
    this.equal( web.result.view, 'display', 'did not redirect to correct view' );
    this.equal( web.instance.presentation_id, $$presentation.id, 'has the correct presentation id' );
    this.ok( web.instance.presentation instanceof Presentation, 'has a presentation' );
    this.equal( web.instance.presentation.id, $$presentation.id, 'has the correct presentation' );
    this.ok( web.instance.user instanceof User, 'has a user' );
    this.equal( web.instance.user.id, user.id, 'has the correct user' );
    this.ok( web.instance.errors.none, 'has no errors' );

  }

});