
// handles reading presentation files

module.exports = $$class = function PresentationReader( source, params, presentation ) {
  var $this = this
    , $params = params || { }

    // paths
    , $exists = true
    , $source = source
    , $directory = $$path.join( $$config.presentation_directory, $source )
    , $index = $$path.join( $directory, 'index' )
    , $stylesheet_location = $$path.join( $directory, 'style.css' )
    , $stylesheet
    , $presentation = presentation

    // presentation content
    , $title
    , $description
    , $tags
    , $views = [ ]
    , $stylesheets = [ ]
    ,

    // getters
    _get_stylesheet = function() { return $stylesheet; },
    _get_exists = function() { return $exists; },
    _get_title = function() { return $title || ''; },
    _get_description = function() { return $description || ''; },
    _get_tags = function() { return $tags || [ ]; },
    _get_views = function() { return $views; },
    _get_stylesheets = function() { return $stylesheets; },
    

    // starts reading the content 
    _init = function() {

      // make sure this is real
      var exists = $$fs.existsSync( $index );
      if ( !exists )
        return $exists = false;

      // read in the file contents
      var file = $$fs.readFileSync( $index )
        , content = file.toString();

      // preprocess special tags
      content = _preprocess( content );

      // process the file
      var reader = new Reader( content );
      _.each( reader.sections, function( i, section ) {
        _add( section );
      });

      // checks for a stylesheet
      if ( $params.expand )
        _detect_stylesheet();

    },

    // process content before the reader
    _preprocess = function( content ) {

      // find all 'merge' tags
      return content.replace( /\[merge [^\]]+\]/gi, function( match ) {

        // replace with file content from match
        var file = match.replace( /^\[merge|\]$/g, '' ).trim()
          , path = $$path.join( $directory, file )
          , exists = $$fs.existsSync( path )
          , content = exists && $$fs.readFileSync( path ).toString() || '';

        // include new lines just in case
        return '\n' + content + '\n';
      });

    },

    // checks if a stylesheet exists
    _detect_stylesheet = function() {
      $stylesheet = $$fs.existsSync( $stylesheet_location );
    },

    // cleans up a section 
    _add = function( section ) {
      Object.merge( section, { presentation: $presentation } );

      // presentation title
      if ( section.type == 'title' )
        $title = _.trim( _.trim( section.value ) + ' ' + _.trim( section.content ) );

      else if ( section.type == 'description' )
        $description = _.trim( _.trim( section.value ) + ' ' + _.trim( section.content ) );

      else if ( section.type == 'tags' )
        $tags = _.trim( _.trim( section.value ) + ' ' + _.trim( section.content ) ).split(/\s?,\s?/g);

      // includes an extra stylesheet
      else if ( section.type == 'stylesheet' )
        $stylesheets.push( _.trim( section.value ) );

      // slides
      else if ( section.type == 'slide' )
        $views.push( new Slide( section, $directory, $params.expand ) );
      
      // tests
      else if ( section.type == 'test' )
        $views.push ( new Test( section, $directory, $params.expand ) );

      // rankings
      else if ( section.type == 'ranking' )
        $views.push ( new Ranking( section ) );

    };


  // start reading content
  _init();


  __define( $this, {

    // getters
    title: { get: _get_title },
    description: { get: _get_description },
    tags: { get: _get_tags },
    views: { get: _get_views },
    stylesheets: { get: _get_stylesheets },
    exists: { get: _get_exists },
    stylesheet: { get: _get_stylesheet }

  });

};



