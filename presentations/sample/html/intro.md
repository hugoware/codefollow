# CodeFollow
## Using HTML

CodeFollow uses *PhantomJS* so you can write tests that work with the browser or use frameworks like jQuery.

<pre class="code javascript" >
// updates the element with ID total
// with the result of add
$(function() {

  var value = add( 1, 3 );
  $('#total').text( value );
  
});
</pre>