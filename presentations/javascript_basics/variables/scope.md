# Declaring Variables
## Scoping

<pre class="code javascript" >
function name( val ) { name = val; };
name( 'fred' );
// 'name' now equals 'fred'

function name( val ) { var name = val; };
name( 'fred' );
// 'name' is still a function
</pre>

* Using `var` will scope variables locally
* Not using `var` can accidentially assign to the wrong variable