# Functions: Call/Apply
## `Call`

<pre class="code javascript" >
function add( a, b ) { 
  console.log( a + b ); 
}

add.call( null, 3, 5 );
// 8
</pre>

* the first argument is the context the function is run in
* the following arguments are passed into the function
* `call` is useful when you know the argument count but want to change the `this` context