# Functions: Call/Apply
## `Apply`

<pre class="code javascript" >
function add( a, b, c ) { 
  console.log( a, b, c );
}

add.apply( null, [ 1, 5, 6 ] );  // 1 5 6
add.apply( null, 1, 5, 6 );      // crash!
</pre>

* the first argument is the context the function is run in
* the second argument should be a collection of arguments _(either an array or `arguments`)_
* not providing an array will cause an exception