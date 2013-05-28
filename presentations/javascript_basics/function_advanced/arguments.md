# Functions: `Arguments`
## Using `Arguments`

<pre class="code javascript" >
function combine( /* nothing defined */ ) {
  console.log( typeof arguments );
  console.log( arguments.length );
}

combine( 'a', 'b', 'c' );
// object
// 3
</pre>

* `arguments` exists within a function by default