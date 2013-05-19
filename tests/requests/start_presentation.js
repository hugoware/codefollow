
require('../test')( module, {

  after: function() { $$config.reset(); },
  before: function() {
    Presentation.clear();

    var path = $$path.join( __dirname + '/../data/presentations' );
    $$config.mock( 'presentation_directory', path );
    Presentation.repository.refresh();
  },

  is_a_thing: function() {
    this.ok( StartPresentationRequest, 'does not exist' );

    var web = new WebRequest()
      , request = new StartPresentationRequest( web.request, web.response );
    this.ok( request instanceof StartPresentationRequest, 'could not create instance' );
  },

  provides_default_information: function() {
    var web = WebRequest.get( StartPresentationRequest );

    this.ok( web.result.params.available instanceof Array, 'gave list of presentations' );
    this.equal( web.result.view, 'start', 'did not show correct view' );
  },

  fails_with_invalid_user: function() {
    var web = WebRequest.post( StartPresentationRequest, {
      body: { name:'', email:'' }
    });

    this.ok( web.result.params.errors.any, 'did find validation errors' );
    this.ok( web.result.params.errors.name, 'did not fail name validation' );
  },

  fails_with_invalid_presentation: function() {
    var web = WebRequest.post( StartPresentationRequest, {
      body: { name:'fred', email:'' }
    });

    this.ok( web.result.params.errors.any, 'did find validation errors' );
    this.ok( web.result.params.errors.presentation_id, 'did not fail presentation_id validation' );
  },

  successful_creates_presentation: function() {
    var web = WebRequest.post( StartPresentationRequest, {
      body: { name: 'fred', email: 'fred@test.com', presentation_id: 'presentation_a' }
    })

    this.ok( web.instance.errors.none, 'still had errors' );
    this.ok( web.instance.presentation instanceof Presentation, 'created a new presentation' );
    this.ok( web.instance.user instanceof User, 'logged in a new user' );
    this.ok( Presentation.active[ web.instance.presentation.id ] instanceof Presentation, 'did not register presentation' );
    this.equal( web.request.session.user, web.instance.user.id, 'did not log in correct user' );

    // redirected the request
    var expect = '/{1}/'.assign( web.instance.presentation.identity );
    this.equal( web.result.redirect, expect );
  }

});