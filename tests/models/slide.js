var $fs = require('fs')
  , $path = require('path')
  , $directory = $path.join( __dirname, '../data/presentations/presentation_a/' );


require('../test')( module, {

  slide_is_a_thing: function() {
    this.ok( Slide, 'slide does not exist' );
    this.ok( new Slide, 'slide cannot be instantiated' );
  },

  accepts_inline_content: function() {
    var section = { content: 'testing' }
      , slide = new Slide( section, $directory );
    
    this.equal( slide.type, 'slide', 'type was incorrect' );
    this.equal( slide.content, section.content, 'content did not match' );
  },

  accepts_expanded_content: function() {
    var section = { value: 'content/slide_1.md' }
      , slide = new Slide( section, $directory, true )
      , expected = 'slide 1 content'
      , actual = slide.content;
    
    this.equal( expected, actual, 'content did not match from external file' );
  },

  will_sub_for_special_content : function() {
    var section = { content: 'testing ${PRESENTATION_ID}', presentation: { identity: 'AAAA' } }
      , expected = 'testing AAAA'
      , slide = new Slide( section, $directory );
    
    this.equal( slide.type, 'slide', 'type was incorrect' );
    this.equal( slide.content, expected, 'content did not match' );
  },

  will_sub_for_multiple_special_content : function() {
    var section = { content: 'testing ${PRESENTATION_ID} ${PRESENTATION_ID} ${PRESENTATION_ID}', presentation: { identity: 'AAAA' } }
      , expected = 'testing AAAA AAAA AAAA'
      , slide = new Slide( section, $directory );
    
    this.equal( slide.type, 'slide', 'type was incorrect' );
    this.equal( slide.content, expected, 'content did not match' );
  }



});