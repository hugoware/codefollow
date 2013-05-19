require('../test')( module, {

  after: function() { },
  before: function() {
    Presentation.clear();
  },


  presentation_is_a_thing : function() {
    this.ok( Presentation, 'exists' );
    this.ok( new Presentation, 'can be instantiated' )
  },

  can_add_things_to_presentation : function() {
    var presentation = new Presentation()
      , invalid_user = { }
      , valid_user = new User();

    this.doesNotThrow( function() { presentation.add( valid_user ); }, 'unknown_type', 'throws on valid types');
    this.equal( presentation.users.length, 1, 'not enough users added' );
    this.throws( function() { presentation.add( invalid_user ); }, 'unknown_type', 'throws on invalid types');
    this.equal( presentation.users.length, 1, 'too many users added' );

  },

  can_validate_users_exist : function() {
    var presentation = new Presentation()
      , leader = new User()
      , missing_user = new User()
      , actual_user = new User();

    presentation.add( leader );
    presentation.add( actual_user );
    
    this.ok( presentation.is_leader( leader ), 'did not correctly identify leader' );
    this.ok( !presentation.is_leader( actual_user ), 'incorrectly identified actual_user as leader' );
    this.ok( !presentation.is_leader( missing_user ), 'incorrectly identified missing_user as leader' );

    this.ok( presentation.is_user( actual_user ), 'did not correctly identify actual_user as user' );
    this.ok( !presentation.is_user( leader ), 'incorrectly identified actual_user as user' );
    this.ok( !presentation.is_user( missing_user ), 'incorrectly identified missing_user as user' );

    this.ok( presentation.is_member( actual_user ), 'did not correctly identify actual_user as member' );
    this.ok( presentation.is_member( actual_user ), 'did not correctly identify leader as member' );
    this.ok( !presentation.is_member( missing_user ), 'incorrectly identified missing_user as member' );
  },

  can_remove_users: function() {
    var presentation = new Presentation()
      , user_1 = new User({ email: 'user_1@mail.com' })
      , user_2 = new User({ email: 'user_2@mail.com' })
      , user_3 = new User({ email: 'user_3@mail.com' })
      , missing_user = new User({ email: 'missing@mail.com' });

    // add multiple users
    presentation.add( user_1 );
    this.equal( presentation.users.length, 1, 'not enough users added' );
    presentation.add( user_2 );
    this.equal( presentation.users.length, 2, 'not enough users added' );
    presentation.add( user_3 );
    this.equal( presentation.users.length, 3, 'not enough users added' );

    // remove users
    presentation.remove( user_1 );
    this.equal( presentation.users.length, 2, 'not enough users removed' );
    presentation.remove( user_2 );
    this.equal( presentation.users.length, 1, 'not enough users removed' );
    presentation.remove( user_3 );
    this.equal( presentation.users.length, 0, 'not enough users removed' );

  },

  should_not_remove_incorrect_users: function() {
    var presentation = new Presentation()
      , user_1 = new User({ email: 'user_1@mail.com' })
      , missing_user = new User({ email: 'missing@mail.com' });

    this.equal( presentation.users.length, 0, 'should not have any users' );

    // handle finding and removing
    presentation.add( user_1 );
    this.equal( presentation.users.length, 1, 'not enough users added' );

    // remove a non existent user
    presentation.remove( missing_user );
    this.equal( presentation.users.length, 1, 'removed when no user was found' );

    // find and remove
    var located_user = presentation.find_user( user_1.id );
    this.ok( located_user instanceof User, 'did not find a user by id' )
    presentation.remove( located_user );

    // should remove the user
    this.equal( presentation.users.length, 0, 'not enough users removed' );
  },

  a_remote_key_is_generated: function() {
    var presentation = new Presentation('presentation_a');
    this.ok( Object.isString( presentation.remote_key), 'did not generate a remote key' );
    this.equal( presentation.remote_key.length, $$config.remote_key_length, 'did not generate correct length' );
    this.equal( presentation.remote_key, _.numbers( presentation.remote_key ), 'did not only use numbers' );
  },

  a_test_key_is_generated: function() {
    var presentation = new Presentation('presentation_a');
    this.ok( Object.isString( presentation.test_key), 'did not generate a test key' );
    this.equal( presentation.test_key.length, $$config.test_key_length, 'did not generate correct length' );
    this.equal( presentation.test_key, _.numbers( presentation.test_key ), 'did not only use numbers' );
  },

  knows_where_it_lives: function() {
    var presentation = new Presentation('presentation_a')
      , expected = $$path.join( $$config.presentation_directory, 'presentation_a' );

    this.ok( presentation.directory, 'did not have a directory' );
    this.equal( presentation.directory, expected, 'did not have correct directory' );
  },

  will_return_user_content: function() {

    // include a user
    var presentation = new Presentation()
      , user = new User();
    presentation.add( user );

    // get the default info
    var starting_content = presentation.zones_for( user )
      , starting_count = 0;

    // get the counts
    for ( var a in starting_content ) starting_count++;

    // update some properties
    starting_content.first = '1';
    starting_content.second = '2';
    starting_content.third = '3';


    // get the updated info
    var updated_content = presentation.zones_for( user )
      , updated_count = 0;

    // get the counts
    for ( var a in updated_content ) updated_count++;

    // verify everything
    this.ok( starting_content, 'did not have default object' );
    this.equal( starting_count, 0, 'already had populated values' );
    this.ok( updated_content, 'did not have updated object' );
    this.equal( updated_count, 3, 'not enough values' );

    // verify everything was found
    this.equal( updated_content.first, '1', 'did not match first value' );
    this.equal( updated_content.second, '2', 'did not match second value' );
    this.equal( updated_content.third, '3', 'did not match third value' );

  },

  can_peek_ahead: function() {
    var path = $$path.join( __dirname, '/../data/presentations' );
    $$config.mock( 'presentation_directory', path );
    Presentation.repository.refresh();

    // create the presentation that will be displayed
    var presentation = new Presentation('presentation_a');

    this.ok( presentation.peek(), 'did not have anything to peek' );
    this.equal( presentation.peek().type, 'slide', 'first peeked item was not a slide' );
    this.equal( presentation.peek().content, 'inline content', 'first peeked had wrong content' );

    presentation.next();

    this.ok( presentation.peek(), 'second did not anything to peek' );
    this.equal( presentation.peek().type, 'slide', 'second peeked item was not a slide' );
    this.equal( presentation.peek().content, 'slide 2 content', 'second peeked had wrong content' );

    // check for peeking too far
    presentation.index = presentation.views.length;
    this.ok( !presentation.peek(), 'too far did not anything to peek' );
  },

  is_aware_of_custom_stylesheets: function() {
    var path = $$path.join( __dirname, '/../data/presentations' );
    $$config.mock( 'presentation_directory', path );
    Presentation.repository.refresh();

    // create the presentation that will be displayed
    var presentation_a_minimum = new Presentation('presentation_a')
      , presentation_b_minimum = new Presentation('presentation_b')
      , presentation_a_expand = new Presentation('presentation_a', { expand: true })
      , presentation_b_expand = new Presentation('presentation_b', { expand: true });

    this.ok( !presentation_a_minimum.stylesheet, 'presentation a (not expanded) should not have a stylesheet' );
    this.ok( !presentation_b_minimum.stylesheet, 'presentation b (not expanded) should not have a stylesheet' );
    this.ok( presentation_a_expand.stylesheet, 'presentation a (expanded) should have a stylesheet' );
    this.ok( !presentation_b_expand.stylesheet, 'presentation b (expanded) should not have a stylesheet' );
    

  }


});