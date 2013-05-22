require('../test')( module, {

  is_a_thing: function() {
    this.ok( Summary, 'does not exist' );
    this.ok( new Summary instanceof Summary, 'cannot instantiate' );
  },
  
  shows_unknown_when_nothing_is_provided: function() {
    var summary = new Summary();
    this.equal( summary.type, 'unknown', 'did not return correct type' );
    this.equal( summary.preview, 'Unknown', 'did not return correct preview' );
  },
  
  shows_correct_summary_for_tests: function() {
    var view = { type:'test', title:'content' }
      , summary = new Summary( view );
    this.equal( summary.type, view.type, 'did not return correct type' );
    this.equal( summary.preview, view.title, 'did not return correct preview' );
  },
  
  shows_correct_summary_for_slides: function() {
    var view = { type:'slide', content:'content' }
      , summary = new Summary( view );
    this.equal( summary.type, view.type, 'did not return correct type' );
    this.equal( summary.preview, view.content, 'did not return correct preview' );
  },
  
  will_truncate_content_when_too_long: function() {
    var value = String.generate( 51 )
      , expected = value.substr( 0, 50 )
      , view = { type:'slide', content: value }
      , summary = new Summary( view )

    this.equal( summary.type, view.type, 'did not return correct type' );
    this.equal( summary.preview, expected, 'did not return correct preview' );
  },


});