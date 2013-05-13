require('../test')( module, {

  before: function() {
    Presentation.clear();
  },

  is_a_thing: function() {
    this.ok( PresentationRepository, 'does not exist' );
    this.ok( new PresentationRepository() instanceof PresentationRepository, 'cannot instantiate class' );
  },

  presenations_are_registered : function() {
    var first = new Presentation()
      , second = new Presentation();

    // set conflicting ids
    first.id = 1;
    second.id = 1;

    // first time should be okay
    this.doesNotThrow( function() { Presentation.register( first ); }, 'invalid_presentation', 'fails when not session available' );
    this.equal( Presentation.in_progress, 1, 'not enough registered presentations' )

    // third will be an actual unique number (no conflicts)
    this.throws( function() { Presentation.register( second ); }, 'invalid_presentation', 'fails when not session available' );
    this.equal( Presentation.in_progress, 1, 'too many registered presentations' )

  },

  presenations_will_generate_unique_id : function() {
    var first = new Presentation()
      , second = new Presentation();

    // first time should be okay
    this.doesNotThrow( function() { Presentation.register( first ); }, 'invalid_presentation', 'failed to add presentation' );
    this.ok( first.id.length == $$config.presentation_id_length, 'invalid id set' );
    this.ok( /^[0-9]+$/g.test( first.id ), 'generated id is incorrect' )

    // third will be an actual unique number (no conflicts)
    this.doesNotThrow( function() { Presentation.register( second ); }, 'invalid_presentation', 'failed to add presentation' );
    this.ok( second.id.length == $$config.presentation_id_length, 'invalid id set' );
    this.ok( /^[0-9]+$/g.test( second.id ), 'generated id is incorrect' )

  },

  unique_id_has_identity: function() {
    var presentation = new Presentation();

    Presentation.register( presentation );
    this.ok( /^\d{3}\-\d{3}\-\d{3}$/.test( presentation.identity ), 'does not match identity format' );
    this.equal( presentation.identity.replace(/[^\d]/g, ''), presentation.id, 'identity is not alias for id' );
  },

  can_clear_existing_sessions: function() {
    Presentation.register( new Presentation() );
    Presentation.register( new Presentation() );
    Presentation.register( new Presentation() );
    
    // make sure clearing removes presentations
    this.equal( Presentation.in_progress, 3, 'did not track enough presentations' );
    Presentation.clear();
    this.equal( Presentation.in_progress, 0, 'did not clear all presentations' );
  }


});