$(function() {
  var $this = this
    , $url = window.location.pathname
    , $next = $('#next')
    , $prev = $('#prev')
    , $preview = $('#preview')
    , $content = $('#content')
    , $current = $('#current')
    , $type = $('#type')
    , $activity = $('#activity')
    ,

    // handle activity
    _busy = function() { $activity.show(); },
    _ready = function() { $activity.hide(); },
    _is_busy = function() { return $activity.is(':visible'); },

    // shows any error messages
    _error = function() {
      alert('error');
    },

    // updates the current view
    _update = function( result ) {
      console.log( result );
      if ( result.current ) $current.text( result.current );
      if ( result.next ) {
        if ( result.next.preview ) $content.text( result.next.preview );
        if ( result.next.type ) $type.text( result.next.type );
      }
    },

    // navigates to a new slide
    _navigate = function() {
      if ( _is_busy() ) return;

      // find the update to send
      var button = $(this)
        , move = button.attr('id')
        , data = { move: move };

      // request the slide change
      $.ajax({
        url: $url,
        data: data,
        dataType: 'json',
        type: 'post'
      })
      .done( _update )
      .fail( _error )
      .always( _ready )

    };

  $next.add( $prev )
    .click( _navigate );


});