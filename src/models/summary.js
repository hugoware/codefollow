
// creates a standard summary view
var $$class = module.exports = function Summary( view ) {
  var $this = this
    , $view = view || { }

    // the information shared
    , $type = $view.type || 'unknown'
    , $preview
    ,

    // returns preview of the view
    _get_preview = function() { return $preview; },
    _get_type = function() { return $type; },

    // prepares the view
    _init = (function() {

      if ( $view.title )
        $preview = $view.title;
      else if ( $view.content )
        $preview = _.trim( $view.content ).substr( 0, 50 );
      else
        $preview = 'Unknown';

    })();


  __define( $this, {
    preview: { get: _get_preview, enumerable: true },
    type: { get: _get_type, enumerable: true }
  });

};