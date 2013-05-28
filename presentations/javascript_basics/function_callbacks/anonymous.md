# Functions: Callbacks
## Anonymous Function

<pre class="code javascript" >
function load_resource( callback ) {
  callback('anonymous');
}

load_resource(
  function ( status ) {
    console.log( status );
  });
// output: 'ready'
</pre>

* A `function` can be declared as part of the argument _(anonymous function)_