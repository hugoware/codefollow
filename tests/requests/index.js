
require('../test')( module, {

  is_a_thing: function() {
    this.ok( IndexRequest, 'is not a class' );
    this.ok( new IndexRequest() instanceof IndexRequest, 'could not create class' )
  },

  renders_correct_view: function() {
    var request = WebRequest.run( IndexRequest );

    this.equal( request.result.view, 'index', 'did not render correct view' );
    this.equal( request.result.params, null, 'had parameters instead of null' );
  }

});