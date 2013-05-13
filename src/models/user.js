
// active user sessions
var $$users = { };

// the User class
module.exports = $$class = function User( params ) {
  var $this = this
    , $params = params || { }

    // default values
    , $name = _.trim( $params.name )
    , $email = _.trim( $params.email )
    , $id = _.hash( [ $name, $email, Math.random(), new Date() ].join('-') )
    ,

    // verifies the user is valid
    _validate = function() { return $$class.validate( $this ); },

    // calculates the gravatar for an email
    _gravatar = function() { return _.hash( $email ); }
    

  __define( $this, {
    id: { get: function() { return $id; } },
    name: { get: function() { return $name; }, enumerable: true },
    email: { get: function() { return $email; } },
    gravatar: { get: _gravatar }
  });
  
};


// validates user info
var __validate = function( user ) {
  var errors = new $$validation();

  // test the name first
  if ( user.name.length == 0 )
    errors.name = 'required';
  else if ( user.name.length > 75 )
    errors.name = 'too_long';
  
  // test the name first
  if ( user.email.length > 150 )
    errors.email = 'too_long';
  else if ( user.email.length > 0 && !$$validation.email.test( user.email ) )
    errors.email = 'invalid';

  return errors;
};

var __find = function( user ) {
  var id = user instanceof User ? user.id : user;
  return $$users[ id ];
};

// check if a user is already signed in
var __exists = function( user ) {
  return __find( user ) instanceof User;
};

// adds a user to the user repo
var __login = function( params, session ) {
  var user = params instanceof User ? params : new User( params );
  $$users[ user.id ] = user;

  // update the session if available
  if ( session ) session.user = user.id;
  return user;
};

// reset signed in users
var __clear = function() {
  $$users = { }
};


__define( $$class, {
  active: { get: function() { return $$users; } },
  validate: __validate,
  login: __login,
  exists: __exists,
  find: __find,
  clear: __clear
});