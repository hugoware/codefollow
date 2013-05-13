
// handles reading a section header in a presentation
module.exports = $$class = function SectionReader( content ) {
  var $this = this
    , $content = _.trim( content )

    // the section information
    , $section = { }
    , $key = null
    , $value = null
    , $current = [ ]
    ,

    // processes each part of the header
    _read = function() {
      _remove_brackets();
      _extract_type();
      _extract_parameters();
      _set_value();
    },

    // removes leading/trailing square brackets
    _remove_brackets = function() {
      $content = $content.replace(/^\[|\]$/g, '');
    },

    // the first word is always the type
    _extract_type = function() {
      $content = $content.replace(/\w+\s*/, function( value ) {
        $section.type = _.trim( value );
        return '';
      });
    },

    // reads each of the parameter values
    _extract_parameters = function() {

      // collect values (checking for quotes)
      var escape_next = false
        , in_quote = null;

      // start checking each letter
      for( var c in $content ) {
        var character = $content[ c ]
          , has_key = $key != null
          , is_space = character == ' '
          , is_escape = character == '\\'
          , is_delimeter = character == ':' 
          , is_quote = character == '"' || character == "'"
          , is_close = in_quote == character
          , is_last = $content.length - 1 == c
          , is_end = is_space || is_last
          , no_content = $current.length == 0;


        // always keep escaped characters
        if ( escape_next ) {
          $current.push( character );
          escape_next = false;
        }

        // if this is escaping the next letter
        else if ( is_escape )
          escape_next = true;

        // if this is a new attribute
        else if ( is_delimeter && !has_key ) {
          $key = _.trim( $current.join('') );
          $current = [ ];
        }

        // if this is possibly a quote around a value
        else if ( is_quote ) {

          // if this is the start of a key, set it as
          // the matching quote value
          if ( no_content && has_key )
            in_quote = character;

          // if this is the close to the quote
          else if ( is_close )
            ( in_quote = null || _write_parameter() )

        }

        // check if this character should just be added
        else if ( is_end && !in_quote ) {
          $current.push( character );

          // try and write out the parameters
          _write_parameter();

        }
        // add to the current word
        else
          $current.push( character );

      }

      // anything remaining goes to the value
      $content = $current.join('');

    },


    // writes out the current values as a parameter
    _write_parameter = function() {
      if ( !$key ) return;
      
      // save the value  
      var value = _.trim( $current.join('') );
      $section[ $key ] = { get: function() { return value; }, enumerable: true };

      // reset the current key
      $key = null;
      $value = null;

      // reset the word
      $current = [ ];
    },


    // whatever is left is the value
    _set_value = function() {
      $content = _.trim( $content );
      if ( $content.length != 0 )
        $section.value = $content;
    };


  // extract the detail
  _read();
  

  __define( $this, $section );
};