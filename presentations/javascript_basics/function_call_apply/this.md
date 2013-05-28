# Functions: Call/Apply
## `This`

<pre class="code javascript" >
function update( name ) { 
  this.name = name;
}

// update run in context of user
var user = { };
update.call( user, 'fred' ); 
console.log( user ) // { name: 'fred' }
</pre>

* changing the first argument changes the context of `this` within the function
* editing the `this` object also affects the provided _(reference)_