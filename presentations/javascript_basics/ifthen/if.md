# If/Then
## Basics

<pre class="code javascript" >
if ( true ) {
  console.log( 'true' ); // 'true'
}

if ( false )
  console.log( 'false' ) // doesn't happen

// be careful with semi-colons
if ( false );
  console.log( 'oops' ); // 'oops'
</pre>

* `if` will evaluate the condition contained in the parentheses
* if successful, the following code will be executed