
module.exports = $$class = function UserRepository( params ) {
  var $this = this
    , $params = params || { }
    ,

    // finds a unique user id
    _unique_id = function() {
      return _.hash( new Date );

    },

    // add the account
    _add = function( user ) {
      user.id = _unique_id();
      $active[ user.id ] = user;
    },

    // removes a user ID if needed
    _remove = function( id ) {
      if ( id instanceof User )
        id = id.id;

      delete $active[ id ];
    }


  __define( $this, {
    unique_id: _unique_id,

    add: _add,
    remove: _remove
  });

};