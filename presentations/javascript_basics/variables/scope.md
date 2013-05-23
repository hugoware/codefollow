# Declaring Variables
## Scoping

Using var will scope variables locally. Otherwise, you can accidentially assign to the wrong thing.

<pre class="code javascript" >
function name( val ) { name = val; };
name( 'fred' )
// 'name' now equals 'fred'

function name( val ) { var name = val; };
name( 'fred' )
// 'name' is still a function
</pre>