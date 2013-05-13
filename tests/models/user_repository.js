require('../test')( module, {

  is_a_thing: function() {
    this.ok( UserRepository, 'does not exist' );
    this.ok( new UserRepository, 'cannot instantiate' );
  },

  can_generate_unique_ids: function() {

    var repository = new UserRepository();


  }

});