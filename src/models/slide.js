
// a slide displayed

var $$class = module.exports = function Slide( params, directory, expand ) {
  var $this = this
    , $params = params || { }
    , $expand = expand || false
    , $presentation = $params.presentation || { }
    , $directory = directory
    , $location = $params.value
    , $content
    ,

    _format = function( content ) {

      // update the content
      content = content.replace(/\$\{PRESENTATION\_ID\}/gi, $presentation.identity );
      
      // update and return
      return content;
    },

    // grabs the content for the slides
    _expand = function() {

      // if already cached, use it
      if ( $content )
        return _format( $content );

      // check for a path
      if ( !$location )
        return _format( $content = $params.content );

      // read content if possible
      var path = $$path.join( $directory, $location )
        , exists = $$fs.existsSync( path )
        , file = exists && $$fs.readFileSync( path )
        , content = file && file.toString();
      
      // read in the content
      $content = content || '';
      return _format( $content );

    };

  // expand if needed
  if ( expand ) _expand();


  __define( $this, {
    type: { get: function() { return 'slide' }, enumerable: true },
    content: { get: _expand, enumerable: true }
  });

};