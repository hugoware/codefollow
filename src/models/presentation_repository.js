
// handles tracking active sessions and available presentations
module.exports = $$class = function PresentationRepository( params ) {
  var $this = this
    , $params = params || { }
    , $locator = new PresentationLocator()

    // presentations in progress
    , $active = { }
    
    , _get_active= function() { return $active; }
    , _get_available= function() { return $locator.available; }
    , _get_locator= function() { return $locator; }
    ,
    
    // the total count of active presentations
    _in_progress = function() {
      var count = 0;
      _.each( $active, function() { count++; });
      return count;
    },

    // attempts to find an unused id
    _unique_id = function() {
      var length = $$config.presentation_id_length
        , limit = $$config.max_unique_id_attempts;

      for (var i = limit, id = null; i-- > 0, id = Object.generate_id( length ); )
        if ( !!!$active[ id ] ) return id;

      console.log( id );

      return null;
    },

    // wipes out existing presentations
    _clear = function() { 
      $active = { };
    },

    // starting a new session
    _register = function( presentation ) {
      if ( !( presentation instanceof Presentation )) throw 'invalid_type';

      // set an ID
      presentation.id = presentation.id || _unique_id();
    
      // validate
      var blank = presentation.id == null
        , in_use = $active[ presentation.id ]
        , invalid = blank || in_use;
    
      // make sure there is an id
      if ( invalid ) throw 'invalid_presentation';

      $active[ presentation.id ] = presentation;
    },
    
    // checks for sessions with a user
    _find_by_user = function( user ) {
      for (var a in $active)
        if ( $active[a].has_user( user ) )
          return $active[ a ];
    },
    
    // checks for a session by ID
    _find_by_id = function( id ) { return $active[ id ]; },
    
    // locates a presentation
    _find = function( params ) {
      return params.user ? _find_by_user( params.user )
        : params.id ? _find_by_id( params.id )
        : null;
    },

    _init = function() {
      $locator.refresh();
    };


  // share public values
  __define( $this, {
    find: _find,

    in_progress: { get: _in_progress },
    active: { get: _get_active },
    available: { get: _get_available },

    refresh: $locator.refresh,
    register: _register,
    clear: _clear,
    unique_id: _unique_id
  });

};
