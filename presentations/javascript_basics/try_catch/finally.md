# Try/Catch/Finally
## Using `Finally`

<pre class="code javascript" >
try {
  // volatile code
}
catch( exception ) {
  // handle exception
}
finally {
  // code that should run each time
}
</pre>

* use `finally` for code that should run regardless errors
* even if an `exception` occurs within `catch`, the `finally` block will still run