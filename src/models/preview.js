
// generates a preview url for a test
var $$class = module.exports = function Preview( presentation, test ) {
  var $this = this
    , $presentation = presentation
    , $test = test
    , $url = !!$presentation && !!$test && '/{1}/{2}/{3}'.assign( presentation.identity, test.location, test.execute )
    ,
    _get_url = function() { return $url || null; }
    _get_success = function() { return !!$url; };

  __define( $this, {
    type: { get: function() { return 'preview'; }, enumerable: true },
    url: { get: _get_url, enumerable: true },
    success: { get: _get_success, enumerable: true }
  });
};