(function() {

  // make sure this wasn't prepopulated
  var container = document.getElementById('container')
    , title = container.getElementsByTagName('h3')
    , customer = container.getElementsByTagName('p');

  // set the initial state
  Object.defineProperty( window, '__name_element_valid', {
    configurable: false, enumerable: false,
    get: function() {

      try {
        var valid = title.length == 1
          
      }
      catch ( e ) {
        return false;
      }


    }
  })


})();