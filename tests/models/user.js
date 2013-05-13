require('../test')( module, {

  user_is_a_thing: function() {
    this.ok( User, 'User does not exist');
    this.ok( new User instanceof User, 'cannot instantiate' );
  },

  values_are_assigned_when_instantiated: function() {
    var name = 'fred'
      , email = 'fred@test.com'
      , params = { name: name, email: email }
      , user = new User( params );

    this.notEqual( user.id, null, 'generates a user id' );
    this.ok( user.id.length > 10, 'generates a unique id' );
    this.equal( user.name, name, 'name is not correct' );
    this.equal( user.email, email, 'email is not correct' );
  },

  input_removes_leading_and_trailing_whitespace: function() {
    var name = '    fred     '
      , email = '    fred@test.com    '
      , fixed_name = name.trim()
      , fixed_email = email.trim()
      , params = { name: name, email: email }
      , user = new User( params );

    this.equal( user.name, fixed_name, 'name was not formatted' );
    this.equal( user.email, fixed_email, 'email was not formatted' );
  },

  properties_cannot_be_changed: function() {

    var name = 'fred'
      , email = 'fred@test.com'
      , changed_name = 'mike'
      , changed_email = 'mike@test.com'
      , params = { name: name, email: email }
      , user = new User( params );

    // reset the values
    user.name = changed_name;
    user.email = changed_email;

    // should remain the same
    this.equal( user.name, name, 'name is not correct' );
    this.equal( user.email, email, 'email is not correct' );

  },

  gravatar_is_generated_from_email_hash: function() {

    var email = 'fred@test.com'
      , expected = 'fc3aa257dd18e035ad401650492dd6c4aa4c1ef4'
      , params = { email: email }
      , user = new User( params )
      , actual = user.gravatar;

    this.equal( actual, expected, 'gravatar is not correct' );

  },

  can_validate_user: function() {
    var invalid_required = { name: '', email: '' }
      , invalid_too_long = { name: String.generate(76), email: String.generate(151) }
      , invalid_email = { name: 'valid', email:'something.com' }
      , valid = { name: 'valid', email: 'valid@website.com' }
      , required_errors = User.validate( invalid_required )
      , too_long_errors = User.validate( invalid_too_long )
      , invalid_email_errors = User.validate( invalid_email );

    this.ok( required_errors.any, 'missing errors for required errors');
    this.equal( required_errors.name, 'required', 'missing name for required errors');
    this.equal( required_errors.email, null, 'should not have email for required errors');

    this.ok( too_long_errors.any, 'missing errors for required errors');
    this.equal( too_long_errors.name, 'too_long', 'missing name for too long errors');
    this.equal( too_long_errors.email, 'too_long', 'missing email for too long errors');
    
    this.ok( invalid_email_errors.any, 'missing errors for required errors');
    this.equal( invalid_email_errors.name, null, 'should not have email for invalid email errors');
    this.equal( invalid_email_errors.email, 'invalid', 'missing email for invalid email errors');

  },

  user_can_login_with_params: function() {
    var params = { name: 'fred', email:'' }
      , user = User.login( params );

    this.ok( user instanceof User, 'created new user account' );
    this.ok( user.id, 'user session was not created' );
    this.ok( user.id.length > 15, 'hash length was meaningful' );
  },

  login_will_optionally_update_a_session: function() {
    var params = { name: 'fred', email:'' }
      , session = { }
      , user = User.login( params, session );

    this.ok( user instanceof User, 'created new user account' );
    this.ok( user.id, 'user session was not created' );
    this.ok( user.id.length > 15, 'hash length was meaningful' );
    this.equal( session.user, user.id, 'did not update the session' );
  },

  user_can_login_with_user: function() {
    var params = { name: 'fred', email:'' }
      , user = new User( params )
      , attempt = User.login( user );

    this.ok( user instanceof User, 'created new user account' );
    this.ok( attempt instanceof User, 'returned user account' );
    this.ok( attempt === user, 'returned same user account' );
    this.ok( user.id, 'user session was not created' );
    this.ok( attempt.id, 'attempt missing same ID (same object)' );
    this.ok( user.id.length > 15, 'hash length was meaningful' );
  },

  can_find_logged_in_user: function() {
    var user = new User({ name: 'fred' })
      , attempt = User.login( user )
      , exists_by_user = User.exists( user )
      , exists_by_id = User.exists( user.id )
      , find_by_user = User.find( user )
      , find_by_id = User.find( user.id )
      , exists_by_null = User.find( null )
      , find_by_null = User.find( null )
      , exists_by_invalid = User.find( '111' )
      , find_by_invalid = User.find( '111' )

    this.ok( exists_by_user, 'did not exist using User' );
    this.ok( exists_by_id, 'did not exist using ID' );
    this.ok( find_by_user instanceof User, 'did not find using User' );
    this.ok( find_by_id instanceof User, 'did not find using ID' );
    this.equal( exists_by_null, null, 'user exists using null' );
    this.equal( find_by_null, null, 'user found using null' );
    this.equal( exists_by_invalid, null, 'user exists using invalid' );
    this.equal( find_by_invalid, null, 'user found using invalid' );
  }

});

