# Try/Catch/Finally
## Using `Catch`

<pre class="code javascript" >
try {
  // volatile code
}
// do something about the error
catch( exception ) {
  if ( exception == 'network' )
    reset_connection();
  else
    alert('server error');
}
</pre>

* use `catch` to handle exceptions that are raised
* an `exception` can be anything (string, object, etc)