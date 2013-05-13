require('../test')( module, {

  after: function() { $$config.reset(); },
  before: function() {
    var path = $$path.join( __dirname, '/../data/presentations' );
    $$config.mock( 'presentation_directory', path );
  },

  can_refresh_without_errors: function() {

    var valid_locator = new PresentationLocator();
    this.doesNotThrow( valid_locator.refresh, 'does not have errors with refresh' );

    $$config.mock( 'presentation_directory', '../' );
    var invalid_locator = new PresentationLocator();
    this.doesNotThrow( invalid_locator.refresh, 'does not have errors with refresh' );

  },

  will_locate_presentations: function() {
    var locator = new PresentationLocator();
    locator.refresh();
    this.ok( locator.available, 'did not have presentations returned' );
    this.equal( locator.available.length, 2, 'did not have correct number of presentations returned' );
  },

  available_presentations_have_meta_data: function() {
    var locator = new PresentationLocator();
    locator.refresh();

    // all valid info
    var presentation_a = _.first( locator.available, _.all({ id: 'presentation_a' }));
    this.equal( presentation_a.title, 'Presentation A', 'did not map correct title' );
    this.equal( presentation_a.description, 'desc for a', 'did not map correct description' );
    this.equal( presentation_a.id, 'presentation_a', 'did not map correct key' );
    this.equal( presentation_a.tags.length, 3, 'did not map correct tags' );

  }

});