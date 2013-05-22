require( '../test' )( module, {

  is_a_thing: function() {
    this.ok( Preview, 'does not exists' );
    this.ok( new Preview instanceof Preview, 'could not instantiate' );
  },

  generates_correct_url: function() {
    var presentation = { identity: '444-444-444' }
      , test = { location: 'source', execute: 'index.html' }
      , expect = '/{1}/{2}/{3}'.assign( presentation.identity, test.location, test.execute )
      , preview = new Preview( presentation, test );

    this.equal( preview.type, 'preview', 'did not return correct type' )
    this.ok( preview.url, 'did not generate a url' );
    this.equal( preview.url, expect );
  },

  generates_null_without_information: function() {
    var preview = new Preview();

    this.ok( !preview.success, 'should have not been successful' );
    this.equal( preview.type, 'preview', 'did not return correct type' )
    this.equal( preview.url, null, 'missing url was not null' );
  }

});