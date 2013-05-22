
// the presentation instance
var $$class = module.exports = function Presentation( key, params ) {
  var $params = params || { }
    , $this = this

    // the presentation content
    , $reader = null

    // the presentation view everyone should be looking at
    , $users = [ ]
    , $content = { }
    , $key = key
    , $id = null
    , $socket = null
    , $remote_key = Object.generate_id( $$config.remote_key_length )
    , $test_key = Object.generate_id( $$config.test_key_length )

    // get location of the presentation
    , $directory = $$path.join( $$config.presentation_directory, key )

    // the view being displayed
    , $index = 0
    , 

    // getters and setters
    _get_users = function() { return $users; },
    _get_id = function() { return $id; },
    _set_id = function( value ) { $id = _.trim( value ); },
    _get_key = function() { return $key; },
    _get_view = function() { return $reader.views[ $index ]; },
    _get_remote_key = function() { return $remote_key; },
    _get_test_key = function() { return $test_key; },
    _get_directory = function() { return $directory; },
    _get_stylesheet = function() { return $reader.stylesheet; },

    // getters
    _get_leader = function() { return $leader; },
    _get_title = function() { return $reader.title; },
    _get_views = function() { return $reader.views; },
    _get_slides = function() { return _.select( $reader.views, function( view ) { return view instanceof Slide; }); },
    _get_tests = function() { return _.select( $reader.views, function( view ) { return view instanceof Test; }); },

    // managing the view
    _get_index = function() { return $index; }
    _set_index = function( index ) {
      $index = Math.max( Math.min( index, $reader.views.length - 1 ), 0 );
    },

    // grabs user content if any
    _zones_for = function( user, test ) {
      user = user instanceof User ? user.id : user;
      var content = $content[ user ] || { };

      // if this needs to be filtered
      if ( !test ) return content;

      // grab values for the test only
      var keep = { }
      test.zones.each( function( zone ) {
        target = zone['for'];
        keep[ target ] = content[ target ] || '';
      });

      return keep;
    },

    _identity = function() { 
      if ( !$id ) return;
      return [ $id.substr(0,3), $id.substr(3,3), $id.substr(6,3) ].join('-');
    },

    // loads a presentation as required
    _init = function() {
      if ( !$key ) return;
      $reader = new PresentationReader( $key, $params, $this );
    },

    // sets up a presentation so it can broadcast
    _activate = function() {
      // does nothing now, may eventually setup a socket.io connection
    },

    // slide navigation
    _next = function() { _set_index( $index + 1 ); },
    _previous = function() { _set_index( $index - 1 ); },
    _peek = function() { return $reader.views[ $index + 1 ]; },
    

    // adds something to a presentation
    _add = function( thing ) {
      if ( thing instanceof User )
        _add_user( thing );
      else
        throw 'unknown_type';
    },

    // includes a new user
    _add_user = function( user ) {
      
      // make the leader if needed
      if ( $users.length == 0 )
        $leader = user;

      // clear existing (if any)
      _remove_user( user );
      delete $content[ user.id ];

      // add the new record
      $users.push( user );
      $content[ user.id ] = { };
    },

    // drops something from the presentation
    _remove = function( thing ) {
      if( thing instanceof User )
        _remove_user( thing );
      else
        throw 'unknown_type';
    },

    // removes a user 
    _remove_user = function( user ) {
      var id = user instanceof User ? user.id : user;
      $users = _.select( $users, function( existing ) { return !_.compare( id, existing.id ); });
    },

    // locates a user with their id
    _find_user = function( id ) {
      return _.select( $users, function( user ) { return _.compare( id, user.id ); })[ 0 ];
    },

    // checks if a user is in a presentation or not
    _is_member = function( user ) { return user instanceof User && !!_.first( $users, _.all({ id: user.id }) ); },
    _is_user = function( user ) { return _is_member( user ) && !_is_leader( user ); },
    _is_leader = function( user ) { return $leader && user instanceof User && $leader.id == user.id; }
  ;

  // finish loading the presentation
  _init();


  // setup
  __define( $this, {
    index: { get: _get_index, set: _set_index },
    leader: { get: _get_leader },

    users: { get: _get_users },
    key: { get:_get_key },
    remote_key: { get:_get_remote_key },
    test_key: { get:_get_test_key },
    id: { get:_get_id, set:_set_id },
    identity: { get:_identity },
    view: { get:_get_view },
    activate: _activate,
    add: _add,
    remove: _remove,
    find_user: _find_user,
    is_member: _is_member,
    is_user: _is_user,
    is_leader: _is_leader,

    // navigation
    next: _next,
    previous: _previous,
    peek: _peek,

    // content
    zones_for: _zones_for,

    // other getters
    title: { get: _get_title },
    views: { get: _get_views },
    slides: { get: _get_slides },
    tests: { get: _get_tests },
    directory: { get: _get_directory },
    stylesheet: { get: _get_stylesheet }
    
  });

};

var __register = function( presentation ) {
  presentation.activate();
  $$repository.register( presentation );
};


// shared objects
$$repository = new PresentationRepository();


// static methods
__define( $$class, {
  repository: { get: function() { return $$repository; } },
  register: __register,
  clear: $$repository.clear,

  locator: { get: function() { return $$repository.locator; } },
  active: { get: function() { return $$repository.active; } },
  available: { get: function() { return $$repository.available; } },
  in_progress: { get: function() { return $$repository.in_progress; } }
});

