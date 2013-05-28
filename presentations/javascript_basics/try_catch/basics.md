# Try/Catch/Finally
## Basics

<pre class="code javascript" >
try {
  // volatile code
}
catch( exception ) {
  // handle exception
}
</pre>

* use `try` to wrap code that could potentially throw an exception
* don't use `try` to hide errors, always handle them with `catch`