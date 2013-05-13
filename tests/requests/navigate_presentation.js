var $$presentation = null
  , $$leader = null
  , $$user = null;

require('../test')( module, {

  navigation_setup_and_authentication: {

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

      // include two separate users
      $$leader = User.login({ name: 'fred' });
      $$user = User.login({ name: 'mike' });

      $$presentation.add( $$leader );
      $$presentation.add( $$user );
    },

    is_a_thing: function() {
      var web = new WebRequest();
      this.ok( NavigatePresentationRequest, 'does not exist' );
      this.ok( new NavigatePresentationRequest( web.request, web.response ) instanceof NavigatePresentationRequest );
    },

    requires_move_parameter: function() {
      var web = WebRequest.post( NavigatePresentationRequest );
      this.equals( web.result.json.success, false, 'should have failed' );
      this.equals( web.result.json.error, 'invalid_direction', 'did not provide reason why' );
    },

    requires_existing_presentation: function() {
      var web = WebRequest.post( NavigatePresentationRequest, {
        body: { move: 'next' },
        route: { presentation_id: 'missing' }
      });

      this.equals( web.result.json.success, false, 'should have failed' );
      this.equals( web.result.json.error, 'missing_presentation', 'did not provide reason why' );
    },

    requires_leader_navigate : function() {
      var web = WebRequest.post( NavigatePresentationRequest, {
        body: { move: 'next' },
        route: { presentation_id: $$presentation.identity },
        session: { user: $$user.id }
      });

      this.equals( web.result.json.success, false, 'should have failed' );
      this.equals( web.result.json.error, 'invalid_user', 'did not provide reason why' );
    },

    // will find the presentation as required
    will_allow_leader_to_navigate: function() {
      var web = WebRequest.post( NavigatePresentationRequest, {
        body: { move: 'next' },
        route: { presentation_id: $$presentation.identity },
        session: { user : $$leader.id }
      });

      this.ok( web.result.json.success, 'did not advance to next view' );
    }

  },

  navigation_over_multiple_requests: {

    can_setup_presentation: function() {

      // load in presentations
      var path = $$path.join( __dirname, '/../data/presentations' );
      $$config.mock( 'presentation_directory', path );
      Presentation.repository.refresh();

      // create the presentation that will be displayed
      $$presentation = new Presentation('presentation_a');
      Presentation.register( $$presentation );
      $$leader = User.login({ name: 'fred' });
      $$presentation.add( $$leader );

      // starts at first slide
      this.equal( $$presentation.index, 0, 'did not start at first view' );
      this.ok( $$presentation.view instanceof Slide, 'did not start with instance of Slide' );
      this.equal( $$presentation.view.type, 'slide', 'did not start with type of slide' );
    },

    stays_within_range_moving_backwards: function() {
      var web = WebRequest.post( NavigatePresentationRequest, {
        body: { move: 'prev' },
        route: { presentation_id: $$presentation.identity },
        session: { user : $$leader.id }
      });

      this.ok( web.result.json.success, 'did not stay on first view' );
      this.equal( web.instance.presentation.index, 0, 'did not return at the first view' );
      this.ok( web.instance.presentation.view instanceof Slide, 'did not have instance of Slide' );
      this.equal( web.instance.presentation.view.type, 'slide', 'did not have type of slide' );
    },

    can_navigate_second_slide: function() {
      var web = WebRequest.post( NavigatePresentationRequest, {
        body: { move: 'next' },
        route: { presentation_id: $$presentation.identity },
        session: { user : $$leader.id }
      });

      this.ok( web.result.json.success, 'did not advance to next view' );
      this.equal( web.instance.presentation.index, 1, 'did not resume at the second view' );
      this.ok( web.instance.presentation.view instanceof Slide, 'did not have instance of Slide' );
      this.equal( web.instance.presentation.view.type, 'slide', 'did not have type of slide' );
    },

    can_navigate_third_slide: function() {
      var web = WebRequest.post( NavigatePresentationRequest, {
        body: { move: 'next' },
        route: { presentation_id: $$presentation.identity },
        session: { user : $$leader.id }
      });

      this.ok( web.result.json.success, 'did not advance to next view' );
      this.equal( web.instance.presentation.index, 2, 'did not resume at the third view' );
      this.ok( web.instance.presentation.view instanceof Slide, 'did not have instance of Slide' );
      this.equal( web.instance.presentation.view.type, 'slide', 'did not have type of slide' );
    },

    can_navigate_fourth_slide: function() {
      var web = WebRequest.post( NavigatePresentationRequest, {
        body: { move: 'next' },
        route: { presentation_id: $$presentation.identity },
        session: { user : $$leader.id }
      });

      this.ok( web.result.json.success, 'did not advance to next view' );
      this.equal( web.instance.presentation.index, 3, 'did not resume at the fourth view' );
      this.ok( web.instance.presentation.view instanceof Test, 'did not have instance of Test' );
      this.equal( web.instance.presentation.view.type, 'test', 'did not have type of test' );
    },

    can_navigate_fifth_slide: function() {
      var web = WebRequest.post( NavigatePresentationRequest, {
        body: { move: 'next' },
        route: { presentation_id: $$presentation.identity },
        session: { user : $$leader.id }
      });

      this.ok( web.result.json.success, 'did not advance to next view' );
      this.equal( web.instance.presentation.index, 4, 'did not resume at the fifth view' );
      this.ok( web.instance.presentation.view instanceof Ranking, 'did not have instance of Ranking' );
      this.equal( web.instance.presentation.view.type, 'ranking', 'did not have type of ranking' );
    },

    can_navigate_sixth_slide: function() {
      var web = WebRequest.post( NavigatePresentationRequest, {
        body: { move: 'next' },
        route: { presentation_id: $$presentation.identity },
        session: { user : $$leader.id }
      });

      this.ok( web.result.json.success, 'did not advance to next view' );
      this.equal( web.instance.presentation.index, 5, 'did not resume at the sixth view' );
      this.ok( web.instance.presentation.view instanceof Slide, 'did not have instance of Slide' );
      this.equal( web.instance.presentation.view.type, 'slide', 'did not have type of slide' );
    },
    
    stays_within_range_moving_forwards: function() {
      var web = WebRequest.post( NavigatePresentationRequest, {
        body: { move: 'next' },
        route: { presentation_id: $$presentation.identity },
        session: { user : $$leader.id }
      });

      this.ok( web.result.json.success, 'did not advance to next view' );
      this.equal( web.instance.presentation.index, 5, 'did not resume at the sixth view' );
      this.ok( web.instance.presentation.view instanceof Slide, 'did not have instance of Slide' );
      this.equal( web.instance.presentation.view.type, 'slide', 'did not have type of slide' );
    },

    can_cleanup_presentation: function() {
      $$presentation = null;
      $$leader = null;
      $$user = null;
      Presentation.clear();
      User.clear();
    }

  }

});