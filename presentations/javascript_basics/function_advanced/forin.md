# Functions: `Arguments`
## For/In

<pre class="code javascript" >
function log() {
  for ( var a in arguments )
    console.log( arguments[i] );
}
</pre>

* `arguments` is **not** an array
* using `for/in` does not work everywhere