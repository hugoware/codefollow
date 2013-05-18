
// a slide displayed

var $$class = module.exports = function Slide( params, directory, expand ) {
  var $this = this
    , $params = params || { }
    , $expand = expand || false
    , $presentation = $params.presentation
    , $directory = directory
    ,

    // grabs the content for the slides
    _expand = function() {

      // if already cached, use it
      if ( $params.content ) return $params.content;

      // check for a path
      if ( !$params.value ) return '';

      // read content if possible
      var path = $$path.join( $directory, $params.value )
        , exists = $$fs.existsSync( path )
        , file = exists && $$fs.readFileSync( path )
        , content = file && file.toString();
      
      // only read 
      if ( content )
        return ( $params.content = content );

    };

  // expand if needed
  if ( expand ) _expand();


  __define( $this, {
    type: { get: function() { return 'slide' }, enumerable: true },
    content: { get: _expand, enumerable: true }
  });

};