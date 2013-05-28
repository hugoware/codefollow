# Functions: Arguments
## Passing Objects

<pre class="code javascript" >
function change( account ) {
  account.name = 'edit';
}

var user = { name: 'fred' };
change( user );

console.log( user.name ); // 'edit'
</pre>

* Object are passed by reference, so edits will appear on the original