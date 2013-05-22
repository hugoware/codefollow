require('../test')( module, {

  is_a_thing: function() {
    var web = new WebRequest();
    this.ok( JoinPresentationRequest, 'does not exist' );
    this.ok( new JoinPresentationRequest( web.request, web.response ) instanceof JoinPresentationRequest, 'could not instantiate' );
  },

  get_request_displays_login_form: function() {
    var web = WebRequest.get( JoinPresentationRequest );
    this.ok( web.result.view, 'did not have a view' );
    this.equal( web.result.view, 'join', 'did not show correct view' );
  },

  will_reject_incomplete_user_information: function() {

    // setup a basic presentation
    var presentation = new Presentation()
      , leader = new User();
    User.login( leader );
    Presentation.register( presentation );
    presentation.add( leader );

    var web = WebRequest.post( JoinPresentationRequest );
    this.ok( web.instance.errors.any, 'does not have an error' );
    this.ok( web.instance.errors.name, 'does not have error for login' );
    this.equal( web.result.view, 'join', 'did not show correct view' );
    this.equal( web.result.params.name, '', 'has blank for name' );
    this.equal( web.result.params.email, '', 'has blank for email' );

  },

  will_reject_incomplete_user_information: function() {

    // setup a basic presentation
    var presentation = new Presentation()
      , leader = new User();
    User.login( leader );
    Presentation.register( presentation );
    presentation.add( leader );

    var web = WebRequest.post( JoinPresentationRequest );
    this.ok( web.instance.errors.any, 'does not have an error' );
    this.ok( web.instance.errors.name, 'does not have error for login' );
    this.equal( web.result.view, 'join', 'did not show correct view' );
    this.equal( web.result.params.name, '', 'has blank for name' );
    this.equal( web.result.params.email, '', 'has blank for email' );

  },

  will_reject_invalid_user_information: function() {

    // setup a basic presentation
    var presentation = new Presentation()
      , leader = new User()
      , name = String.generate( 300 )
      , email = String.generate( 300 )
      , presentation_id = '333'
    User.login( leader );
    Presentation.register( presentation );
    presentation.add( leader );

    // try and submit
    var web = WebRequest.post( JoinPresentationRequest, {
      body: { name: name, email: email, presentation_id: presentation_id }

    });

    this.ok( web.instance.errors.any, 'does not have an error' );
    this.ok( web.instance.errors.name, 'does not have error for login' );
    this.equal( web.result.view, 'join', 'did not show correct view' );
    this.equal( web.result.params.name, name, 'has previous value for name' );
    this.equal( web.result.params.email, email, 'has previous value for email' );
    this.equal( web.result.params.presentation_id, presentation_id, 'has previous value for presentation_id' );

  },

  will_reject_invalid_presentation_information: function() {

    // setup a basic presentation
    var presentation = new Presentation()
      , leader = new User()
      , name = 'name'
      , email = ''
      , presentation_id = '333-444-555'

    User.login( leader );
    Presentation.register( presentation );
    presentation.add( leader );

    // try and submit
    var web = WebRequest.post( JoinPresentationRequest, {
      body: { name: name, email: email, presentation_id: presentation_id }
    });

    this.ok( web.instance.errors.any, 'does not have an error' );
    this.ok( web.instance.errors.presentation_id, 'does not have error for presentation' );
    this.equal( web.result.view, 'join', 'did not show correct view' );
    this.equal( web.result.params.name, name, 'has previous value for name' );
    this.equal( web.result.params.email, email, 'has previous value for email' );
    this.equal( web.result.params.presentation_id, presentation_id, 'has previous value for presentation_id' );

  },

  will_join_presentation_correctly: function() {

    // setup a basic presentation
    var presentation = new Presentation()
      , leader = new User()
      , name = 'name'
      , email = '';

    User.login( leader );
    Presentation.register( presentation );
    presentation.add( leader );

    var presentation_id = presentation.id

    // try and submit
    var web = WebRequest.post( JoinPresentationRequest, {
      body: { name: name, email: email, presentation_id: presentation_id }
    });

    // should redirect
    this.ok( !web.instance.errors.any, 'does not have an error' );
    this.equal( web.result.redirect, '/{1}/'.assign( presentation.identity ), 'did not show correct view' );

  },

  will_join_presentation_with_extra_id_formatting: function() {

    // setup a basic presentation
    var presentation = new Presentation()
      , leader = new User()
      , name = 'name'
      , email = '';

    User.login( leader );
    Presentation.register( presentation );
    presentation.add( leader );

    var presentation_id = presentation.identity;

    // try and submit
    var web = WebRequest.post( JoinPresentationRequest, {
      body: { name: name, email: email, presentation_id: presentation_id }
    });

    // should redirect
    this.ok( !web.instance.errors.any, 'does not have an error' );
    this.equal( web.result.redirect, '/{1}/'.assign( presentation.identity ), 'did not show correct view' );

  }



});