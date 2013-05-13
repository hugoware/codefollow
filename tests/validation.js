require('./test')( module, {

  validation_knows_when_empty: function() {
    var validation = new $$validation();
    this.equal( validation.none, true, 'validation appears to have errors' );
    this.equal( validation.any, false, 'validation appears to have errors' );
  },

  validation_knows_when_is_has_errors: function() {
    var validation = new $$validation();
    validation.error = 'error';

    this.equal( validation.none, false, 'validation appears to have no errors' );
    this.equal( validation.any, true, 'validation appears to have no errors' );
  }

});