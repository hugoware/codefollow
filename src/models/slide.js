
// a slide displayed

var $$class = module.exports = function Slide( params, directory, expand ) {
  var $this = this
    , $params = params || { }
    , $expand = expand || false
    , $presentation = $params.presentation || { }
    , $directory = directory
    ,

    _format = function() {

      // update the content
      var content = $params.content;
      content = content.replace(/\$\{PRESENTATION\_ID\}/gi, $presentation.identity );
      
      // update and return
      return content;
    },

    // grabs the content for the slides
    _expand = function() {

      // if already cached, use it
      if ( $params.content )
        return _format();

      // check for a path
      if ( !$params.value )
        return ( $params.content = '' );

      // read content if possible
      var path = $$path.join( $directory, $params.value )
        , exists = $$fs.existsSync( path )
        , file = exists && $$fs.readFileSync( path )
        , content = file && file.toString();
      
      // read in the content
      $params.content = content || '';
      return _format();

    };

  // expand if needed
  if ( expand ) _expand();


  __define( $this, {
    type: { get: function() { return 'slide' }, enumerable: true },
    content: { get: _expand, enumerable: true }
  });

};