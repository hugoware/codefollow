require('../src/global')
var Util = require('../src/util')

var Presentation = function( ) {
  var $this = this;

  $this.count = 10;

  var __reset = function() { $this.count = 0; }
  var __get_view = function() { return $this.count; }
  var __set_view = function( value ) { $this.count += value; }



  __define( $this, {
    reset: __reset,
    view: { get: __get_view, set: __set_view }
  })

}
