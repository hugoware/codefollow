# Functions: Arguments
## Objects As Arguments

<pre class="code javascript" >
function connect( params ) {
  // ...
}

connect({
  username: 'admin',
  password: 'pa$$word',
  server: 'smtp.server.com',
  ssl: true
});
</pre>

* multiple arguments can be difficult to manage at times
* many developers pass an `object` that contains arguments
* future changes will not affect the function definition