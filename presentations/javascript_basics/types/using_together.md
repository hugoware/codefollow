# Type Checking
## Combined

<pre class="code javascript" >
function is_function( val ) {
  return val instanceof Function ||
    typeof val == 'function';
}

is_function( 'aaa' );           // false
is_function( is_function );     // true
is_function( [ ] );             // false
is_function( function() { } );  // true
</pre>

* Using both `instanceof` and `typeof` does a better job at detecting types

_(copy this down, you're going to need it)_