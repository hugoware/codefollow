# Functions: `Arguments`
## Iterating

<pre class="code javascript" >
function log() {
  for ( var i = 0; i &lt; arguments.length; i++ )
    console.log( arguments[i] )
}

log( 'first','second','third' );
// first
// second
// third
</pre>

* use `arguments` like you would with an array
* use the `length` property with a `for` loop to iterate through each value