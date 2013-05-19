require('../test')( module, {

  after: function() { $$config.reset(); },
  before: function() {
    var path = $$path.join( __dirname, '/../data/presentations' );
    $$config.mock( 'presentation_directory', path );
  },


  reader_identifies_existing_and_non_existing: function() {
    this.ok( (new PresentationReader( 'presentation_a' )).exists, 'did find valid presentation');
    this.ok( !(new PresentationReader( 'presentation_c' )).exists, 'still found invalid presentation');
  },

  identifies_sections_within_a_presentation: function() {
    var presentation_a = new PresentationReader( 'presentation_a' )
      , presentation_b = new PresentationReader( 'presentation_b' );

    this.equal( presentation_a.title, 'Presentation A', 'did not find correct title for presentation a' );
    this.equal( presentation_b.title, 'Presentation B', 'did not find correct title for presentation b' );
    this.equal( presentation_a.description, 'desc for a', 'did not find correct description for presentation a' );
    this.equal( presentation_b.description, 'desc for b', 'did not find correct description for presentation b' );

    // check for tags as well
    this.equal( presentation_a.tags.length, 3, 'did not find correct tags for presentation a' );
    this.equal( presentation_a.tags[0], 'javascript', 'did not find correct tag for presentation a at 0' );
    this.equal( presentation_a.tags[1], 'programming', 'did not find correct tag for presentation a at 1' );
    this.equal( presentation_a.tags[2], 'coding', 'did not find correct tag for presentation a at 2' );

    // check for defaulting values
    this.ok( presentation_b.tags instanceof Array, 'did not default to empty array' )

  },

  should_expand_all_files_when_needed: function() {
    var presentation = new PresentationReader('presentation_a', { expand: true });
    this.equal( presentation.views[0].content, 'slide 1 content', 'missing correct content for slide 1' );
    this.equal( presentation.views[1].content, 'inline content', 'missing correct content for slide 2' );
    this.equal( presentation.views[2].content, 'slide 2 content', 'missing correct content for slide 3' );

    // tests should also expand as needed
    this.equal( presentation.views[3].explanation, 'explained here', 'did not have test explanation' )
  },

  should_detect_custom_stylesheet: function() {
    var presentation_a = new PresentationReader('presentation_a', { expand: true })
      , presentation_b = new PresentationReader('presentation_b', { expand: true });

    this.ok( presentation_a.stylesheet, 'did not detect custom stylesheet' );
    this.ok( !presentation_b.stylesheet, 'detected custom stylesheet where there was none' );
    
    
  }


});