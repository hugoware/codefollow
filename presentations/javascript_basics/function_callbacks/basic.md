# Functions: Callbacks
## Example

<pre class="code javascript" >
function when_ready( status ) {
  console.log( status );
}

function load_resource( callback ) {
  callback('ready');
}

load_resource( when_ready );
// output: 'ready'
</pre>

* a `callback` is simply a function that was provided as an argument