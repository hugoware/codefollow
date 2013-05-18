var $fs = require('fs')
  , $path = require('path');

module.exports = $$class = function PresentationLocator() {
  var $this = this

    // collection of existing presentations
    , $available = [ ]
    , 

    // grabs located presentations
    _get_available = function() { return $available; },
    _exclude_directory = function( name ) { return /^_/.test( name ); },

    // check for each folder in the presentation directory
    _get_presentation_directory_entries = function() {
      var directory = $$config.presentation_directory
        , items = $fs.readdirSync( directory )
        , keep = [ ];

      // get all of the directories
      _.each( items, function ( i, item ) {
        var path = $path.join( directory, item )
          , entry = $fs.statSync( path );
        
        // only keep directories for now
        if ( entry.isDirectory() && !_exclude_directory( item ) )
          keep.push( item );
        });

      return keep;
    },


    // loads all available presentations
    _refresh = function() {
      var directories = _get_presentation_directory_entries();

      // get basic info for each presentation
      $available = [ ];
      _.each( directories, function( i, id ) {

        // load in the default presentation info
        var presentation = new PresentationReader( id );
        if ( !presentation.exists ) return;

        // make this presentation available
        $available.push({
          id: id,
          title: presentation.title,
          description: presentation.description,
          tags: presentation.tags
        });

      });

    }


  __define( $this, {
    refresh: _refresh,
    available: { get: _get_available }
  });


};