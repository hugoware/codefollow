(function() {
  var $document = document
    , _trim = function( val ) { return ( val || '' ).toString().replace(/^\s+|\s+$/g, ''); }

  $document.select = document.querySelector;

  // make sure this wasn't prepopulated
  var ready, container, title, role_exists;

  // add a startup function
  Object.defineProperty( window, '__before_code_execute', {
    configurable: false, enumerable: false,
    get: function() {

      // only run once
      if ( ready ) return;
      ready = true;

      // check if values were prepopulated
      container = $('.customer');
      title = _trim( $('.customer h3').text() ).toLowerCase();
      role_exists = !!$document.select('.customer p');
    }
  });


  Object.defineProperty( window, '__has_customer', {
    configurable: false, enumerable: false,
    get: function() { return !!$document.select('.customer'); }
  });

  Object.defineProperty( window, '__h3_set_correctly', {
    configurable: false, enumerable: false,
    get: function() {
      return _trim( $document.select('.customer h3').innerHTML ).toLowerCase() == 'fred smith';
    }
  });

  Object.defineProperty( window, '__h3_not_pre_set', {
    configurable: false, enumerable: false,
    get: function() { return title != 'fred smith'; }
  });

  Object.defineProperty( window, '__has_h3', {
    configurable: false, enumerable: false,
    get: function() { return !!$document.select('.customer h3'); }
  });

  Object.defineProperty( window, '__h3_limited_scope', {
    configurable: false, enumerable: false,
    get: function() {
      return _trim( $document.select('.validate h3').innerHTML ).toLowerCase() != 'fred smith';
    }
  });


  Object.defineProperty( window, '__p_added_via_script', {
    configurable: false, enumerable: false,
    get: function() { return !role_exists; }
  });

  Object.defineProperty( window, '__p_set_correctly', {
    configurable: false, enumerable: false,
    get: function() {
      return _trim( $document.select('.customer p').innerHTML ).toLowerCase() == 'developer';
    }
  });

  Object.defineProperty( window, '__p_not_pre_set', {
    configurable: false, enumerable: false,
    get: function() { return role != 'developer'; }
  });

  Object.defineProperty( window, '__has_p', {
    configurable: false, enumerable: false,
    get: function() { return !!$document.select('.customer p'); }
  });

  Object.defineProperty( window, '__p_limited_scope', {
    configurable: false, enumerable: false,
    get: function() {
      return _trim( $document.select('.validate p').innerHTML ).toLowerCase() != 'developer';
    }
  });


})();