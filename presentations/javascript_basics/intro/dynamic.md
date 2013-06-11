# JavaScript
## Dynamic

<pre class="code javascript" >
// create
var user = {
  name: 'fred',
  admin: false
};

// modify
user.name = 'mark';

// use
if ( user.admin )
  console.log( user.name );
</pre>

* Object can be created, edited, and used without worrying about types
* This is why browser JavaScript shouldn't do anything that needs to be secure