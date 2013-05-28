# OOP: Basics
## Declaring Functions

<pre class="code javascript" >
function User() {
  this.name = 'admin';

  // an instance method
  this.set_name = function( value ) {
    this.name = value;
  };
}

var user = new User;
user.set_name('bill');
console.log( user.name ); // 'bill'
</pre>

* the `this` object is the instance of the class
* assigning to the `this` object exposes functionality to developers