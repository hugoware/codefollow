# OOP: Prototype
## Declaring Functions

<pre class="code javascript" >
function User() { }
user.prototype.login = function() { 
  console.log('success');
};

var user = new User;
user.login(); // 'success'
</pre>

* assigning a function to `prototype` makes it available on instances of that class
* a function like this can still be overwritten