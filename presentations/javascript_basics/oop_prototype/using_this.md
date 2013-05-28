# OOP: Prototype
## `This` Context

<pre class="code javascript" >
function User() { }
User.prototype.name = 'guest';
User.prototype.greet = function() { 
  console.log('hello, ' + this.name );
};

var user = new User;
user.greet(); // 'hello, guest'
</pre>

* `this` still references the instance of the class
* like with previous examples, if the context changes you'll need to create a reference back to the class instance