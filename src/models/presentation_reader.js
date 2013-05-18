
// handles reading presentation files

module.exports = $$class = function PresentationReader( source, params, presentation ) {
  var $this = this
    , $params = params || { }

    // paths
    , $exists = true
    , $source = source
    , $directory = $$path.join( $$config.presentation_directory, $source )
    , $index = $$path.join( $directory, 'index' )
    , $presentation = presentation

    // presentation content
    , $title = null
    , $description = null
    , $tags = null
    , $views = [ ]
    ,

    // getters
    _get_exists = function() { return $exists; },
    _get_title = function() { return $title || ''; },
    _get_description = function() { return $description || ''; },
    _get_tags = function() { return $tags || [ ]; },
    _get_views = function() { return $views; },
    

    // starts reading the content 
    _init = function() { 

      // make sure this is real
      var exists = $$fs.existsSync( $index );
      if ( !exists )
        return $exists = false;

      // read in the file contents
      var file = $$fs.readFileSync( $index )
        , content = file.toString()
        , reader = new Reader( content );

      // figure out what to do with each section
      _.each( reader.sections, function( i, section ) {
        _add( section );
      });

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
    exists: { get: _get_exists }

  });

};



