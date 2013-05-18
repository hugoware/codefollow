$(function() {
  var $this = this
    , $url = window.location.pathname
    , $next = $('#next')
    , $prev = $('#prev')
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
    },

    // navigates to a new slide
    _navigate = function() {
      if ( _is_busy() ) return;
      console.log('send');

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