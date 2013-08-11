var CssInfo = function( selector ) {
  var $this = this
    , $element = Sizzle( selector )[0] || [ ]
    , $style = $element && window.getComputedStyle( $element ) || { }
    , $rules = $element && window.getMatchedCSSRules( $element ) || { }
    ,

    // finds the current value for something
    _value = function( property ) {
      return $styles[ property ];
    },

    // gets all matching rule values
    _rules = function( property ) {
      var keep = [ ];
      for ( var r in $rules )
        if ( $rules[r].style ) keep.push( $rules[r].style[ property ] );
      return keep;
    },

    // checks if any rule matches or not
    _any_rule = function( property, value ) {
      var action = ( typeof value == 'function' || value instanceof Function ) ? value : function(a) { return a == value; }
        , values = _rules( property );
      for ( var v in values )
        if ( action( values[ v ] || '' )) return true;
      return false;
    };

  // expose css
  $this.element = $element;
  $this.style = $style;
  $this.rules = $rules;
  $this.value = _value;
  $this.rules = _rules;
  $this.any_rule = _any_rule;

};


(function() {

  // grabs css for an element
  function _fetch( selector ) {
    return new CssInfo( selector );
  };

  // checking if set
  Object.defineProperty( window, '__is_profile_set', {
    get: function() {
      return _fetch('#test dl').element.className == 'profile';
    }
  });

  // checking image settings
  Object.defineProperty( window, '__is_image_resized', {
    get: function() {
      var info = _fetch('#test dl > dt > img');
      return /^70px70px$/i.test( info.styles.height + info.styles.width );
    }
  });

  // height values
  Object.defineProperty( window, '__image_height_set_correctly', {
    get: function() {
      var info = _fetch('#test dl > dt > img');
      return info.any_rule('height', '70px');
    }
  });

  Object.defineProperty( window, '__image_width_set_correctly', {
    get: function() {
      var info = _fetch('#test dl > dt > img');
      return info.any_rule('width', '70px');
    }
  });

  Object.defineProperty( window, '__all_images_resized', {
    get: function() {
      var info = _fetch('#test_img');
      return /^70px70px$/i.test( info.style.height + info.style.width ); 
    }
  })

  Object.defineProperty( window, '__is_dt_floated', {
    get: function() {
      var dt_info = _fetch('#test dl > dt')
        , dd_info = _fetch('#test dl > dd');
      return dt_info.any_rule('float', 'left') && dd_info.any_rule('float', 'left');
    }
  });

  Object.defineProperty( window, '__is_dt_selected_for_profile', {
    get: function() {
      var dt_info = _fetch('#test_dt')
        , dd_info = _fetch('#test_dd');
      return !( dt_info.any_rule('float', 'left') || dd_info.any_rule('float', 'left') );
    }
  });

  Object.defineProperty( window, '__is_h3_size_set', {
    get: function() {
      var info = _fetch('#test dl > dd > h3');
      return /^32px$/.test( info.style.fontSize );
    }
  });

  Object.defineProperty( window, '__is_h3_selected_for_profile', {
    get: function() {
      var info = _fetch('#test_h3');
      return !( /^32px$/.test( info.style.fontSize ) );
    }
  });

  Object.defineProperty( window, '__is_p_size_set', {
    get: function() {
      var info = _fetch('#test dl > dd > p');
      return /^16px$/.test( info.style.fontSize );
    }
  });

  Object.defineProperty( window, '__is_p_is_italic', {
    get: function() {
      var info = _fetch('#test dl > dd > p');
      return /^italic$/i.test( info.style.fontStyle );
    }
  });

  Object.defineProperty( window, '__is_p_selected_for_profile', {
    get: function() {
      var info = _fetch('#test_p');
      return !( /^16px$/.test( info.style.fontSize ) 
        || /^italic$/i.test( info.style.fontStyle ));
    }
  });



})();