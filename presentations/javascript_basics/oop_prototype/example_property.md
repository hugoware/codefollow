# OOP: Prototype
## Assigning Properties

<pre class="code javascript" >
function User() { }
User.prototype.name = 'guest';

var user = new User;
console.log( user.name ); // 'guest'
</pre>

* assigning a value to `prototype` makes it available on instances of that classes
* a property defined in this way is still editable