var $fs = require('fs')
  , $path = require('path');

module.exports = $$class = function Reader( content, params ) {
  var $this = this
    , $params = params || { }

    // the lines as they are read
    , $sections = [ ]
    , $section = null
    , $lines = _.trim( content ).split(/\n/g)
    , $line = null

    // getters
    _get_sections = function() { return $sections; },


    // checking current line
    _is_section = function() { return /^\[\w+[^\]]*\]\s*$/.test( $line ); }
    _is_comment = function() { return /^\-\-/.test( $line ); }

    // starts reading content for the presentation
    _init = function() {

      // start processing each line
      _.each( $lines, function( index, line ) {
        $line = line;
        _process_line();
      });

      // finalize if needed
      if ( $section ) _finalize_section();

    },

    // determines how to use a line
    _process_line = function() {
      if ( _is_comment() ) return;
      if ( _is_section() ) _begin_new_section();
      else _append_to_section();
    },

    // prepares a new part of the content
    _begin_new_section = function() {
      _finalize_section();

      // extract values
      $section = new SectionReader( $line );
    },

    // adds the current line to the section content
    _append_to_section = function() {
      if ( !$section ) return;
      $section.content = $section.content 
        ? $section.content += '\n' + $line
        : $line;
    },

    // cleans up a section 
    _finalize_section = function() {
      if ( !$section ) return;

      // check the content 
      $section.content = _.trim( $section.content );
      if ( $section.content == '' ) delete $section.content;

      // add to the output
      $sections.push( $section );
    };


  // start reading content
  _init();



  __define( $this, {
    sections: { get: _get_sections }
  });

};